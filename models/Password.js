const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    variable: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });
  

module.exports = mongoose.model('Password', passwordSchema);
