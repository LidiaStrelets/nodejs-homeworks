const { User } = require("./../../models/auth");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("User with this email already exists!");
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  const avatarUrl = gravatar.url(email);

  await User.create({ email, password: hash, avatarUrl });
  const createdUser = await User.findOne({ email });
  res.json({
    status: "Succeed",
    code: 200,
    data: createdUser,
  });
};

module.exports = signup;
