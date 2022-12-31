// import { MongoClient } from 'mongodb';

// const url = 'mongodb://localhost:27017/';
// const client = new MongoClient(url);

// async function run() {
//   try {
//     const db = client.db('Chat');
//     const users = db.collection('Users');

//     const data = {
//       name: 'OrganicFish',
//       face: 'user1.png',
//     };

//     // await users.insertOne(data);

//     await users.findOne({ name: 'ChillFish' }).then((res) => {
//       console.log(res);
//     });
//   } finally {
//     await client.close();
//   }
// }

// run().catch(console.dir);

import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/Chat';

main()
  .catch((err) => console.error(err))
  .finally(() => {});

mongoose.connection.on('reconnectFailed', () => {
  process.nextTick(() => {
    throw new Error("Mongoose couldn't reconnect to MongoDB server");
  });
});

const userSchema = new mongoose.Schema({
  name: String,
  face: String,
});

// collection name will be automatically transformed to lowercased and plural
const Users = mongoose.model('users', userSchema);

async function main() {
  await mongoose.connect(url);

  const user1 = new Users({
    name: 'Fish',
    face: 'f.png',
  });

  user1.save();
  // console.log(await Users.find());
}
