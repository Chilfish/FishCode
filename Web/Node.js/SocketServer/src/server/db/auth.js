import {v4 as uuid} from 'uuid';

import {User} from './index.js';
import {Token} from '../../utils/JWT.js';
import {parseDate} from '../../utils/index.js';

/**
 * user login handler
 * @param {string} user username
 * @returns login token
 */
export async function login(user) {
  try {
    let userInfo = await User.findOne({name: user});

    // register new user
    if (!userInfo) {
      const newUser = new User({
        uid: uuid(),
        name: user,
        face: 'default.jpg',
        registerTime: parseDate().full,
      });

      await newUser.save().catch((err) => {
        console.error(err);
      });
      userInfo = newUser;
    }

    return tokenHandler(userInfo);
  } catch (err) {
    console.error(err);
  }
}

/**
 * generate token
 * @param {Users} user username
 */
async function tokenHandler(user) {
  try {
    const accessToken = await Token.encrypt({name: user});
    return Promise.resolve(accessToken);
  } catch (err) {
    return Promise.reject(err);
  }
}
