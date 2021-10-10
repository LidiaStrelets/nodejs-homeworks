const { User } = require("./../../models/auth");
const bcrypt = require("bcrypt");
const { Unauthorized, NotFound } = require("http-errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const signin = async (req, res) => {
  const { email, password } = req.body;
  const currentUser = await User.findOne({ email });

  if (!currentUser) {
    throw new NotFound("No user with such email");
  }
  if (!bcrypt.compareSync(password, currentUser.password)) {
    throw new Unauthorized("Wrong password");
  }

  const token = jwt.sign(
    {
      _id: currentUser._id,
      createdAt: currentUser.createdAt,
    },
    SECRET_KEY
  );

  res.json({
    status: "Succeed",
    code: 200,
    data: currentUser,
    token: token,
  });
};

module.exports = signin;
