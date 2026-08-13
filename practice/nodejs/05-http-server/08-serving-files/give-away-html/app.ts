import http, { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  // 1. Resolve the path to index.html relative to this script
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'index.html');

  fs.readFile(filePath, 'utf-8')
    .then(data => {
      // 3. Set the HTML header
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');

      // 4. Send the HTML content
      res.end(data);
    })
    .catch(() => {
      // Handle error if index.html is missing or unreadable
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Internal Server Error: Could not load index.html');
    });
});

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
