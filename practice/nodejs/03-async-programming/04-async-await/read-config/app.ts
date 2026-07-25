import { readFile } from 'fs/promises';
import type { PathLike } from 'fs';

type Config = {
  server: string;
  port: number;
  debugMode: boolean;
};

async function readConfig(filePath: PathLike): Promise<Config> {
  const rawData = await readFile(filePath, 'utf-8');

  // Перетворюємо текст у JSON-об'єкт та повертаємо його
  return JSON.parse(rawData) as Config;
}

// 2. Головна функція для запуску процесу
async function main() {
  try {
    // Викликаємо функцію та чекаємо на результат
    const config = await readConfig('config.json');

    console.log('Конфігурацію успішно прочитано:');
    console.log(`Сервер: ${config.server}`);
    console.log(`Порт: ${config.port}`);
    console.log(`Режим відладки: ${config.debugMode}`);
  } catch (error) {
    console.error(`Сталася помилка: ${error instanceof Error ? error.message : String(error)}`);
  }
}

void main();
