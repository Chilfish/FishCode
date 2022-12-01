import axios from 'axios';
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { resolve } from 'path';

const rootDir = resolve();

async function getImg(postUrl) {
  const baseURL = 'https://weibo.com/ajax/statuses/show?id=',
    url = baseURL + postUrl.match(/(?<=\d+\/)\w+/gm)[0],
    ansUrl = [];

  await axios.get(url).then((res) => {
    const imgs = res.data.pic_infos;
    for (const value of Object.values(imgs)) {
      ansUrl.push(
        value.large.url.replace(/wx(\d)/gm, `ww$1`).replace(/orj960/gm, `large`)
      );
    }
  });
  return new Promise((resolve, rejects) => {
    if (ansUrl.length) resolve(ansUrl);
    else rejects();
  });
}

async function downloadImg(url, filePath, fileName) {
  filePath = resolve(rootDir, filePath);
  if (!existsSync(filePath)) {
    mkdirSync(filePath);
  }
  const writer = createWriteStream(resolve(filePath, fileName));

  await axios({
    url,
    methods: 'get',
    responseType: 'stream',
  }).then((res) => {
    res.data.pipe(writer);
  });
}

export const blockImg = (url) => {
  getImg(url)
    .then((res) => {
      res.forEach((ele, index) => {
        downloadImg(ele, './static/blockImg/', `${index}.jpg`);
      });
    })
    .catch((err) => {
      throw err;
    });
};
