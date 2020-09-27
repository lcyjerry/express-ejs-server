const mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "20200924",
});

db.query(
  "SELECT SUM(price) ,name ,place FROM `user_table` GROUP BY place ORDER BY price",
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }
);
