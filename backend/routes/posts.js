const express = require("express");
const router = express.Router();
const upload = require("../multer");
const Post = require("../schemas/Post");
const User = require("../schemas/User");
const createError = require("http-errors");
const fs = require("fs");
const authenticator = require("../middlewares/auth.js");

const deleteFile = (filepath) => {
  fs.unlink(filepath, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File successfully deleted");
    }
  });
};

/* POST create post */
router.post(
  "/",
  authenticator,
  upload.single("img"),
  async function (req, res, next) {
    let { text } = req.body;
    if (text) {
      text = text.trim();
    } else {
      text = "";
    }

    try {
      let b64 = fs.readFileSync(req.file.path, "base64");
      b64 = `data:image/${req.file.originalname.split(".")[1]};base64,` + b64;
      const user = await User.findOne(
        { _id: res.locals.user._id },
        "_id posts"
      );
      if (!user) {
        throw new Error("Invalid JWT, logout and login again");
      }
      const post = new Post({
        authorID: user._id,
        imgData: b64,
        text,
        postedDate: new Date().toLocaleString(),
      });
      const result = await post.save();
      await user.updateOne({
        $push: {
          posts: { postID: result._id },
        },
      });
      return res.status(201).send({ message: "Post created" });
    } catch (err) {
      next(createError(err));
    } finally {
      deleteFile(req.file.path);
    }
  }
);

/* GET all posts of a user */
router.get("/by/:userID", authenticator, async function (req, res, next) {
  try {
    const user = await User.findOne({ _id: req.params.userID });
    if (!user) {
      throw new Error("User not found");
    }
    let posts = [];
    for (let i = 0; i < user.posts.length; i++) {
      const p = await Post.findOne({ _id: user.posts[i].postID });
      posts.push(p);
    }
    return res.status(200).send({ posts });
  } catch (err) {
    next(createError(err));
  }
  return res.status(200);
});

module.exports = router;
