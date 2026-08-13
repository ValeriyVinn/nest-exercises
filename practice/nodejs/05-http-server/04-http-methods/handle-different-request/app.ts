import http from 'node:http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  switch (req.method) {
    case 'GET':
      res.end('I am a GET');
      break;
    case 'PUT':
      res.end('I am PUT');
      break;
    case 'PATCH':
      res.end('I am PATCH');
      break;
    case 'DELETE':
      res.end('I am DELETE');
      break;
    default:
      res.end('My name is NOTHING');
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is runing on port: ${PORT}`);
});
