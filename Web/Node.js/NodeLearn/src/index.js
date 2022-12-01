// import fs from 'fs';
// import path from 'path';
// import { dirname, filename } from './utils/mie';

// const __dirname = dirname(import.meta.url);

//   __filename = filename(import.meta.url),
//   root = path.resolve();

// fs.readFile('static/data.json', (err, data) => {
//   if (err) console.error(err);
//   console.log(data.toString());
// });

// // const data = fs.readFileSync('static/data.json').toString();

// // console.log(data);

// // const dir = fs.readdirSync('./');
// // console.log(dir);

// import { getFollowings } from './utils/getBiliFollowings';

// try {
//   getFollowings();
// } catch (error) {
//   console.error(error);
// }

import { blockImg } from './utils/BolckedImgs';

const url = 'https://weibo.com/7392890982/MgJfY6zNk';

blockImg(url);
