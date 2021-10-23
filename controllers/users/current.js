const { User } = require("./../../models/auth");
const { Unauthorized } = require("http-errors");

const current = async (req, res) => {
  const currentUser = await User.findById(req.user);

  if (!currentUser) {
    throw new Unauthorized("No user found");
  }

  res.json({
    status: "Succeed",
    code: 200,
    data: currentUser,
  });
};

module.exports = current;
