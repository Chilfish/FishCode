import {User} from './index.js';

export async function findUser(user) {
  try {
    return User.findOne({name: user});
  } catch (err) {
    console.error(err);
  }
}

export async function findFriends(user) {
  try {
    return (await User.findOne({name: user}).populate('friends'))?.friends;
  } catch (err) {
    console.error(err);
  }
}

export async function addFriend(user, friend) {
  try {
    return User.update(
      {name: user},
      {
        $addToSet: {
          friends: await getId(friend),
        },
      },
    );
  } catch (err) {
    console.error(err);
  }

}

export async function getId(username) {
  try {
    return User.findOne({name: username}, '_id');
  } catch (err) {
    console.error(err);
  }
}