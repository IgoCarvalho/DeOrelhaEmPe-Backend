const multer = require('multer');
const path = require('path');
//const crypto = require('crypto');

module.exports = {
  dest: path.resolve(__dirname, "..", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename: function (req, file, cb) {
        let fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
  }),
  limits: {fileSize: 5 * 1024 * 1024},
  fileFilter: (req, file, cb) => {
    const allowedMines = ["image/jpeg",
                          "image/pjpeg",
                          "image/png",
                          "image/gif",
                          "image/mp4",
                          "image/3gp"]
    if (allowedMines.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
}
