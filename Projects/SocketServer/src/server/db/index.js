import dotenv from 'dotenv';
import mongoose, { Schema } from 'mongoose';

dotenv.config();

mongoose.set('strictQuery', true);

mongoose.connection.on('reconnectFailed', () => {
  process.nextTick(() => {
    throw new Error("Mongoose couldn't reconnect to MongoDB server");
  });
});

const userSchema = new Schema({
  uid: String,
  name: {
    type: String,
    required: true,
  },
  face: { type: String, default: 'default.png' },
  registerTime: String,
  addReq: [{ type: Schema.Types.ObjectId, ref: 'users' }], // request of add friend
  friends: [{ type: Schema.Types.ObjectId, ref: 'users' }],
});

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'users' },
  receiver: { type: Schema.Types.ObjectId, ref: 'users' },
  message: String,
  time: String,
  // type: String,
  // read: Boolean,
});

export const orFilter = (user1, user2) => {
  return {
    $or: [
      { sender: user1._id, receiver: user2._id },
      { sender: user2._id, receiver: user1._id },
    ],
  };
};

// collection name will be automatically transformed to lowerCased and plural
export const User = mongoose.model('users', userSchema);

export const Message = mongoose.model('messages', messageSchema);
