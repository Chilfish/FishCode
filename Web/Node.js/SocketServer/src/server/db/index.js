// import {MongoClient} from 'mongodb';
//
// const url = 'mongodb://localhost:27017/';
// const client = new MongoClient(url);
//
// async function run() {
//   try {
//     const db = client.db('Chat');
//     const users = db.collection('Users');
//
//     const data = {
//       name: 'OrganicFish',
//       face: 'user1.png',
//     };
//
//     await users.insertOne(data);
//   } finally {
//     await client.close();
//   }
// }
//
// run().catch(console.dir);

import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

mongoose.connection.on('reconnectFailed', () => {
  process.nextTick(() => {
    throw new Error("Mongoose couldn't reconnect to MongoDB server");
  });
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  face: String,
});

// collection name will be automatically transformed to lowerCased and plural
export const Users = mongoose.model('users', userSchema);

export const dbUri = 'mongodb://localhost:27017/Chat';
