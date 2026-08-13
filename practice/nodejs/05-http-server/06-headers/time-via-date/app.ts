import http from 'node:http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const now = new Date();

  res.end(`Current time is: ${now.toLocaleTimeString()}`);
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
