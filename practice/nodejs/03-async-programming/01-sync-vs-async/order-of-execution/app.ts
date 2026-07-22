import fs from 'fs/promises';
import { readFileSync } from 'fs';
import path from 'path';

const filePath = path.resolve('E:/НАВЧАЛОЧКА/HW/APP/exercises/files/intro.mp4');

const typeOfOperation = process.argv[2];

if (typeOfOperation === 'sync') {
  console.log('Start');
  function myFile(filePathParam: string) {
    try {
      console.time('Час виконання файлу');
      readFileSync(filePathParam, 'utf-8');
      console.timeEnd('Час виконання файлу');
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
      console.time('Час виконання файлу');
      await fs.readFile(filePathParam, 'utf-8');
      console.timeEnd('Час виконання файлу');
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  void myFile(filePath);
  console.log('Finish');
} else {
  console.log('"sync" or "async", please');
}
