const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  saltRounds: process.env.saltRounds,
  DB_URL: process.env.DB_URL,
};
