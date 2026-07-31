import http from 'node:http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Node.js');
  server.close();
});

const PORT = 3000;

server.listen(3000, () => {
  console.log(`Server is running on ${PORT} port`);
});
