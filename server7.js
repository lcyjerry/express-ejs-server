const express = require("express");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const consolidate = require("consolidate");
const bodyParser = require("body-parser");
const static = require("express-static");
const ejs = require("ejs");
const multer = require("multer");
const multerObj = multer({ dest: "./static/upload" });

const server = express();

server.use(bodyParser.urlencoded());
server.use(multerObj.any());

server.use(cookieParser());
(function () {
  var keys = [];
  for (var i = 0; i < 100000; i++) {
    keys[i] = "a_" + Math.random();
  }

  server.use(
    cookieSession({
      name: "sess_id",
      keys: keys,
      maxAge: 20 * 60 * 1000,
    })
  );
})();

server.engine("html", consolidate.ejs);
server.set("views", "template");
server.set("view engine", "html");

server.use("/", require("./route/web")());
server.use("/admin", require("./route/admin/index")());

server.use(static("./static"));

server.listen(8080);
