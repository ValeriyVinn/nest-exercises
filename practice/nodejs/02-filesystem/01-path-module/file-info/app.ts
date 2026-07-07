import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Directory:', path.basename(__dirname));
console.log('File name:', path.basename(__filename));
console.log('Extension name:', path.extname(__filename));

// console.log(__dirname);
