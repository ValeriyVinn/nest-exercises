import http from 'node:http';

// 1. Створюємо глобальну змінну-лічильник
let requestCount = 0;

const server = http.createServer((req, res) => {
  // Браузери часто роблять прихований запит на /favicon.ico.
  // Ігноруємо його, щоб лічильник рахував лише реальні заходи на сайт.
  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  // 2. Збільшуємо лічильник при кожному новому запиті
  requestCount++;

  // 3. Виводимо інформацію в консоль сервера
  console.log(`Запит #${requestCount}`);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // Виводимо номер запиту також користувачу в браузер
  res.end(`Hello Node.js. Ви відвідувач №${requestCount}`);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
