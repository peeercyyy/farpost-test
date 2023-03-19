import express from 'express';
import path from 'path';
import { mockData } from './src/mockData.js';

const app = express();
const port = 3001;

app.get('/bulletin_data', (req, res) => {
  res.send(mockData);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
