const multer = require("multer");

const MAX_IMAGE_SIZE = 8388608;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + Math.round(Math.random() * 500);
    const extension = file.originalname.split(".")[1];
    req.storedName = name + "." + extension;
    cb(null, req.storedName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_IMAGE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      cb(new Error("Only images are supported"), false);
    } else {
      cb(null, true);
    }
  },
});

module.exports = upload;
