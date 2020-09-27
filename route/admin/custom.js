const express = require("express");
const mysql = require("mysql");
const common = require("../../libs/common");
const fs = require("fs");
const pathLib = require("path");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "learn",
});

module.exports = function () {
  var router = express.Router();

  router.get("/", (req, res) => {
    switch (req.query.act) {
      case "del":
        db.query(
          `SELECT * FROM custom_evaluation_table WHERE ID='${req.query.id}'`,
          (err, data) => {
            if (err) {
              console.error(err);
              res.status(500).send("database error").end();
            } else {
              if (data.length == 0) {
                res.status(404).send("no this eavaluation").end();
              } else {
                console.log(data);
                fs.unlink(`static/upload/${data[0].src}`, (err, data) => {
                  if (err) {
                    console.error(err);
                    res.status(500).send("database error").end();
                  } else {
                    db.query(
                      `DELETE FROM custom_evaluation_table WHERE ID='${req.query.id}'`,
                      (err, data) => {
                        if (err) {
                          console.error(err);
                          res.status(500).send("database error").end();
                        } else {
                          res.redirect("/admin/custom");
                        }
                      }
                    );
                  }
                });
              }
            }
          }
        );
        break;

      case "mod":
        db.query(
          `SELECT * FROM custom_evaluation_table WHERE ID='${req.query.id}'`,
          (err, data) => {
            if (err) {
              console.error(err);
              res.status(500).send("database error").end();
            } else if (data.length == 0) {
              res.status(404).send("no this eavaluation").end();
            } else {
              db.query(
                "SELECT * FROM custom_evaluation_table",
                (err, evaluations) => {
                  if (err) {
                    console.error(err);
                    res.status(500).send("database error").end();
                  } else {
                    res.render("admin/custom.ejs", {
                      evaluations,
                      mod_data: data[0],
                    });
                  }
                }
              );
            }
          }
        );
        break;

      default:
        db.query(
          "SELECT * FROM custom_evaluation_table",
          (err, evaluations) => {
            if (err) {
              console.error(err);
              res.status(500).send("database error").end();
            } else {
              res.render("admin/custom.ejs", { evaluations });
            }
          }
        );
        break;
    }
  });

  router.post("/", (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    if (req.files[0]) {
      var ext = pathLib.parse(req.files[0].originalname).ext;
      var oldPath = req.files[0].path;
      var newPath = req.files[0].path + ext;
      var fileName = req.files[0].filename + ext;
    } else {
      var fileName = null;
    }

    if (fileName) {
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("operation file error").end();
        } else {
          if (req.body.mod_id) {
            db.query(
              `SELECT * FROM custom_evaluation_table WHERE ID='${req.body.mod_id}'`,
              (err, data) => {
                if (err) {
                  console.error(err);
                  res.status(500).send("databse error").end();
                } else {
                  if (data.length == 0) {
                    res.status(404).send("no this evaluation").end();
                  } else {
                    fs.unlink(`static/upload/${data[0].src}`, (err, data) => {
                      if (err) {
                        console.error(err);
                        res.status(500).send("file operation error").end();
                      } else {
                        db.query(
                          `UPDATE custom_evaluation_table SET title='${title}',description='${description}',src='${fileName}' WHERE ID='${req.body.mod_id}'`,
                          (err, data) => {
                            if (err) {
                              console.error(err);
                              res.status(500).send("database").end();
                            } else {
                              res.redirect("/admin/custom");
                            }
                          }
                        );
                      }
                    });
                  }
                }
              }
            );
          } else {
            db.query(
              `INSERT INTO custom_evaluation_table (title,description,src) VALUES('${title}','${description}','${fileName}')`,
              (err, data) => {
                if (err) {
                  console.error(err);
                  res.status(500).send("database error").end();
                } else {
                  res.redirect("/admin/custom");
                }
              }
            );
          }
        }
      });
    } else {
      db.query(
        `UPDATE custom_evaluation_table SET title='${title}',description='${description}' WHERE ID='${req.body.mod_id}'`,
        (err, data) => {
          if (err) {
            console.error(err);
            res.status(500).send("database error").end();
          } else {
            res.redirect("/admin/custom");
          }
        }
      );
    }
  });

  return router;
};
