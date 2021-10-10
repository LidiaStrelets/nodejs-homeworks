const express = require("express");
const router = express.Router();

const { controllerWrapper, auth, validation } = require("./../../middlewares");
const usersControllers = require("../../controllers/users/");
const { subscriptionSchema } = require("./../../models/auth");

router.use(auth);

router.get("/current", controllerWrapper(usersControllers.current));

router.patch(
  "/",
  validation(subscriptionSchema),
  controllerWrapper(usersControllers.updateSubscription)
);

module.exports = router;
