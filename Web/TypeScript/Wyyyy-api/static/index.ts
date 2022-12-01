import http from "http";
import fs from "fs";

const ip = "localhost",
  port = 1026;

http
  .createServer(function (req, res) {
    if (req.url?.match(/api\/getUser\??.*/gm)) {
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      });

      fs.readFile("./static/fishData.json", (err, data) => {
        try {
          res.end(data);
        } catch {
          console.log(err);
        }
      });
    } else {
      res.writeHead(404);
      res.end(`<h1 align="center">404 NotFound</h1><hr/>`);
    }
  })
  .listen(port);

console.log(`Server running at http://${ip}:${port}/api/getUser/`);

 
