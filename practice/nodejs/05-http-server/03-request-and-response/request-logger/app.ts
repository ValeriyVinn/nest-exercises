import http from 'node:http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.statusMessage = 'ok';
  console.log(
    `Method: ${req.method}, \n URL: ${req.url}, \n  Headers: ${JSON.stringify(req.headers.host)}, \n  HTTP Version: ${req.httpVersion}`,
  );
  res.end(`${res.statusCode} ${res.statusMessage}`);
  //   server.close();
});
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
