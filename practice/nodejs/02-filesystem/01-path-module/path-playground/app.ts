import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// console.log('без абсолютного щляху', path.join('data', 'users.json'));
// console.log('з абсолютним щляхом', path.resolve('data', 'users.json'));

// console.log(path.join('one', 'two', '/three', 'four'));
// console.log(path.resolve('one', 'two', '/three', 'four'));

console.log(path.join('data', 'folder', '..', 'users.json'));
console.log(path.resolve('data', 'folder', '..', 'users.json'));
