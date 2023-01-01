import mongoose from 'mongoose';
import { dbUri, Users } from './index.js';

await mongoose.connect(dbUri);

export async function findUser(user) {
  return Users.findOne({ name: user });
}
