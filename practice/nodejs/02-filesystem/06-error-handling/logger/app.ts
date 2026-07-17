import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, process.argv[2]);
const logPath = path.join(__dirname, 'logs', 'errors.log');

async function myFile(filePath: string): Promise<void> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    console.log(data);
  } catch (err: unknown) {
    if (isErrnoException(err) && err.code === 'ENOENT') {
      const message = `"${process.argv[2]}" - такого файлу не існує`;
      console.error(message);
      await logError(message);
    } else if (isErrnoException(err) && err.code === 'EACCES') {
      const message = `"${process.argv[2]}" - доступ тільки для Адміністратора`;
      console.error(message);
      await logError(message);
    } else if (isErrnoException(err) && err.code === 'EPERM') {
      const message = `"${process.argv[2]}" - системний файл`;
      console.error(message);
      await logError(message);
    } else {
      console.error('Помилка:', err);
      await logError(`"${process.argv[2]}" - невідома помилка`);
    }
  }
}

function isErrnoException(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === 'object' && error !== null && 'code' in error;
}

async function logError(message: string): Promise<void> {
  try {
    await fs.appendFile(logPath, message + '\n', 'utf8');
  } catch (logErr) {
    console.error('Не вдалося записати у errors.log:', logErr);
  }
}

void myFile(filePath);
