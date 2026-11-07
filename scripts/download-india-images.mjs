import { destinations, buildIndiaData } from '../dev-data/data/create-india-data.js';
import { writeFile, readFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const headers = { 'User-Agent': 'RaahstaDemo/1.0 (educational mock-tour project; photo attribution retained)' };
const imageRoot = new URL('../public/img/', import.meta.url);
const onlyIndex = process.argv.indexOf('--only');
const only = onlyIndex >= 0 ? process.argv[onlyIndex + 1] : undefined;
if (only && !destinations.some(destination => destination.key === only)) throw new Error('Unknown destination for --only');
const credits = only ? JSON.parse(await readFile(new URL('../public/photo-credits.json', import.meta.url), 'utf8')).filter(credit => !credit.file.startsWith(`india-${only}-`)) : [];
const plain = text => String(text || '').replace(/<[^>]*>/g, '').trim();
const escape = text => plain(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

async function request(url) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });
    if (response.ok) return response;
    if (![429, 502, 503].includes(response.status) || attempt === 3) throw new Error(`Photo request failed: HTTP ${response.status} at ${new URL(url).hostname}`);
    await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
  }
}

await mkdir(new URL('tours/', imageRoot), { recursive: true });
await mkdir(new URL('users/', imageRoot), { recursive: true });
for (const destination of destinations.filter(destination => !only || destination.key === only)) {
  const api = new URL('https://commons.wikimedia.org/w/api.php');
  api.search = new URLSearchParams({ action: 'query', format: 'json', generator: 'search', gsrsearch: destination.photoSearch,
    gsrnamespace: '6', gsrlimit: '6', prop: 'imageinfo', iiprop: 'url|extmetadata|size', iiurlwidth: '1600' });
  const data = await (await request(api)).json();
  const candidates = Object.values(data.query?.pages || {}).sort((a, b) => a.index - b.index)
    .filter(page => {
      const info = page.imageinfo?.[0];
      return info && info.width >= info.height && !/toilet|communication tower/i.test(page.title) && /\.(jpe?g|png)$/i.test(page.title) && /^(CC BY(?:-SA)? [\d.]|CC0|Public domain)/.test(info.extmetadata?.LicenseShortName?.value || '');
    });
  if (!candidates.length) throw new Error(`No suitable openly licensed photo found for ${destination.key}`);
  const sources = [];
  for (const page of candidates.slice(0, 4)) {
    const info = page.imageinfo[0];
    try {
      const response = await request(info.thumburl || info.url);
      const buffer = Buffer.from(await response.arrayBuffer());
      await sharp(buffer).metadata();
      sources.push({ buffer, page, info });
    } catch (error) { process.stderr.write(`${destination.key}: skipping a failed photo (${error.message})\n`); }
  }
  if (!sources.length) throw new Error(`All photo downloads failed for ${destination.key}`);
  for (let index = 0; index < 4; index++) {
    const source = sources[index % sources.length];
    const filename = `india-${destination.key}-${index === 0 ? 'cover' : index}.jpg`;
    await sharp(source.buffer).rotate().resize(index === 0 ? 1600 : 1200, index === 0 ? 1000 : 900, { fit: 'cover' }).jpeg({ quality: 84 }).toFile(fileURLToPath(new URL(`tours/${filename}`, imageRoot)));
    credits.push({ file: filename, destination: destination.city, title: source.page.title.replace(/^File:/, ''),
      creator: plain(source.info.extmetadata.Artist?.value || source.info.extmetadata.Credit?.value || 'See source page'),
      license: source.info.extmetadata.LicenseShortName.value, licenseUrl: source.info.extmetadata.LicenseUrl?.value || 'https://creativecommons.org/publicdomain/zero/1.0/',
      source: source.info.descriptionurl, changes: 'Resized and cropped for the Raahsta demo. Derivative photo retains the source license.' });
  }
  process.stdout.write(`${destination.city}: saved cover and 3 gallery images with source credits.\n`);
}

const palette = ['#215a43', '#725b3c', '#385774', '#8b4d3d', '#595b80', '#42665c'];
for (const [index, user] of buildIndiaData().users.entries()) {
  const initials = user.name.split(' ').map(word => word[0]).join('');
  const avatar = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" rx="100" fill="${palette[index % palette.length]}"/><text x="100" y="122" text-anchor="middle" font-family="Arial,sans-serif" font-size="64" fill="#fffefa">${initials}</text></svg>`;
  await sharp(Buffer.from(avatar)).png().toFile(fileURLToPath(new URL(`users/${user.photo}`, imageRoot)));
}
await writeFile(new URL('../public/photo-credits.json', import.meta.url), JSON.stringify(credits, null, 2) + '\n');
const rows = credits.map(credit => `<article class="reviews__card"><h2 style="font-size:20px">${escape(credit.destination)}</h2><p>${escape(credit.file)}</p><p>${escape(credit.title)} — ${escape(credit.creator)}</p><a class="text-link" href="${escape(credit.source)}">Original photograph</a> · <a class="text-link" href="${escape(credit.licenseUrl)}">${escape(credit.license)}</a><p>${escape(credit.changes)}</p></article>`).join('\n');
await writeFile(new URL('../public/photo-credits.html', import.meta.url), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Photo credits | Raahsta</title><script src="/js/theme-init.js"></script><link rel="stylesheet" href="/css/style.css"></head><body><main class="shell tour-list"><a class="breadcrumb" href="/">← Back to Raahsta</a><h1>Places worth a thousand words.</h1><p class="form-intro">Indian destination photography from Wikimedia Commons. Each image is credited below under its original license. People in this fictional dataset use generated initials, not photographs.</p><div class="reviews">${rows}</div></main></body></html>\n`);
process.stdout.write('Saved 36 destination images, 17 generated avatars, and public attribution pages.\n');
