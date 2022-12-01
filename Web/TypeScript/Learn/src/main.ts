import express from 'express';
import cors from 'cors';
import { routers } from './router/user';

const app = express();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }));

app.use('/api', routers);

app.listen('1023', () => {
  console.log('api server running on http://localhost:1023/api/users');
});
