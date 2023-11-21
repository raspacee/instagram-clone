const mongoose = require("mongoose");
const createError = require("http-errors");
const { Schema } = mongoose;

function toLower(str) {
  return str.toLowerCase();
}

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    maxLength: 20,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: 20,
  },
  bio: {
    type: String,
    default: "",
    maxLength: 500,
  },
  profilePicture: {
    type: String,
    default: "default.jpg",
  },
  following: [
    {
      userID: { type: String },
    },
  ],
  followers: [
    {
      userID: { type: String },
    },
  ],
  likes: [
    {
      postID: { type: String },
    },
  ],
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  joinedDate: {
    type: String,
    default: Date.toLocaleString,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    set: toLower,
  },
  posts: [
    {
      postID: { type: String },
    },
  ],
});

userSchema.pre("save", async function (next) {
  let user = this;
  const e = await User.exists({ email: user.email });
  if (e) {
    next(createError(400, (msg = "Email is already used")));
  }
  const u = await User.exists({ username: user.username });
  if (u) {
    next(createError(400, (msg = "Username is already used")));
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
