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

// router.use(auth);

router.get("/current", auth, controllerWrapper(usersControllers.current));

router.get(
  "/verify/:verificationToken",
  controllerWrapper(usersControllers.verifyToken)
);

router.post("/verify", controllerWrapper(usersControllers.reverify));

router.patch(
  "/",
  auth,
  validation(subscriptionSchema),
  controllerWrapper(usersControllers.updateSubscription)
);

router.patch(
  "/avatar",
  auth,
  upload.single("avatar"),
  controllerWrapper(usersControllers.avatar)
);

module.exports = router;
