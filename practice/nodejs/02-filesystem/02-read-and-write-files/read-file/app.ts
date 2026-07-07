import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'message.txt');

function myFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf-8');
}

myFile(filePath)
  .then(data => console.log(data))
  .catch(err => console.error(err));
