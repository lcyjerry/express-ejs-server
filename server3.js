const jade = require("jade");
const fs = require("fs");

var str = jade.renderFile("./views/1.jade", { pretty: true });

fs.writeFile("./build/jade.html", str, (err) => {
  if (err) {
    console.log("写入失败");
  } else {
    console.log("写入成功");
  }
});
