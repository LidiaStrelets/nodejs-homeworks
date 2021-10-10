const { Contact } = require("./../../models");

const getContacts = async (req, res, next) => {
  const allContacts = await Contact.find({});
  res.json({
    status: "Succeed",
    code: 200,
    data: allContacts,
  });
};

module.exports = getContacts;
