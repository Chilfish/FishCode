import {Message, User} from './index.js';
import {parseDate} from '../../utils/index.js';
import {getId} from './User.js';

export async function addMessage(poster, receiver, message) {
  try {
    const newMessage = new Message({
      poster,
      receiver,
      message,
      time: parseDate().full,
    });

    await newMessage.save();
  } catch (err) {
    console.error(err);
  }
}

export async function chatRecord(user1, user2) {
  if (typeof user1 === 'string' || typeof user2 === 'string') {
    user1 = await getId(user1);
    user2 = await getId(user2);
  }

  try {
    const list = await Message.find({
      $or: [
        {poster: user1._id, receiver: user2._id},
        {poster: user2._id, receiver: user1._id},
      ],
    });

    return await Promise.all(list.map(async (chat) => {
      const poster = await User.findById(chat.poster);
      const receiver = await User.findById(chat.receiver);

      return {
        poster: poster.name,
        receiver: receiver.name,
        message: chat.message,
        time: chat.time,
      };
    }));
  } catch (err) {
    console.error(err);
  }
}