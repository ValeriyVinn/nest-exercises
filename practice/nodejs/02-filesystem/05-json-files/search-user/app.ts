import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const argName = process.argv[2]; // аргумент з терміналу

async function getName(): Promise<void> {
  try {
    const filePath = path.join(__dirname, 'users.json');
    const data = await readFile(filePath, 'utf8');
    const users = JSON.parse(data) as { id: number; name: string; surname: string }[];

    const user = users.find(u => u.name === argName);

    if (user) {
      console.log(`Користувач з таким ім'ям має Прізвище: ${user.surname}`);
    } else {
      console.log('Такого користувача не існує');
    }
  } catch (error) {
    console.error('Помилка читання файлу:', error);
  }
}

void getName();
