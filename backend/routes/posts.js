const express = require("express");
const router = express.Router();
const upload = require("../multer");
const Post = require("../schemas/Post");
const User = require("../schemas/User");
const Comment = require("../schemas/Comment");
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

/* GET all info of a post */
router.get("/:postID", authenticator, async function (req, res, next) {
  try {
    const post = await Post.findOne({ _id: req.params.postID });
    let comments = [];
    for (let i = 0; i < post.comments.length; i++) {
      const c = await Comment.findOne({ _id: post.comments[i].commentID });
      comments.push(c);
    }
    return res.status(200).send({ post, comments });
  } catch (err) {
    next(createError(err));
  }
});

/* GET home page posts */
router.get("/", authenticator, async function (req, res, next) {
  const user = await User.findOne({ _id: res.locals.user._id }, "following");
  let posts = [];
  let targets = new Set();
  if (user.following.length == 0) {
    return res.status(204).send({ message: "Follow some people to see posts" });
  } else if (user.following.length < 3) {
    const t =
      user.following[Math.floor(Math.random() * user.following.length)].userID;
    targets.add(t);
  } else {
    while (targets.size < 3) {
      const t =
        user.following[Math.floor(Math.random() * user.following.length)]
          .userID;
      targets.add(t);
    }
  }
  targets.forEach(async (userID) => {
    const t = await User.findOne({ _id: userID }, "posts");
    for (let i = 0; i < t.posts.length; i++) {
      const p = await Post.findOne(
        { _id: t.posts[i].postID },
        "_id imgData authorUsername text likes"
      );
      posts.push(p);
    }
    // Shuffle the posts array
    posts.sort(() => Math.random() - 0.5);
    return res.status(200).send({ posts });
  });
});

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
        "_id username posts"
      );
      if (!user) {
        throw new Error("Invalid JWT, logout and login again");
      }
      const post = new Post({
        authorID: user._id,
        authorUsername: user.username,
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

/* POST like a post */
router.post("/like/:postID", authenticator, async function (req, res, next) {
  try {
    const target = await Post.findOne({ _id: req.params.postID }, "_id likes");
    if (!target) {
      return res.status(200).send({ message: "Post not found" });
    } else {
      // Checking if the post is already liked
      if (
        target.likes.filter((f) => f.userID == res.locals.user._id).length == 1
      ) {
        return res.status(200).send({ message: "Post already liked" });
      } else {
        const user = await User.findByIdAndUpdate(res.locals.user._id, {
          $push: { likes: { postID: target._id } },
        });
        const post = await Post.findByIdAndUpdate(req.params.postID, {
          $push: { likes: { userID: res.locals.user._id } },
        });
        return res.status(200).send({ message: "Successfully liked" });
      }
    }
  } catch (err) {
    next(createError(err));
  }
});

/* POST unlike a post */
router.post("/unlike/:postID", authenticator, async function (req, res, next) {
  try {
    const target = await Post.findOne({ _id: req.params.postID }, "likes _id");
    if (!target) {
      return res.status(200).send({ message: "Post not found" });
    } else {
      // Checking if the post is not liked
      if (
        target.likes.filter((f) => f.userID == res.locals.user._id).length == 0
      ) {
        return res.status(200).send({ message: "Post is not liked" });
      } else {
        const user = await User.findByIdAndUpdate(res.locals.user._id, {
          $pull: { likes: { postID: target._id } },
        });
        const post = await Post.findByIdAndUpdate(req.params.postID, {
          $pull: { likes: { userID: res.locals.user._id } },
        });
        return res.status(200).send({ message: "Successfully unliked" });
      }
    }
  } catch (err) {
    next(createError(err));
  }
});

module.exports = router;
