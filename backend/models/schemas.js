const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.set("strictQuery", false); 

const signupSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    },
    Contact: {
        type: Number,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    }
});

const Users = new mongoose.model('Users', signupSchema, 'users');

module.exports = Users;