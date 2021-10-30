const sendGrid = require("@sendgrid/mail");
require("dotenv").config();

const { SEND_GRID } = process.env;
sendGrid.setApiKey(SEND_GRID);

const data = {
  to: "0630610171li@gmail.com ",
  subject: "test mail",
  text: "some text ttt",
  html: `<p>this is a test</p>`,
};

const sendEmail = async (data) => {
  const mail = { ...data, from: "LidiiaStrelets@gmail.com" };
  try {
    sendGrid.send(mail);
    console.log("succeed");
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
