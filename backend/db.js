const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://notesafe:vaibhav%40123K@cluster0.fsxrugd.mongodb.net/paytm`
);

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

const User = mongoose.model("users", UserSchema);

module.exports = {
  User,
};
