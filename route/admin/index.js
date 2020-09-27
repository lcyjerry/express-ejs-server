const express = require("express");

module.exports = function () {
  var router = express.Router();

  router.use((req, res, next) => {
    if (!req.session["admin_id"] && req.url != "/login") {
      res.redirect("/admin/login");
    } else {
      next();
    }
  });

  router.use("/login", require("./login")());

  router.get("/", (req, res) => {
    res.render("admin/index.ejs", {});
  });

  router.use("/banners", require("./banners")());
  router.use("/custom", require("./custom")());

  return router;
};
