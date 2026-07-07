import { appendFile } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'text.txt');

function appendLog(filePath: string, text: string): Promise<void> {
  return appendFile(filePath, `\n${text}`, { encoding: 'utf8' });
}

export { appendLog };
appendLog(
  filePath,
  'Потім я перепишу цей код із додаванням можливості отримувати текст із терміналу',
)
  .then(() => console.log('Текст успішно додано у файл!'))
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error('Помилка запису:', error.message);
    }
  });
