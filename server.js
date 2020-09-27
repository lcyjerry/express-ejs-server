const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");

var users = {};

var server = http.createServer(function (req, res) {
  var str = "";
  req.on("data", (data) => {
    str += data;
  });

  req.on("end", () => {
    var obj = url.parse(req.url, true);

    const path = obj.pathname;
    const GET = obj.query;
    const post = querystring.parse(str);

    if (path == "/user") {
      switch (GET.act) {
        case "reg":
          if (users[GET.user]) {
            res.write('{"ok":false,"msg" : "此用户已经存在"}');
          } else {
            users[GET.user] = GET.pass;
            res.write('{"ok":true,"msg" : "注册成功"}');
          }
          break;
        case "login":
          if (users[GET.user] === null) {
            res.write('{"ok":false,"msg" : "此用户不存在"}');
          } else if (users[GET.user] !== GET.pass) {
            res.write('{"ok":false,"msg" : "用户名或密码有误"}');
          } else {
            res.write('{"ok":true,"msg" : "登陆成功"}');
          }
          break;
        default:
          res.write('{"ok":false,"msg" : "未知的act"}');
      }
      console.log(users);
      res.end();
    } else {
      var file_name = "./www" + path;
      fs.readFile(file_name, (err, data) => {
        if (err) {
          res.write("404");
        } else {
          res.write(data);
        }
        res.end();
      });
    }
  });
});

server.listen(8088);
