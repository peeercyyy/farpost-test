import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { mockData } from './src/mockData.js';

const app = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/bulletin_data', (req, res) => {
  const {offset = 0, limit = 10} = req.query;
  const data = mockData.slice(offset, limit + offset)
  res.send(data);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
