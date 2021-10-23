const { NotFound } = require("http-errors");
const { Contact } = require("./../../models/contacts");

const getContact = async (req, res, next) => {
  const contactId = req.params.contactId;

  const requestedContact = await Contact.find({
    _id: contactId,
    owner: req.user,
  });
  if (requestedContact.length === 0) {
    throw new NotFound(`No contact with id ${req.params.contactId}`);
  }
  res.json({
    status: "Succeed",
    code: 200,
    data: requestedContact,
  });
};

module.exports = getContact;
