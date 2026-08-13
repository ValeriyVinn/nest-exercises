import http from 'node:http';

const header = '<h1> Announsement </h1>';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  res.end(header);
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
