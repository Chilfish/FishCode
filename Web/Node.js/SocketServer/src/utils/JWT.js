import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const {JWT_TOKENS_SECRET: secret, JWT_EXPIRY: expiry} = process.env;
const algorithm = 'HS256';

export const Token = {
  encrypt(data, time = expiry) {
    return new Promise((resolve, reject) => {
      jwt.sign(data, secret, {expiresIn: time, algorithm}, (err, token) => {
        if (err) return reject(err);
        resolve(token);
      });
    });
  },

  decrypt(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, {algorithm}, (err, payload) => {
        if (err) return reject(err);
        resolve(payload);
      });
    });
  },
};
