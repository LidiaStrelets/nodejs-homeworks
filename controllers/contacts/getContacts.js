const { Contact } = require("./../../models/contacts");

const getContacts = async (req, res, next) => {
  if (req.query.favorite) {
    const favoriteContacts = await Contact.find({
      owner: req.user,
      favorite: true,
    });
    res.json({
      status: "Succeed",
      code: 200,
      data: favoriteContacts,
    });
  }

  const allContacts = await Contact.find({ owner: req.user });
  res.json({
    status: "Succeed",
    code: 200,
    data: allContacts,
  });
};

module.exports = getContacts;
