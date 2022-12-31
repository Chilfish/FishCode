import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { dbUri, Users } from './db/index.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = 3000;

io.on('connection', (socket) => {
  socket.emit('hello', `new connection! id: ${socket.id}`);
  console.log(`new connection! id: ${socket.id}`);

  socket.on('message', (arg) => {
    console.log(arg);
  });

  socket.on('login', (res)=>{
    console.log(res);
  })
});

io.on('disconnection', (socket) => {
  console.log(socket.id + ' is disconnected');
});

httpServer.listen(port, () => {
  console.log(`server is running on ws://localhost:${port}`);
});
