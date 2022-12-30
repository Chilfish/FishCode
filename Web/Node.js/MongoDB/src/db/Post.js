import { db } from '.';

const cole = db.collection('post');

export function getPosts() {
  return cole.find().toArray();
}

export function uploadPost(post) {
  const res = cole.insertOne(post);
  return res.acknowledged;
}

export function deleteAll() {
  return cole.deleteMany().acknowledged;
}
