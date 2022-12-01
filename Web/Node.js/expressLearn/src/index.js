import express from 'express';

const app = express(); // 以下默认已经创建了 app

app // 当浏览器发送了 GET /mie 请求(req)时
  .get('/mie', (req, res) => {
    res.send('data');
  })
  .post('/mie', (req, res) => {
    res.send('data'); // 服务器就发送响应(res)数据
  })
  .listen('2333', () => {
    console.log('open on http://localhost:2333/mie');
  });
