import { createDesignPreview } from './preview-design.mjs';
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';

const browsers = [process.env.DESIGN_BROWSER, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(Boolean);
const executable = browsers.find(file => existsSync(file));
if (!executable) throw new Error('Set DESIGN_BROWSER to a Chrome/Edge executable for local browser checks.');
const profile = await mkdtemp(path.join(tmpdir(), 'raahsta-design-'));
const server = createDesignPreview().listen(0, '127.0.0.1');
await new Promise(resolve => server.once('listening', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = spawn(executable, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
let socket;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const errors = [];
try {
  let port;
  for (let i = 0; i < 100; i++) {
    try { port = (await readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]; break; } catch { await sleep(100); }
  }
  if (!port) throw new Error('Browser debugging port did not become ready');
  const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  socket = new WebSocket(pages.find(page => page.type === 'page').webSocketDebuggerUrl);
  await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
  let sequence = 0;
  const pending = new Map();
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const callback = pending.get(message.id);
      if (callback) { pending.delete(message.id); message.error ? callback.reject(new Error(message.error.message)) : callback.resolve(message.result); }
    }
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text + ': ' + (message.params.exceptionDetails.exception?.description || ''));
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });
  const viewport = (width, height = 1000) => send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  const navigate = async route => {
    await send('Page.navigate', { url: base + route });
    for (let i = 0; i < 100; i++) {
      await sleep(100);
      if (await evaluate("document.readyState === 'complete' && !!document.querySelector('.theme-toggle[title^=\"Switch to\"]')")) break;
    }
    await evaluate('document.fonts.ready');
    await sleep(150);
  };
  await mkdir('.artifacts', { recursive: true });
  const screenshot = async name => {
    await sleep(350); // Let theme/color transitions settle before inspecting pixels.
    const image = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    await writeFile(`.artifacts/${name}.png`, Buffer.from(image.data, 'base64'));
  };
  await viewport(1440);
  await navigate('/');
  assert.equal(await evaluate("document.documentElement.dataset.theme"), 'light');
  await screenshot('raahsta-desktop-light');
  await evaluate("document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,document.getElementById('tours').offsetTop-110)");
  await screenshot('raahsta-tour-list');
  await evaluate('window.scrollTo(0,0)');
  const total = await evaluate("document.querySelectorAll('.card').length");
  assert.ok(total > 0);
  await evaluate("document.getElementById('tour-search').value='no-such-destination';document.getElementById('tour-search').dispatchEvent(new Event('input'))");
  assert.equal(await evaluate("document.querySelectorAll('.card:not([hidden])').length"), 0);
  assert.equal(await evaluate("document.getElementById('filter-empty').hidden"), false);
  await evaluate("document.querySelector('.reset-filters').click()");
  assert.equal(await evaluate("document.querySelectorAll('.card:not([hidden])').length"), total);
  await evaluate("document.getElementById('tour-duration').value='short';document.getElementById('tour-duration').dispatchEvent(new Event('change'))");
  assert.equal(await evaluate("[...document.querySelectorAll('.card:not([hidden])')].every(c=>Number(c.dataset.duration)<=7)"), true);
  await evaluate("document.querySelector('.reset-filters').click()");
  await evaluate("document.getElementById('tour-difficulty').value='easy';document.getElementById('tour-difficulty').dispatchEvent(new Event('change'))");
  assert.equal(await evaluate("[...document.querySelectorAll('.card:not([hidden])')].every(c=>c.dataset.difficulty==='easy')"), true);
  await evaluate("document.querySelector('.reset-filters').click();document.querySelector('.theme-toggle').click()");
  assert.equal(await evaluate("localStorage.getItem('raahsta-theme')"), 'dark');
  await screenshot('raahsta-desktop-dark');
  assert.equal(await evaluate("getComputedStyle(document.body).backgroundColor"), 'rgb(17, 28, 24)');
  await navigate('/login');
  assert.equal(await evaluate("document.documentElement.dataset.theme"), 'dark');
  await evaluate("document.querySelector('.theme-toggle').click()");
  const routes = ['/', '/tour/the-rishikesh-river-escape', '/login', '/signup', '/me', '/my-tours', '/error'];
  for (const width of [1440, 768, 390, 320]) {
    await viewport(width);
    for (const route of routes) {
      await navigate(route);
      assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth + 1'), true, `Horizontal overflow at ${width}px on ${route}`);
      if (route === '/' && width === 390) await screenshot('raahsta-mobile');
      if (route === '/tour/the-rishikesh-river-escape' && width === 1440) await screenshot('raahsta-tour');
      if (route === '/signup' && width === 390) await screenshot('raahsta-signup-mobile');
    }
  }
  await viewport(390);
  for (const route of routes) {
    await navigate(route);
    if (await evaluate("document.documentElement.dataset.theme !== 'dark'")) await evaluate("document.querySelector('.theme-toggle').click()");
    await sleep(350);
    assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth + 1'), true, `Dark-mode overflow on ${route}`);
  }
  await evaluate("localStorage.removeItem('raahsta-theme')");
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'dark' }] });
  await navigate('/login');
  assert.equal(await evaluate("document.documentElement.dataset.theme"), 'dark');
  await navigate('/');
  await evaluate("document.querySelector('.menu-toggle').click()");
  assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), 'true');
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), 'false');
  assert.deepEqual(errors, [], 'Browser JavaScript exceptions');
  process.stdout.write('Browser checks passed: all 7 pages at 320/390/768/1440px, theme persistence, filters/reset, mobile navigation, and no JavaScript exceptions. Screenshots saved in .artifacts/.\n');
} finally {
  socket?.close();
  browser.kill();
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
  await sleep(500);
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }).catch(() => {});
}
