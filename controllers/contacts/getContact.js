const { NotFound } = require("http-errors");
const { Contact } = require("./../../models");

const getContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  
  const requestedContact = await Contact.findById(contactId);
  console.log("req cont: ", requestedContact);
  if (!requestedContact) {
    throw new NotFound(`No contact with id ${req.params.contactId}`);
  }
  res.json({
    status: "Succeed",
    code: 200,
    data: requestedContact,
  });
};

module.exports = getContact;
