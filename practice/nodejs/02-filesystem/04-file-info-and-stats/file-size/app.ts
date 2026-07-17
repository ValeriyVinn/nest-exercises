import { stat } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getFileSize(): Promise<void> {
  try {
    const filePath = path.join(__dirname, 'text.txt');
    const stats = await stat(filePath);
    console.log(`Розмір файлу: ${stats.size} байт`);
  } catch (error) {
    console.error('Помилка:', error);
  }
}

void getFileSize();
