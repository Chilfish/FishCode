import mongoose, {Schema} from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', true);

mongoose.connection.on('reconnectFailed', () => {
  process.nextTick(() => {
    throw new Error('Mongoose couldn\'t reconnect to MongoDB server');
  });
});

const userSchema = new mongoose.Schema({
  uid: String,
  name: {
    type: String,
    required: true,
  },
  face: String,
  registerTime: String,
  friends: [{type: Schema.Types.ObjectId, ref: 'users'}],
});

const messageSchema = new mongoose.Schema({
  poster: {type: Schema.Types.ObjectId, ref: 'users'},
  receiver: {type: Schema.Types.ObjectId, ref: 'users'},
  message: String,
  time: String,
  // type: String,
  // read: Boolean,
});

// collection name will be automatically transformed to lowerCased and plural
export const User = mongoose.model('users', userSchema);

export const Message = mongoose.model('messages', messageSchema);