const { NotFound } = require("http-errors");
const { Contact } = require("./../../models");

const removeContact = async (req, res, next) => {
  await Contact.findByIdAndDelete(req.params.contactId);
    if (!requestedContact) {
      throw new NotFound(`No contact with id ${req.params.contactId}`);
    }
    res.json({
      status: "Succeed",
      code: 200,
    });
};

module.exports = removeContact;
