import { writeFile } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'text.txt');

// 1. Отримуємо текст із терміналу (індекс 2)
const textFromTerminal: string | undefined = process.argv[2];

async function appendLog(text: string): Promise<void> {
  try {
    // flag: 'a' (append) — додає текст у кінець.
    // Додаємо '\n' на початку, щоб кожен новий запис був з нового рядка
    await writeFile(filePath, `\n${text}`, { encoding: 'utf8', flag: 'a' });
    console.log(`Текст "${text}" успішно додано у файл!`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Помилка запису:', error.message);
    }
  }
}

// 2. Валідація: перевіряємо, чи користувач взагалі передав текст
if (!textFromTerminal) {
  console.log('Будь ласка, вкажіть текст. Наприклад: node app.ts "Привіт"');
} else {
  // Запускаємо додавання
  void appendLog(textFromTerminal);
}
