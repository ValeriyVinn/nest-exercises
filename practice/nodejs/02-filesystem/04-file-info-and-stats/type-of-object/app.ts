import { stat } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv[2]; // ім'я об'єкта (наприклад: "my-file.txt" або "my-folder")

async function isFileOrFolder(): Promise<void> {
  try {
    const objectPath = path.join(__dirname, args);

    const stats = await stat(objectPath);

    if (stats.isFile()) {
      console.log('Це файл');
    } else if (stats.isDirectory()) {
      console.log('Це тека');
    } else {
      console.log("Об'єкт існує, але це не файл і не тека");
    }
  } catch (error: unknown) {
    // Narrow to NodeJS.ErrnoException to safely access `code` property
    const err = error as NodeJS.ErrnoException | undefined;
    if (err?.code === 'ENOENT') {
      console.log("Такого об'єкта не існує");
    } else {
      console.error('Помилка:', error);
    }
  }
}

void isFileOrFolder();
