const a = require("./libs/common");

var str = "123456";

var str = a.md5(str + a.MD5_SUFFIX);

console.log(str)
