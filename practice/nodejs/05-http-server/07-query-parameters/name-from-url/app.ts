import http from 'node:http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const requestUrl = req.url ?? '/';
  const url = new URL(requestUrl, 'http://localhost:3000');
  const name = url.searchParams.get('name') ?? 'Guest';

  res.end(`Hello ${name}`);
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
