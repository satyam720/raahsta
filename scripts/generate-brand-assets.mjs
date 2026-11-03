import fs from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const imageDir = new URL('../public/img/', import.meta.url);
const green = '#28a879';
const mark = (color) => `<g fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 70 42 18 62 48 76 30 102 70"/><path d="m33 33 9 9 9-9"/><path d="M49 88c-25-13 30-17 14-31"/></g>`;
const svg = (color, wordmark = false, background = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${wordmark ? 450 : 112}" height="104" viewBox="0 0 ${wordmark ? 450 : 112} 104" role="img" aria-label="Raahsta${wordmark ? '' : ' mountain and trail emblem'}">${background ? `<rect width="112" height="104" rx="24" fill="${background}"/>` : ''}${mark(color)}${wordmark ? `<text x="124" y="70" fill="${color}" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="57" letter-spacing="3">RAAHSTA</text>` : ''}</svg>`;

for (const [name, content] of [
  ['raahsta-green.svg', svg(green, true)],
  ['raahsta-white.svg', svg('#ffffff', true)],
  ['raahsta-mark.svg', svg(green)],
  ['raahsta-mark-white.svg', svg('#ffffff')],
]) {
  await fs.writeFile(new URL(name, imageDir), content);
}

// Keep legacy asset URLs branded too, including the static course preview pages.
for (const [name, content, width] of [
  ['logo-green.png', svg(green, true), 900],
  ['logo-white.png', svg('#ffffff', true), 900],
  ['logo-green-small.png', svg(green, true), 450],
  ['logo-green-round.png', svg('#ffffff', false, green), 224],
  ['raahsta-checkout.png', svg('#ffffff', false, green), 224],
  ['favicon.png', svg('#ffffff', false, green), 64],
]) {
  await sharp(Buffer.from(content)).resize({ width }).png().toFile(fileURLToPath(new URL(name, imageDir)));
}
