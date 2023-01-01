import mongoose from 'mongoose';
import { dbUri, Users } from './index.js';

await mongoose.connect(dbUri);

export async function login(user) {
  const userInfo = await Users.findOne({ name: user });
  return userInfo;
}
