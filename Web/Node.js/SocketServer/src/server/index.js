import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {createServer} from 'http';
import {Server} from 'socket.io';
import socketioJWT from 'socketio-jwt';
import mongoose from 'mongoose';

import {login} from './db/auth.js';
import {socketHandler} from './socket/index.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {cors: true});

dotenv.config();
const port = process.env.SOCKET_PORT || 3000;
const secret = process.env.JWT_TOKENS_SECRET;
const dbUri = process.env.MONGODB || 'mongodb://localhost:27017/Chat';

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({extended: false}));

io.use(
  socketioJWT.authorize({
    secret,
    handshake: true,
  }),
);

io.on('connection', (socket) => {
  const curUser = socket.decoded_token.name.name;
  console.log(
    `new connection! id: ${socket.id}, username: ${curUser}`,
  );
  socketHandler(socket, curUser);
});

io.on('disconnection', (socket) => {
  console.log(socket.id + ' is disconnected');
});

app.post('/login', async (req, res) => {
  const name = req.body.name;

  await login(name).then((token) => {
    res.json(token);
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
