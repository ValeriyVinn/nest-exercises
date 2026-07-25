import { copyFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileCopyPath = path.join(__dirname, 'origin.txt');
const filePastPath = path.join(__dirname, process.argv[2]);

async function duplicateFile(source: string, destination: string) {
  try {
    await copyFile(source, destination);
    console.log('Файл успішно скопійовано!');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Помилка копіювання: ${message}`);
  }
}

void duplicateFile(fileCopyPath, filePastPath);
