import express from 'express';
import pool from './db.js';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('LMS API');
});

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses;');

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database connection error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
