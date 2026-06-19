// Зчитуємо змінні з глобального об'єкта process.env
const port = process.env.PORT;
const host = process.env.HOST;

console.log(`Server is running on http://${host}:${port}`);
