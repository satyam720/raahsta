import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import AppError from './appError.js';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
export const uploadRoot = path.resolve(
  process.env.UPLOAD_DIR || path.join(projectRoot, 'public/img'),
);

export const uploadPath = (type, filename) => path.join(uploadRoot, type, filename);
export const usesCloudinary = () => (process.env.UPLOAD_STORAGE ||
  (process.env.NODE_ENV === 'production' ? 'cloudinary' : 'local')) === 'cloudinary';

// Keep filenames in MongoDB and /img/... URLs unchanged for old and new images.
const publicId = (type, filename) => `raahsta/${type}/${path.parse(filename).name}`;

export function cloudinaryImageUrl(type, filename) {
  if (!['users', 'tours'].includes(type) || !/^(user|tour)-[a-zA-Z0-9-]+\.jpeg$/.test(filename)) return null;
  return `https://res.cloudinary.com/${encodeURIComponent(process.env.CLOUDINARY_CLOUD_NAME)}/image/upload/${publicId(type, filename)}.jpg`;
}

export async function saveImage(buffer, type, filename) {
  if (!usesCloudinary()) {
    await writeFile(uploadPath(type, filename), buffer);
    return;
  }
  const { CLOUDINARY_CLOUD_NAME: cloud, CLOUDINARY_API_KEY: key, CLOUDINARY_API_SECRET: secret } = process.env;
  if (!cloud || !key || !secret) throw new AppError('Image storage is not configured', 503);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const id = publicId(type, filename);
  const signature = createHash('sha256').update(`public_id=${id}&timestamp=${timestamp}${secret}`).digest('hex');
  const form = new FormData();
  form.set('file', new Blob([buffer], { type: 'image/jpeg' }), filename);
  form.set('public_id', id);
  form.set('timestamp', timestamp);
  form.set('api_key', key);
  form.set('signature', signature);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloud)}/image/upload`, {
    method: 'POST', body: form, signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new AppError('Image storage upload failed. Please try again.', 502);
}

export async function prepareUploadDirectories() {
  if (usesCloudinary()) return;
  await Promise.all(['users', 'tours'].map(type => mkdir(uploadPath(type, ''), { recursive: true })));
}
