import http from 'node:http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Powered-By', 'My Custom Node.js Server');
  res.end("It's my own content");
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
