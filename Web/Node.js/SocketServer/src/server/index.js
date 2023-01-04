import express from 'express';
import cors from 'cors';
import {createServer} from 'http';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import {login} from './db/auth.js';
import {socketHandler} from './socket.js';
import {Token} from '../utils/JWT.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {cors: true});

dotenv.config();
const port = process.env.SOCKET_PORT || 3000;
const dbUri = process.env.MONGODB || 'mongodb://localhost:27017/Chat';

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({extended: false}));

io.on('connection', async (socket) => {
  let token = socket.request._query.token,
    curUser = '';

  await Token.decrypt(token)
    .then((res) => {
      curUser = res.name.name;
    })
    .catch((err) => {
      console.log('error! ' + err);
      socket.emit('unauthorized');
      socket.disconnect();
    });

  console.log(`new connection! id: ${socket.id}, username: ${curUser}`);
  socketHandler(socket, curUser);

  socket.on('disconnect', (reason) => {
    console.log(`\n${curUser} is disconnected... reason: ${reason}`);
  });
});

app.post('/login', async (req, res) => {
  console.log(req.body);
  const {name, register} = req.body;
  let newUser = false;

  await login(name, register).then((user) => {
    if (user.mes === 404) newUser = true;
    res.json({newUser, token: user.token});
  });
});

httpServer.listen(port, async () => {
  console.log(`server is running on ws://localhost:${port}`);
  await mongoose.connect(dbUri).then(() => {
    console.log('MongoDB is connecting');
  });
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected');
    process.exit(0);
  });
});
