const express = require("express");
const router = express.Router();

const { controllerWrapper, validation } = require("./../../middlewares");
const authControllers = require("../../controllers/auth/");
const { joiSchema } = require("./../../models/auth");

router.post(
  "/signup",
  validation(joiSchema),
  controllerWrapper(authControllers.signup)
);

router.post(
  "/signin",
  validation(joiSchema),
  controllerWrapper(authControllers.signin)
);

router.get("/signout", controllerWrapper(authControllers.signout));

module.exports = router;
