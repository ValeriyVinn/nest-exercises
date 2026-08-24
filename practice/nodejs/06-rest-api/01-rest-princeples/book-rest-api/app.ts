import http from 'node:http';

const books = [
  { id: 1, title: 'Clean Code' },
  { id: 2, title: 'Golden Node.js' },
  { id: 3, title: 'Simling React' },
];

const PORT = 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  // Check for GET method and /book URL path
  if (req.method === 'GET' && req.url === '/books') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(books));
  } else {
    // Return 404 for any other path or HTTP method
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/book`);
});

// import http from 'node:http';

// const books = [
//   { id: 1, title: 'Clean Code' },
//   { id: 2, title: 'Golden Node.js' },
//   { id: 3, title: 'Simling React' },
// ];

// const PORT = 3000;

// const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
//   // Parse URL and extract path and query params
//   const parsedUrl = new URL(req.url || '', `http://${req.headers.host}`);
//   const pathname = parsedUrl.pathname;
//   const idQuery = parsedUrl.searchParams.get('id');

//   if (req.method === 'GET' && pathname === '/books') {
//     res.writeHead(200, { 'Content-Type': 'application/json' });

//     // If ?id= is provided, filter by ID
//     if (idQuery) {
//       const bookId = Number(idQuery);
//       const book = books.find((b) => b.id === bookId);

//       if (!book) {
//         res.writeHead(404, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Book not found' }));
//         return;
//       }

//       res.end(JSON.stringify(book));
//       return;
//     }

//     // If no ?id parameter is provided, return all books
//     res.end(JSON.stringify(books));
//   } else {
//     res.writeHead(404, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ message: 'Route Not Found' }));
//   }
// });

// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/books`);
// });
