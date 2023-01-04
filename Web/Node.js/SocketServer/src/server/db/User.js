import {User, Message, orFilter} from './index.js';

export async function findUser(user, curUser) {
  try {
    const isFriends =
      (await User.findOne({name: curUser}).populate('friends'))?.friends.filter(
        (friend) => friend.name === user
      ).length !== 0;

    const info = await User.findOne({name: user});
    return {isFriends, info};
  } catch (err) {
    console.error(err);
  }
}

export async function findFriends(user) {
  try {
    const list = (await User.findOne({name: user}).populate('friends'))
        ?.friends,
      userId = await getId(user);

    return await Promise.all(
      list.map(async (friend) => {
        const res = await Message.find(orFilter(friend, userId))
          .sort({time: -1})
          .limit(1);

        let message = '',
          time = '';

        if (res.length) {
          message = res[0].message.replaceAll('\n', ' ').substring(0, 15);
          time = res[0].time;
        }

        const {name, face} = friend;
        return {name, face, message, time};
      })
    );
  } catch (err) {
    console.error(err);
  }
}

export async function addReq(user, friend) {
  try {
    const userId = await getId(user),
      friendId = await getId(friend);

    await User.findByIdAndUpdate(friendId, {
      $addToSet: {
        addReq: userId,
      },
    });
    return 200;
  } catch (err) {
    return 400;
  }
}

export async function addFriend(user, friend) {
  try {
    const userId = await getId(user),
      friendId = await getId(friend);

    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        friends: friendId,
      },
    });

    await User.findByIdAndUpdate(friendId, {
      $addToSet: {
        friends: userId,
      },
    });

    return 200;
  } catch (err) {
    return 400;
  }
}

export async function getId(username) {
  try {
    return User.findOne({name: username}, '_id');
  } catch (err) {
    console.error(err);
  }
}
