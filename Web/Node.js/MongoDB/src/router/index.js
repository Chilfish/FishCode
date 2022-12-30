import express from 'express';
import { deleteAll, getPosts, uploadPost } from '../db/Post';

const routers = express.Router();

routers.get('/post', async (req, res) => {
  res.json(await getPosts());
});

routers.post('/post/upload', async (req, res) => {
  const mes = await uploadPost(req.body);
  res.send(mes);
});

routers.delete('/post/deleteAll', async (req, res) => {
  const mes = await deleteAll();
  res.send(mes);
});

export { routers };
