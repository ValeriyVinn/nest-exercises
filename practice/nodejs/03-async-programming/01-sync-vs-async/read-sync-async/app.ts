import fs from 'fs/promises';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'text.txt');

const typeOfOperation = process.argv[2];

if (typeOfOperation === 'sync') {
  console.log('Start');
  function myFile(filePathParam: string) {
    try {
      const data = readFileSync(filePathParam, 'utf-8');
      console.log(data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  myFile(filePath);
  console.log('Finish');
} else if (typeOfOperation === 'async') {
  console.log('Start');
  async function myFile(filePathParam: string) {
    try {
      const data = await fs.readFile(filePathParam, 'utf-8');
      console.log(data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  void myFile(filePath);
  console.log('Finish');
} else {
  console.log('Offside');
}
