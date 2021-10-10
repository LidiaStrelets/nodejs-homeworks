const { BadRequest } = require("http-errors");
const { Contact } = require("./../../models");

const updateContactFavorite = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw new BadRequest("Updates required!");
  }

  const update = await Contact.findByIdAndUpdate(req.params.contactId, {
    $set: req.body,
  });
  if (!update) {
    throw new NotFound(`No contact with id ${req.params.contactId}`);
  }
  const result = await Contact.findById(req.params.contactId);
  res.json({
    status: "Succeed",
    code: 200,
    data: result,
  });
};

module.exports = updateContactFavorite;
