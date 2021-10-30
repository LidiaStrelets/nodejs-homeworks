const { User } = require("./../../models/auth");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const sendEmail = require("./../../helpers/sendEmail");

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
  const verifyToken = nanoid();

  await User.create({ email, password: hash, avatarUrl, verifyToken });
  const createdUser = await User.findOne({ email });

  sendEmail({
    to: email,
    subject: "Registration confirm",
    html: `<a target="_blanc" href="http://localhost:3000/api/users/verify/${verifyToken}">Press to confirm ${email} email</a>`,
  });
  res.json({
    status: "Succeed",
    code: 200,
    data: createdUser,
  });
};

module.exports = signup;
