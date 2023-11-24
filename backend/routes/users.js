const express = require("express");
const router = express.Router();
const User = require("../schemas/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticator = require("../middlewares/auth.js");
const createError = require("http-errors");

/* GET search user 
  /search?username=[username_here]
*/
router.get("/search", async function (req, res) {
  const username = req.query.username;
  const users = await User.find(
    { username: { $regex: username, $options: "i" } },
    "username email"
  );
  if (users.length == 0) {
    return res
      .status(200)
      .send({ message: "No one found with that username " });
  } else {
    return res.status(200).send({ results: users });
  }
});

/* GET view profile user 
  /profile/:username
*/
router.get("/profile/:username", async function (req, res) {
  const username = req.params.username;
  console.log(username);
  const user = await User.findOne(
    { username: username },
    "_id username email bio followers following posts"
  );
  if (!user) {
    return res
      .status(200)
      .send({ message: "No one found with that username " });
  } else {
    return res.status(200).send({ user: user });
  }
});

/* POST follow user */
router.post("/follow/:userID", authenticator, async function (req, res, next) {
  try {
    const target = await User.findOne({ _id: req.params.userID });
    if (!target) {
      return res.status(200).send({ message: "User not found" });
    } else {
      // Checking if the user is already followed
      if (
        target.followers.filter((f) => f.userID == res.locals.user._id)
          .length == 1
      ) {
        return res.status(200).send({ message: "User already followed" });
      } else if (req.params.userID == res.locals.user._id) {
        next(createError("You cannot follow yourself"));
      } else {
        const doc1 = await User.findByIdAndUpdate(res.locals.user._id, {
          $push: { following: { userID: target._id } },
        });
        const doc2 = await User.findByIdAndUpdate(target._id, {
          $push: { followers: { userID: res.locals.user._id } },
        });
        return res.status(200).send({ message: "Successfully followed" });
      }
    }
  } catch (err) {
    next(createError(err));
  }
});

/* POST unfollow user */
router.post(
  "/unfollow/:userID",
  authenticator,
  async function (req, res, next) {
    const target = await User.findOne({ _id: req.params.userID });
    if (!target) {
      return res.status(200).send({ message: "User not found" });
    } else {
      // Checking if the user is not followed
      if (
        target.followers.filter((f) => f.userID == res.locals.user._id)
          .length == 0
      ) {
        return res.status(200).send({ message: "User is not followed" });
      } else if (req.params.userID == res.locals.user._id) {
        return res
          .status(200)
          .send({ message: "You cannot unfollow yourself " });
      } else {
        try {
          const doc1 = await User.findByIdAndUpdate(res.locals.user._id, {
            $pull: { following: { userID: target._id } },
          });
          const doc2 = await User.findByIdAndUpdate(target._id, {
            $pull: { followers: { userID: res.locals.user._id } },
          });
          return res.status(200).send({ message: "Successfully unfollowed" });
        } catch (err) {
          next(createError(err));
        }
      }
    }
  }
);

/* POST user signup */
router.post("/signup", function (req, res, next) {
  let { username, name, email, password } = req.body;
  username = username.trim();
  name = name.trim();
  password = password.trim();
  email = email.trim();

  if (password.length <= 7) {
    return res
      .status(400)
      .send({ error: "Password should be atleast 8 characters long" });
  }

  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegexp.test(email)) {
    return res.status(400).send({ error: "Invalid email provided" });
  }

  if (username != "" && name != "" && password != "") {
    // Check if a user with the same email or username is already available
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        return res.status(400).send({
          error: "Something wrong occured while hashing your password",
        });
      }
      try {
        const joinedDate = new Date().toLocaleString();
        const user = new User({
          username,
          name,
          email,
          password: hash,
          joinedDate: joinedDate,
        });
        await user.save();
        return res
          .status(201)
          .send({ message: "User successfully created. You can login now." });
      } catch (err) {
        return res.status(400).send({ error: err });
      }
    });
  } else {
    return res
      .status(400)
      .send({ error: "username, name or password is missing" });
  }
});

/* POST user login */
router.post("/login", function (req, res, next) {
  const { email, password } = req.body;
  if (email == "" || password == "") {
    return res.status(400).send({ error: "Missing fields email or password" });
  }
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).send({ error: "Email or password incorrect" });
    }
    bcrypt.compare(password, user.password, function (err, matched) {
      if (err) {
        return res
          .status(500)
          .send({ error: "Something occured while checking passwords" });
      }
      if (matched) {
        const token = jwt.sign(
          { username: user.username, email: user.email, _id: user._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "7w",
          }
        );
        return res
          .status(200)
          .send({ accessToken: token, _id: user._id, username: user.username });
      } else {
        return res
          .status(401)
          .send({ error: "Email or password may be wrong" });
      }
    });
  });
});

module.exports = router;
