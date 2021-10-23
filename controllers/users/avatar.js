const { User } = require("./../../models/auth");
const { Unauthorized, InternalServerError } = require("http-errors");
const fs = require("fs/promises");
const path = require("path");

const avatar = async (req, res) => {
  const currentUser = await User.findById(req.user);
  if (!currentUser) {
    throw new Unauthorized("No user found");
  }

  const { path: tempDir, originalname } = req.file;
  const [extension] = originalname.split(".").reverse();

  const fileName = `${req.user}-${Date.now()}.${extension}`;
  const uploadDir = path.join(__dirname, "../../", "public/avatars", fileName);
  const image = path.join("avatars", fileName);

  try {
    await fs.rename(tempDir, uploadDir);

    await User.findByIdAndUpdate(req.user, { avatarUrl: image });
    const update = await User.findById(req.user);
    res.json({
      status: "Succeed",
      code: 200,
      data: update,
    });
  } catch (error) {
    await fs.unlink(tempDir);
    throw new InternalServerError(
      "Error while changing avatar, please try again"
    );
  }
};

module.exports = avatar;
