import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Express');
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
