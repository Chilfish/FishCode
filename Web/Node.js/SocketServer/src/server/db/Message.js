import {Message, User} from './index.js';
import {parseDate} from '../../utils/index.js';
import {getId} from './User.js';

export async function addMessage(sender, receiver, message) {
  try {
    const senderId = await getId(sender),
      receiverId = await getId(receiver),
      time = parseDate().fullTime;

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message,
      time,
    });
    // console.log(newMessage);
    await newMessage.save();
    return time;
  } catch (err) {
    console.error(err);
  }
}

export async function chatRecord(user1, user2) {
  try {
    if (typeof user1 === 'string' || typeof user2 === 'string') {
      user1 = await getId(user1);
      user2 = await getId(user2);
    }

    const list = await Message.find({
      $or: [
        {sender: user1._id, receiver: user2._id},
        {sender: user2._id, receiver: user1._id},
      ],
    });

    return await Promise.all(
      list.map(async (chat) => {
        const sender = await User.findById(chat.sender);
        const receiver = await User.findById(chat.receiver);
        return {
          sender: sender.name,
          receiver: receiver.name,
          message: chat.message,
          time: chat.time,
        };
      })
    );
  } catch (err) {
    console.error(err);
  }
}
