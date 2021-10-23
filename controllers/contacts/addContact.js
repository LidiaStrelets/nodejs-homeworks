const { Contact } = require("./../../models/contacts");

const addContact = async (req, res) => {
  const newContact = await Contact.create({ ...req.body, owner: req.user });
  res.json({
    status: "Succeed",
    code: 201,
    data: newContact,
  });
};

module.exports = addContact;
