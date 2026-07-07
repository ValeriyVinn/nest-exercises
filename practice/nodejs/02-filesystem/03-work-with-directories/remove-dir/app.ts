import { mkdir, rm, access } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { constants } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toMakeDir: string | undefined = process.argv[2];
const toRemoveDir: string | undefined = process.argv[3];

async function handleDirectories(): Promise<void> {
  try {
    // Якщо перший аргумент НЕ "_", створюємо директорію
    if (toMakeDir && toMakeDir !== '_') {
      const makePath = path.join(__dirname, toMakeDir);
      await mkdir(makePath, { recursive: true });
      console.log(`Директорія "${toMakeDir}" успішно створена!`);
    }

    // Якщо другий аргумент заданий — пробуємо видалити
    if (toRemoveDir) {
      const removePath = path.join(__dirname, toRemoveDir);

      try {
        await access(removePath, constants.F_OK); // перевірка існування
        await rm(removePath, { recursive: true });
        console.log(`Директорія "${toRemoveDir}" успішно видалена!`);
      } catch (error: unknown) {
        if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
          console.log(`Такої директорії "${toRemoveDir}" не існує!`);
        } else {
          console.error('Ой, щось пішло не так при видаленні:', error);
        }
      }
    }
  } catch (error: unknown) {
    console.error('Сталася помилка:', error);
  }
}

void handleDirectories();
