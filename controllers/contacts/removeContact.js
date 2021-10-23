const { NotFound } = require("http-errors");
const { Contact } = require("./../../models/contacts");

const removeContact = async (req, res, next) => {
  const contactToDelete = await Contact.find({
    owner: req.user,
    _id: req.params.contactId,
  });

  if (contactToDelete.length === 0) {
    throw new NotFound(`No contact with id ${req.params.contactId}`);
  }
  await Contact.findByIdAndDelete(req.params.contactId);
  // if (!requestedContact) {
  //   throw new NotFound(`No contact with id ${req.params.contactId}`);
  // }
  res.json({
    status: "Succeed",
    code: 200,
  });
};

module.exports = removeContact;
