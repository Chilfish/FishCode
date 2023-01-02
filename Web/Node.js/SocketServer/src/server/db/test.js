import mongoose from 'mongoose';
import {Message, User} from './index.js';
import {findFriends, getId} from './User.js';
import {parseDate} from '../../utils/index.js';
import {addMessage, chatRecord} from './Message.js';

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

  function randomString(length, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    let result = '';
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  for (let i = 0; i < cnt; ++i) {
    const poster = userId[Math.floor(Math.random() * userId.length)];
    const receiver = userId.filter(e => e !== poster)[0];

    let message = '';
    for (let j = 1; j <= cnt; ++j) {
      message += randomString(Math.floor(Math.random() * j)) + ' ';
    }

    await addMessage(poster, receiver, message);
  }
}

const user = ['OrganicFish', 'ChillFish'];
const userId = [];
for (const ele of user) {
  userId.push(await getId(ele));
}

await chatRecord(userId[0], userId[1]).then(chats => {
  console.log(chats);
});
