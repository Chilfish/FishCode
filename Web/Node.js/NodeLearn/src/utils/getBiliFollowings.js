import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { timestampToTime } from './mie';

const outPath = path.resolve(path.resolve(), './static/followings.json');

/**
 * 获取用户开放的关注列表，仅前250位
 * @param {string} uid 用户 uid
 * @param {string} Path 输出路径，默认在 ./static 下
 */
export async function getFollowings(uid = '259486090', Path = outPath) {
  console.log('getting');
  const ansJson = {
      uid,
      followings: [],
    },
    url = 'https://api.bilibili.com/x/relation/followings?vmid=' + uid,
    upUrl = 'https://space.bilibili.com/';

  for (let i = 1; i <= 5; ++i) {
    await axios
      .get(url + `&pn=${i}`)
      .then((res) => {
        if (res.data.code !== 0) {
          throw res.data.message;
        }
        const data = res.data.data.list;

        data.forEach((ele) => {
          const up = {
            name: ele.uname,
            url: upUrl + ele.mid,
            sign: ele.sign,
            time: timestampToTime(ele.mtime),
          };
          ansJson.followings.push(up);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  fs.writeFile(Path, JSON.stringify(ansJson), (err) => {
    if (err) throw err;
  });
}
