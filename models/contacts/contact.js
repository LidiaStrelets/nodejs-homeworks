const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactShema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: String,
    },
  },

  { versionKey: false, timestamps: true }
);
const Contact = model("contact", contactShema);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
  owner: Joi.string(),
});
const patchSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
  owner: Joi.string(),
});
const patchFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  Contact,
  addSchema,
  patchSchema,
  patchFavoriteSchema,
};
