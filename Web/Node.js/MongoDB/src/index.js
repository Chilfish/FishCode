import express from 'express';
import { routers } from './router';

const app = express();

app.use(express.json()).use(express.urlencoded({ extended: false }));

app.route('/api').get((req, res) => {
  res.send({
    mes: 'hello',
  });
});

app.use('/api', routers);

app.listen('1023', () => {
  console.log('http://localhost:1023/api');
});
