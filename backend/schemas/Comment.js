const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: { type: String, maxLength: 200, required: true },
  postedDate: { type: String, default: Date.toLocaleString, required: true },
  authorID: { type: String, required: true },
  authorUsername: { type: String, required: true },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
