import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, process.argv[2]);

async function myFile(filePath: string): Promise<void> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    console.log(data);
  } catch (err: unknown) {
    if (isErrnoException(err) && err.code === 'ENOENT') {
      console.error('Такого файлу не існує');
    } else {
      console.error('Помилка:', err);
    }
  }
}

function isErrnoException(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === 'object' && error !== null && 'code' in error;
}

void myFile(filePath);
