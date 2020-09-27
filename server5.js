const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pathLib = require("path");

var objMulter = multer({ dest: "./www/upload/" });

var server = express();

server.use(objMulter.any());

server.post("/", (req, res) => {
  console.log(req.files);
  var newName =
    req.files[0].path + pathLib.parse(req.files[0].originalname).ext;

  fs.rename(req.files[0].path, newName, function (err) {
    if (err) {
      res.send("上传失败");
    } else {
      res.send("上传成功");
    }
  });
});

server.listen(8080);
