import { stat } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv[2]; // ім'я об'єкта, наприклад "users.json"

async function FileInspector(): Promise<void> {
  try {
    const objectPath = path.join(__dirname, args);

    const stats = await stat(objectPath);

    console.log(
      `Name: ${args}, Size: ${stats.size} байт, Created: ${stats.birthtime.toISOString()}, Modified: ${stats.mtime.toISOString()}`,
    );
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.log("Такого об'єкта не існує");
    } else {
      console.error('Помилка:', error);
    }
  }
}

void FileInspector();
