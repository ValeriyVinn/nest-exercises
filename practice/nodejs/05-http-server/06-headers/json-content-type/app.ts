import http from 'node:http';

const data = {
  message: 'I am a JSON',
  success: true,
};

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
