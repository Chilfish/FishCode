import {addFriend, findFriends, findUser} from '../db/User.js';
import {chatRecord} from '../db/Message.js';

export function socketHandler(socket, curUser) {
  socket.on('friends', async (res, callback) => {
    findFriends(res)
      .then((friends) => {
        console.log(friends);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  socket.on('addFriend', async (res) => {
    const friend = res.friend;
    await addFriend(curUser, friend).then(res => {
      console.log(res);
    });
  });

  socket.on('search', async (res, callback) => {
    const userInfo = await findUser(res);
    if (!userInfo) {
      callback({userInfo, mes: 404});
    } else {
      callback({userInfo, mes: 200});
    }
  });

  socket.on('message', (arg) => {
    console.log(arg);
  });

  socket.on('chatRecord', async (user, callback) => {
      console.log(user, curUser);
      chatRecord(user, curUser).then(chats => {
        console.log(chats);
      });
    },
  );

}