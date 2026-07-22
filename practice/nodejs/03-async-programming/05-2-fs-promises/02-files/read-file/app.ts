import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'message.txt');

const readMe = async function () {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
void readMe();
