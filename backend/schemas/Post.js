const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  authorID: {
    type: String,
    required: true,
  },
  authorUsername: {
    type: String,
    required: true,
  },
  imgData: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    maxLength: 200,
    default: "",
  },
  postedDate: {
    type: String,
    default: Date.toLocaleString,
    required: true,
  },
  likes: [
    {
      userID: { type: String },
    },
  ],
  comments: [
    {
      commentID: {
        type: String,
        required: true,
      },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
