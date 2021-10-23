const { Contact } = require("./../../models/contacts");

const getContacts = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

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

  const allContacts = await Contact.find({ owner: req.user }, "", {
    skip: (page - 1) * limit,
    limit,
  });
  res.json({
    status: "Succeed",
    code: 200,
    data: allContacts,
  });
};

module.exports = getContacts;
