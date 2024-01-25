const bcrypt = require("bcrypt");
// const { saltRounds } = require("./config");

const createHash = async (plainPassword) => {
  let saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  console.log("Password type ========" + typeof hashedPassword);
  console.log("salt", salt);
  return hashedPassword;
};

const validatePassword = async (plainPassword, hashPassword) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};



module.exports = {
  createHash,
  validatePassword,
};
