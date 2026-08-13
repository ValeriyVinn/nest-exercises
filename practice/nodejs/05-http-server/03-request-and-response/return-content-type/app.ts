import http from 'node:http';

const server = http.createServer((req, res) => {
  // Extract the URL path from the incoming request
  const url = req.url;

  if (url === '/text') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('This is plain text response.');
  } else if (url === '/html') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h1>Hello!</h1><p>This is rendered as <strong>HTML</strong>.</p>');
  } else if (url === '/json') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // Create a JavaScript object and convert it to a JSON string
    const data = { message: 'Success', status: 'OK', code: 200 };
    res.end(JSON.stringify(data));
  } else {
    // Handle 404 - Not Found for any other route
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('404 Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
