import { parseDate } from '../../utils/index.js';
import { getId } from './User.js';
import { Message, User, orFilter } from './index.js';

export async function addMessage(sender, receiver, message) {
  try {
    const senderId = await getId(sender),
      receiverId = await getId(receiver),
      time = parseDate().fullTime;
    message.replace(/[<>&"]/g, function (c) {
      return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
    });
    console.log(message);

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

export async function deleteMessage(sender, receiver) {
  try {
    const senderId = await getId(sender),
      receiverId = await getId(receiver);

    return Message.deleteMany(orFilter(senderId, receiverId));
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

    const list = await Message.find(orFilter(user1, user2));

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
