import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'message.txt');
//   -----------------------------------------
const delayArg = Number(process.argv[2]);
async function main(ms: number) {
  try {
    await new Promise(resolve => setTimeout(resolve, ms));
    console.log("It's my decision, I'm go to sleep");
  } catch (err) {
    console.error('Помилка:', err);
  }
}
// void main(delayArg);

// ----------------------------------------

async function readFileAsync() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// ---------------------------------------

async function dynamicPromiseAsync() {
  try {
    const result = await new Promise((resolve, reject) => {
      const isSuccess = Math.random() > 0.5;
      if (isSuccess) {
        resolve('Дані успішно завантажено!');
        void readFileAsync();
        console.log('Before decision');
        void main(delayArg);
      } else {
        reject(new Error('Помилка: мережа недоступна.'));
      }
    });
    console.log('Успіх:', result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Збій:', error.message);
    } else {
      console.error('Збій: Невідома помилка');
    }
  }
}

void dynamicPromiseAsync();
