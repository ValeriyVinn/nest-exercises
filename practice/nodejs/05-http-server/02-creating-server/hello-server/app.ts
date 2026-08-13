import http from 'node:http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Server');
  server.close();
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
