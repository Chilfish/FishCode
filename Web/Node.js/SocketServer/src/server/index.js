import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { resolve } from 'path';
import { login } from './db/login.js';
import { findUser } from './db/main.js';

const app = express();
app.use(express.static(resolve() + '/public'));

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: true });
const port = 3000;

io.on('connection', (socket) => {
  socket.emit('hello', `new connection! id: ${socket.id}`);
  console.log(`new connection! id: ${socket.id}`);

  socket.on('message', (arg) => {
    console.log(arg);
  });

  socket.on('login', async (res, callback) => {
    const user = res.name;
    // console.log(res);
    const userInfo = await login(user);
    console.log(userInfo);

    if (userInfo !== null) {
      callback({ userInfo, mes: 200 });
    }
  });

  socket.on('search', async (res, callback) => {
    const userInfo = await findUser(res);
    console.log(userInfo);

    if (userInfo !== null) {
      callback({ userInfo, mes: 200 });
    }
  });
});

io.on('disconnection', (socket) => {
  console.log(socket.id + ' is disconnected');
});

httpServer.listen(port, () => {
  console.log(`server is running on ws://localhost:${port}`);
});
