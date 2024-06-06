const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
