const crypto = require("crypto");

module.exports = {
  MD5_SUFFIX: "asdasdsadggdsfgmnbcdasd232131dsadsd大萨达D23123",
  md5: function (str) {
    var obj = crypto.createHash("md5");

    obj.update(str);

    return obj.digest("hex");
  },
};