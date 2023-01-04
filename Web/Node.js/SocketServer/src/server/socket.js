import {addFriend, addReq, findFriends, findUser} from './db/User.js';
import {addMessage, chatRecord} from './db/Message.js';
import {api} from '../socketApi.js';

export function socketHandler(socket, curUser) {
  let chatTo = '';
  socket.on(api.join, (user) => {
    const chat = [user, curUser].sort();
    chatTo = `${chat[0]} ${chat[1]}`;
    console.log('chat room: ', chatTo);
    socket.join(chatTo);
  });

  socket.on(api.getFriends, async (res, callback) => {
    findFriends(curUser)
      .then((friends) => {
        friends.sort((a, b) => {
          if (a.time === '') {
            return -1;
          }
          return Date.parse(b.time) - Date.parse(a.time);
        });
        callback(friends);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  socket.on(api.addReq, async (friend, callback) => {
    await addReq(curUser, friend).then((mes) => {
      callback({mes});
    });
  });

  socket.on(api.addFriend, async (friend, callback) => {
    await addFriend(curUser, friend).then((mes) => {
      callback({mes});
    });
  });

  socket.on(api.search, async (res, callback) => {
    const userInfo = await findUser(res, curUser);

    if (!userInfo) {
      return callback({userInfo: null, mes: 404});
    }

    const {name, face} = userInfo.info;
    callback({
      isFriend: userInfo.isFriends,
      userInfo: {name, face},
      mes: 200,
    });
  });

  socket.on(api.sendMessage, async (arg, callback) => {
    const {receiver, message} = arg;

    await addMessage(curUser, receiver, message).then((time) => {
      callback(time);

      socket.to(chatTo).emit(api.message, {
        data: {receiver, message, time},
      });
    });
  });

  socket.on(api.chatRecord, async (user, callback) => {
    // console.log('chatter: ', user, curUser);

    await chatRecord(user, curUser).then((chats) => {
      callback(chats);
    });
  });
}
