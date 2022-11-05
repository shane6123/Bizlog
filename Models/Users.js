const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = mongoose.Schema({
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    }
  });
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
  const Users = new mongoose.model("users", userSchema);
  module.exports = Users;