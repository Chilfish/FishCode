import { getDb, addDb } from '../db';
import { User } from 'src/interface/user';
import express from 'express';

const routers = express.Router();

const getUsers = async (req: any, res: any) => {
  try {
    const db = await getDb();

    if (Object.keys(req.query).length) {
      const user = db.users.find((user: any) => user.id === req.query.id);

      if (Object.keys(req.query)[0] !== 'id') {
        res.send({
          status: 404,
          mes: '参数错误',
        });
      } else if (!user) {
        res.send({
          status: 404,
          mes: '用户不存在',
        });
      }
      console.log(user);

      res.send(user);
    } else {
      res.send(db);
    }
  } catch (err: any) {
    res.status(500).send({
      error: err.message,
    });
  }
};

const addUser = async (req: any, res: any) => {
  try {
    const user = req.body,
      db = await getDb();

    db.users.push(user);
    await addDb(db);

    res.send(user);
  } catch (err: any) {
    res.status(500).send({
      error: err.message,
    });
  }
};

const editUser = async (req: any, res: any) => {
  try {
    const data = req.body,
      uid = req.query.id,
      db = await getDb();

    const user = db.users.find((user: User) => user.id === uid);
    if (!user || !uid) {
      return res.status(404).end();
    }
    Object.assign(user, data);
    await addDb(db);
    res.send(user);
  } catch (err: any) {
    res.status(500).send({
      error: err.message,
    });
  }
};

const delUser = async (req: any, res: any) => {
  const db = await getDb(),
    uid = req.query.id;

  const user = db.users.findIndex((user: User) => user.id === uid);
  if (user === -1) {
    console.log(uid, user);

    return res.status(404).end();
  }

  db.users.splice(user, 1);
  await addDb(db);
  res.status(204).end();
};

routers
  .route('/users')
  .get(getUsers)
  .post(addUser)
  .patch(editUser)
  .delete(delUser);

export { routers };
