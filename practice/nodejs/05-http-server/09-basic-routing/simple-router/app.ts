import http, { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePathIndex = path.join(__dirname, 'index.html');
const filePathUsers = path.join(__dirname, 'users.json');

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;

  if (url === '/html') {
    fs.readFile(filePathIndex, 'utf-8')
      .then(data => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(data);
      })
      .catch(() => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Internal Server Error: Could not load index.html');
      });
  } else if (url === '/json') {
    fs.readFile(filePathUsers, 'utf-8')
      .then(data => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(data);
      })
      .catch(() => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Internal Server Error: Could not load users.json');
      });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
