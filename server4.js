const express = require("express");

const server = express();

const routerUser = express.Router();

routerUser.get("/1.html", (req, res) => {
  res.send("1.html");
});

routerUser.get("/2.html", (req, res) => {
  res.send("2.html");
});

server.use("/user", routerUser);

server.listen(3242);
