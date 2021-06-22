import 'reflect-metadata';
import express from 'express';

import './database';

const app = express();

app.get('/test', (request, response) => response.send('Teste Get'));

app.post('/test-post', (request, response) => response.send('Test Post'));

app.listen('3000', () => {
  console.log('Server is running on port 3000...');
});
