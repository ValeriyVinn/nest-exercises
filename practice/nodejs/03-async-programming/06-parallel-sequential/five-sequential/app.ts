import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Масив імен файлів
const files = ['01.txt', '02.txt', '03.txt', '04.txt', '05.txt'];

async function readSequentially() {
  for (const file of files) {
    const filePath = path.join(__dirname, file);
    try {
      const data = await fs.readFile(filePath, 'utf-8'); // чекаємо кожен файл
      console.log(`📄 ${file}:`);
      console.log(data);
      console.log('-----------');
    } catch (err) {
      console.error(`Помилка при читанні ${file}:`, err);
    }
  }
}

void readSequentially();
