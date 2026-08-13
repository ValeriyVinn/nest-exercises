import http from 'node:http';

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === '/error' && method === 'GET') {
    res.statusCode = 500;
    // Correct MIME type: 'text/html' for HTML or 'text/plain' for plain text
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Internal Server Error');
  } else {
    // Fallback for other routes so requests don't hang
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Not Found');
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
