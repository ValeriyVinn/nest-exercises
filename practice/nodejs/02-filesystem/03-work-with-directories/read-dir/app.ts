import { mkdir, readdir, rmdir } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const animals = [
  'cat',
  'dog',
  'dove',
  'cow',
  'raven',
  'hamster',
  'bear',
  'wolf',
  'rabbit',
  'snake',
];

function getRandomAnimals(source: string[], count: number): string[] {
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const selectedAnimals = getRandomAnimals(animals, 5);
console.log('Вибрані тварини:', selectedAnimals);

async function createAnimalDirs(animalList: string[]): Promise<void> {
  for (const animal of animalList) {
    const dirPath = path.join(__dirname, 'animals', animal);
    try {
      await mkdir(dirPath, { recursive: true });
      console.log(`Тека "${animal}" успішно створена!`);
    } catch (error) {
      console.error(`Помилка при створенні теки "${animal}":`, error);
    }
  }
}

// Виклик
await createAnimalDirs(selectedAnimals);

async function readDirectory() {
  const folderPath = path.join(__dirname, 'animals'); // Заміни на шлях до теки, яку хочеш прочитати

  try {
    const files = await readdir(folderPath);
    console.log('Вміст теки:', files);
  } catch (err) {
    console.error('Помилка читання теки:', err);
  }
}

await readDirectory();

async function removeAnimalDirs(animalList: string[]): Promise<void> {
  for (const animal of animalList) {
    const dirPath = path.join(__dirname, 'animals', animal);
    try {
      await rmdir(dirPath, { recursive: true });
      console.log(`Тека "${animal}" успішно видалена!`);
    } catch (error) {
      console.error(`Помилка при видаленні теки "${animal}":`, error);
    }
  }
}

// Виклик
await removeAnimalDirs(selectedAnimals);
