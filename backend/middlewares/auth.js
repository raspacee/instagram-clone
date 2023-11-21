const createError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.get("Authorization");
  if (!header) {
    next(createError("Authorization header missing"));
  } else {
    const token = header.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.user = decoded;
      next();
    } catch (err) {
      next(createError("Invalid bearer token"));
    }
  }
};
