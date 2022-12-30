import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

const dbName = 'test';
export const db = client.db(dbName);
