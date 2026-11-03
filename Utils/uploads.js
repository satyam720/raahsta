import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
export const uploadRoot = path.resolve(
  process.env.UPLOAD_DIR || path.join(projectRoot, 'public/img'),
);

export const uploadPath = (type, filename) => path.join(uploadRoot, type, filename);

export async function prepareUploadDirectories() {
  await Promise.all(['users', 'tours'].map(type => mkdir(uploadPath(type, ''), { recursive: true })));
}
