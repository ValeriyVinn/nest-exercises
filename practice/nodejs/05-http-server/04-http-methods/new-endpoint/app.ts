import http from 'node:http';

// In-memory data store for testing
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // 1. Handle GET /users
  if (url === '/users' && method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(users));
  }

  // 2. Handle POST /users
  else if (url === '/users' && method === 'POST') {
    let body = '';

    // Collect data chunks coming from the request stream
    req.setEncoding('utf8');
    req.on('data', (chunk: string) => {
      body += chunk;
    });

    // Once all data chunks are received
    req.on('end', () => {
      try {
        const newUser = JSON.parse(body) as { id: number; name: string };

        // Assign a simple ID and add to our array
        newUser.id = users.length + 1;
        users.push(newUser);

        res.statusCode = 201; // 201 Created
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ message: 'User created successfully', user: newUser }));
      } catch {
        res.statusCode = 400; // Bad Request if JSON parsing fails
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
  }

  // 3. Fallback for unhandled routes
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Not Found\n');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
