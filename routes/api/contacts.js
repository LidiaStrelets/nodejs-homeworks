const express = require("express");
const router = express.Router();
const { controllerWrapper, validation } = require("./../../middlewares");
const contactsControllers = require("../../controllers/contacts/");
const {
  addSchema,
  patchSchema,
  patchFavoriteSchema,
} = require("./../../models");

router.get("/", controllerWrapper(contactsControllers.getContacts));

router.get("/:contactId", controllerWrapper(contactsControllers.getContact));

router.post(
  "/",
  validation(addSchema),
  controllerWrapper(contactsControllers.addContact)
);

router.delete(
  "/:contactId",
  controllerWrapper(contactsControllers.removeContact)
);

router.patch(
  "/:contactId",
  validation(patchSchema),
  controllerWrapper(contactsControllers.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(patchFavoriteSchema),
  controllerWrapper(contactsControllers.updateContactFavorite)
);

module.exports = router;
