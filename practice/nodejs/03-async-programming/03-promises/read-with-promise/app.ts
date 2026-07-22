import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'message.txt');

function readFilePromise(filePath: fs.PathOrFileDescriptor): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

readFilePromise(filePath)
  .then(data => console.log('Текст файлу:', data))
  .catch(err => console.error('Помилка:', err));
