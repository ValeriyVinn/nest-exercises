import http from 'node:http';

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === '/users' && method === 'POST') {
    res.statusCode = 201;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Created');
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Not Found');
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
