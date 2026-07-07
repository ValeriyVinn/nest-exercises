// const path = process.cwd() + '/data/';
// console.log(`File path: ${path}`);

// Створюємо правильний шлях відносно поточної робочої директорії
const dataUrl = new URL('data/', `file://${process.cwd()}`);

// Перетворюємо URL назад у рядок шляху операційної системи
const dataPath = dataUrl.pathname;

console.log(`File path: ${dataPath}`);
