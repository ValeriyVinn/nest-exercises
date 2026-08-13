import http from 'node:http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const requestUrl = req.url ?? '/';
  const url = new URL(requestUrl, 'http://localhost:3000');
  const first = url.searchParams.get('first') ?? '5';
  const second = url.searchParams.get('second') ?? '6';

  res.end(`
  <h2 style="color: blue;">Sum from url is: ${Number(first) + Number(second)}</h2>
  <h2 style="color: red;">Multiply from url is: ${Number(first) * Number(second)}</h2>
`);
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
