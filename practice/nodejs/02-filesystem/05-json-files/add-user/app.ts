import path from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const argName = process.argv[2]; // ім'я користувача з терміналу

async function getName(): Promise<void> {
  try {
    const filePath = path.join(__dirname, 'users.json');

    // Читаємо файл
    const data = await readFile(filePath, 'utf8');
    const users = data.trim() ? (JSON.parse(data) as { id: number; name: string }[]) : [];
    console.log(users);
    // Визначаємо новий id
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    // Створюємо нового користувача
    const newUser = { id: newId, name: argName };

    // Додаємо у масив
    users.push(newUser);

    // Записуємо назад у файл
    await writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');

    console.log(`Користувач доданий: id=${newUser.id}, name=${newUser.name}`);
  } catch (error) {
    console.error('Помилка роботи з файлом:', error);
  }
}

void getName();
