import { writeFile } from 'node:fs/promises';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'text.txt');
const textFromTerminal: string | undefined = process.argv[2];

// Визначаємо, що функція повертає Promise, який не містить даних (void)
async function createAndWriteFile(): Promise<void> {
  try {
    // TypeScript автоматично знає, що 'text.txt' — це string (шлях),
    // а 'Привіт, я тут' — це string (дані).
    await writeFile('text.txt', textFromTerminal || 'Привіт, я тут', 'utf8');
    console.log('Файл успішно створено та записано!');
  } catch (error: unknown) {
    // У TypeScript помилка в catch має тип unknown.
    // Перевіряємо, чи є вона екземпляром стандартної помилки Error:
    if (error instanceof Error) {
      console.error('Ой, щось пішло не так:', error.message);
    } else {
      console.error('Сталася невідома помилка:', error);
    }
  }
}
// Запускаємо функціюno
void createAndWriteFile();

function myFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf-8');
}

myFile(filePath)
  .then(data => console.log(data))
  .catch(err => console.error(err));

//   import { writeFile } from 'node:fs/promises';
// import fs from 'fs/promises';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const filePath = path.join(__dirname, 'text.txt'); // Використовуємо цей шлях всюди

// // Твоя функція читання (вона вже асинхронна, бо повертає Promise)
// function myFile(filePath: string): Promise<string> {
//   return fs.readFile(filePath, 'utf-8');
// }

// async function createAndWriteFile(): Promise<void> {
//   try {
//     // 1. Чекаємо, поки файл СТВОРИТЬСЯ
//     await writeFile(filePath, 'Привіт, я тут', 'utf8');
//     console.log('Файл успішно створено та записано!');

//     // 2. Тепер, коли файл точно є, ЧЕКАЄМО його читання
//     const data = await myFile(filePath);
//     console.log('Зміст файлу:', data);

//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Ой, щось пішло не так:', error.message);
//     } else {
//       console.error('Сталася невідома помилка:', error);
//     }
//   }
// }

// // Запускаємо головний процес
// void createAndWriteFile();
