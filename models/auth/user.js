const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userShema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarUrl: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
const User = model("user", userShema);

const joiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

module.exports = {
  User,
  joiSchema,
  subscriptionSchema,
};
