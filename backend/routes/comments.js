const express = require("express");
const router = express.Router();
const authenticator = require("../middlewares/auth");
const createError = require("http-errors");
const Post = require("../schemas/Post");
const Comment = require("../schemas/Comment");

/* POST create comment
    text - string
*/
router.post("/:postID", authenticator, async function (req, res, next) {
  const post = await Post.findOne({ _id: req.params.postID }, "_id comments");
  try {
    const { text } = req.body;
    if (!post) {
      next(createError("Post not found"));
    } else {
      const postedDate = new Date().toLocaleString();
      const comment = new Comment({
        text,
        postedDate,
        authorID: res.locals.user._id,
        authorUsername: res.locals.user.username,
      });
      const response = await comment.save();
      await post.updateOne({
        $push: { comments: { commentID: response._id } },
      });
      return res.status(201).send({ comment: response });
    }
  } catch (err) {
    createError(next(err));
  }
});

module.exports = router;
