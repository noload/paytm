const mongoose = require("mongoose");
const { DB_URL } = require("./config");

mongoose.connect(DB_URL);

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    require: true,
    minLength: 8,
  },
  firstName: {
    type: String,
    require: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
    maxLength: 50,
  },
});

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  balance: Number,
});

const User = mongoose.model("users", UserSchema);
const Account = mongoose.model("accounts", accountSchema);
module.exports = {
  User,
  Account,
};
