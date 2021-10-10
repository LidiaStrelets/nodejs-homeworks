const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const auth = (req, res, next) => {
  const token = req.headers.authorization.slice(7);

  if (!req.headers.authorization) {
    throw new Unauthorized("Token required!");
  }

  try {
    const user = jwt.decode(token, SECRET_KEY);
    if (!user) {
      throw new Unauthorized("Not valid token");
    }
    req.user = user._id;
    req.token = token;
    next();
  } catch (error) {
    throw new Unauthorized("Not valid token!");
  }
};

module.exports = auth;
