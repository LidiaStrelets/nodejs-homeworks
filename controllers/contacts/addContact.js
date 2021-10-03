const { Contact } = require("./../../models");

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.json({
    status: "Succeed",
    code: 201,
    data: newContact,
  });
};

module.exports = addContact;
