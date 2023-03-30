const util = require("util");
const multer = require("multer");

let key;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    key = req;
    cb(null, __dirname + "/../assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;