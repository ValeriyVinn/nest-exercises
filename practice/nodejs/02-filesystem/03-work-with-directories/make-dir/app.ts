import { mkdir } from 'node:fs/promises';
// import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const textFromTerminal: string | undefined = process.argv[2];

async function createAndWriteDirectory(): Promise<void> {
  try {
    // Створюємо директорію 'my-directory' у поточному каталозі
    await mkdir(path.join(__dirname, textFromTerminal || 'my-directory'), { recursive: true });
    console.log('Директорія успішно створена!');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Ой, щось пішло не так:', error.message);
    } else {
      console.error('Сталася невідома помилка:', error);
    }
  }
}

void createAndWriteDirectory();
