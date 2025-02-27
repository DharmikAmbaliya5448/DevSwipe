const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Your Name is Not Valid.");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is Not Valid...");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a stronng password");
  }
};

module.exports = {
  validateSignUpData,
};
