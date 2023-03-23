import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { mockData } from './src/mockData.js';

const app = express();
const port = 3001;
let jsonParser = bodyParser.json();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.get('/bulletin_data', (req, res) => {
  const { offset = 0, limit = 10 } = req.query;
  let data = mockData.slice(Number(offset), Number(limit) + Number(offset));
  if (data.length === 0) {
    data = 'Все данные уже получены';
  }
  res.send(data);
});

app.post('/result', jsonParser, (req, res) => {
  fs.appendFileSync('./result/result.js', JSON.stringify(req.body), 'utf-8');
  res.status(200).end();
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
