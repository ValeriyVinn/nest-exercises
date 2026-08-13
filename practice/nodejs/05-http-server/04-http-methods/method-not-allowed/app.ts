import http from 'node:http';

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Endpoint /users
  if (url === '/users') {
    // 1. Handle supported methods
    if (method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'List of users' }));
    } else if (method === 'POST') {
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'User created' }));
    }
    // 2. Handle unsupported HTTP methods for /users -> 405 Method Not Allowed
    else {
      res.statusCode = 405; // Method Not Allowed
      res.setHeader('Allow', 'GET, POST'); // Inform client which methods are supported
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end(`405 Method Not Allowed: ${method} is not supported on ${url}`);
    }
  }
  // Handle unknown endpoints -> 404 Not Found
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('404 Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
