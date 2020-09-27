const express = require("express");
const cookieParser = require("cookie-parser");

var server = express();

server.use(cookieParser("ad9f154af37"));

server.use("/", (req, res) => {
  res.secret = "ad9f154af37";
  res.cookie("user", "lcy", { signed: true });
  res.send("8080 is listening");
  console.log("已签名cookie:", req.signedCookies);
  console.log("未签名cookie:", req.cookies);
  res.end();
});

server.listen(8080, () => {
  console.log("8080 is listening");
});
