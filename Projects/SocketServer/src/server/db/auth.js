import { v4 as uuid } from 'uuid';

import { Token } from '../../utils/JWT.js';
import { parseDate } from '../../utils/index.js';
import { User } from './index.js';

/**
 * user login handler
 * @param {string} user username
 * @param {boolean} isNew is new user
 * @returns login token
 */
export async function login(user, isNew) {
  try {
    let token = '',
      userInfo;

    if (isNew) {
      const newUser = new User({
        uid: uuid(),
        name: user,
        face: 'default.jpg',
        registerTime: parseDate().fullTime,
      });
      userInfo = newUser;
      await newUser.save();
    } else {
      userInfo = await User.findOne({ name: user });
      if (!userInfo) {
        return { mes: 404, token };
      }
    }

    token = await tokenHandler(userInfo);
    return { mes: 200, token };
  } catch (err) {
    console.error(err);
  }
}

/**
 * generate token
 * @param {User} user username
 */
async function tokenHandler(user) {
  try {
    const accessToken = await Token.encrypt({ name: user });
    return Promise.resolve(accessToken);
  } catch (err) {
    return Promise.reject(err);
  }
}
