import http from 'node:http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('You get all you need');
  server.close();
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
