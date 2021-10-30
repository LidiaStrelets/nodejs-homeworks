const { User } = require("./../../models/auth");
const { NotFound } = require("http-errors");

const verifyToken = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({
    verifyToken: verificationToken,
  });

  if (!user) {
    throw NotFound("No user found");
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });
  res.json({ status: "Succeed", code: 200 });
};

module.exports = verifyToken;
