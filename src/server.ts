import express from 'express';

const app = express();

app.get('/test', (request, response) => {
  return response.send('Teste Get');
});

app.post('/test-post', (request, response) => {
  return response.send('Test Post')
});

app.listen('3000', () => {
  console.log('Server is running on port 3000...')
});