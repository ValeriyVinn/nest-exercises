import http from 'node:http';

const server = http.createServer((req, res) => {
  console.log(`Дата: ${new Date().toLocaleTimeString('uk-UA')}`);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(`Hello Node.js.`);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running`);
  console.log(`Порт: ${PORT} port`);
});
