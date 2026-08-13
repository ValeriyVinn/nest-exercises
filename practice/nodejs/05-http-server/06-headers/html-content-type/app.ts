import http from 'node:http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end("it's my HTML");
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
