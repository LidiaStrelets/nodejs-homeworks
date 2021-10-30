const express = require("express");
const router = express.Router();

const {
  controllerWrapper,
  auth,
  validation,
  upload,
} = require("./../../middlewares");
const usersControllers = require("../../controllers/users/");
const { subscriptionSchema } = require("./../../models/auth");

router.use(auth);

router.get("/current", controllerWrapper(usersControllers.current));

router.patch(
  "/",
  validation(subscriptionSchema),
  controllerWrapper(usersControllers.updateSubscription)
);

router.patch(
  "/avatar",
  upload.single("avatar"),
  controllerWrapper(usersControllers.avatar)
);

module.exports = router;
