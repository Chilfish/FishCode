import mongoose, {mongo} from 'mongoose';
import {getId, findUser} from '../server/db/User.js';
import {addMessage, chatRecord} from '../server/db/Message.js';

await mongoose.connect('mongodb://localhost:27017/Chat');

const filter = {name: 'ChillFish'};

// await User.updateOne(filter, {
//   $addToSet: {
//     friends: await getId('Fish'),
//   },
// });

// console.log(await findFriends('ChillFish'));

async function randomMes() {
  const cnt = 5;

  function randomString(
    length,
    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  ) {
    let result = '';
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  for (let i = 0; i < cnt; ++i) {
    const sender = userId[Math.floor(Math.random() * userId.length)];
    const receiver = userId.filter((e) => e !== sender)[0];

    let message = '';
    for (let j = 1; j <= cnt; ++j) {
      message += randomString(Math.floor(Math.random() * j)) + ' ';
    }

    await addMessage(sender, receiver, message);
  }
}

const user = ['OrganicFish', 'ChillFish', 'Fish'];
const userId = [];
for (const ele of user) {
  userId.push(await getId(ele));
}

// await chatRecord(userId[0], userId[1]).then(chats => {
//   console.log(chats);
// });

// await findUser('Fish', 'ChillFish').then((res) => {
//   console.log(res);
// });

await mongoose.disconnect();

const friends = [
  {
    name: 'OrganicFish',
    face: 'default.jpg',
    message: 'fdsfsddf',
    time: '2023/01/04 12:10:51',
  },
  {
    name: 'Fish',
    face: 'default.jpg',
    message: 'hello',
    time: '',
  },
  {
    name: 'Fish2',
    face: 'default.jpg',
    message: 'hello',
    time: '',
  },
];
friends.sort((a, b) => {
  if (a.time === '') {
    return -1;
  }
  return Date.parse(b.time) - Date.parse(a.time);
});

console.log(friends);
