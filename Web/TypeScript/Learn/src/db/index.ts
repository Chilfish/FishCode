import url from 'url';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import { User } from 'src/interface/user';

const readFile = promisify(fs.readFile),
  writeFile = promisify(fs.writeFile),
  dirname = path.dirname(url.fileURLToPath(import.meta.url)),
  root = path.resolve();

const dbPath = path.resolve(root, './static/fishData.json');

export const getDb = async () => {
  const data = await readFile(dbPath);
  return JSON.parse(data.toString());
};

export const addDb = async (db: User) => {
  const data = JSON.stringify(db, null, ' ');
  await writeFile(dbPath, data);
}; 
