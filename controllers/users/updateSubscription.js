const { User } = require("./../../models/auth");
const { BadRequest } = require("http-errors");

const updateSubscription = async (req, res) => {
  if (!req.body) {
    throw new BadRequest("Updates required!");
  }
  if (
    !["starter", "pro", "business"].find(
      (item) => item === req.body.subscription
    )
  ) {
    throw new BadRequest("Not allowed for subscription!");
  }
  await User.findByIdAndUpdate(req.user, req.body);
  const update = await User.findById(req.user);
  res.json({
    status: "Succeed",
    code: 200,
    data: update,
  });
};

module.exports = updateSubscription;
