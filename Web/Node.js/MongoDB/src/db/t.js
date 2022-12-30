import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

const dbName = 'test';

async function main() {
  const db = client.db(dbName);
  const cole = db.collection('post');

  const data = [
    {
      name: 'fish',
      data: 233,
      res: [1, 2, 3, 1, 2, 3],
    },
    {
      name: 'asd',
      data: 123,
    },
    {
      name: 'ewr',
      data: 244,
    },
  ];

  // await cole.insertMany(data);

  const filter = { name: 'fish' };
  const updateDoc = {
    $set: {
      data: 12324,
    },
  };

  // 整体替换而不是更新
  // await cole.replaceOne(filter, { data: 123 });

  // 返回的是更改后的结果
  // await cole.findOneAndUpdate(filter, updateDoc).then((res, err) => {
  //   console.log(res);
  // });

  // 返回的是更改后影响的情况
  // await cole.updateOne(filter, updateDoc).then((res, err) => {
  //   console.log(res);
  // });

  // await cole.deleteMany({})

  const findResult = await cole.find().toArray();

  console.log(findResult);
}

main()
  .catch(console.error)
  .finally(() => client.close());
