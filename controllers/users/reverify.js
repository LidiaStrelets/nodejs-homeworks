const { User } = require("./../../models/auth");
const { BadRequest } = require("http-errors");
const sendEmail = require("./../../helpers/sendEmail");

const reverify = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  if (!email) {
    throw BadRequest("missing required field email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw BadRequest("No user with such email");
  }
  if (user.verify) {
    throw BadRequest("Already verified");
  }

  sendEmail({
    to: email,
    subject: "Registration confirm",
    html: `<a target="_blanc" href="http://localhost:3000/api/users/verify/${user.verifyToken}">Press to confirm ${email} email</a>`,
  });

  res.json({ status: "Succeed", code: 200 });
};

module.exports = reverify;
