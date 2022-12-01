const http = require('http');

const port = 1023;

http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // console.log(req);
    res.end('mie!\n'); //
  })
  .listen(port);

console.log(`Server running at http://localhost:${port}/mie`);

// 使用默认浏览器打开
require('child_process').exec(`start http://localhost:${port}/mie`);
