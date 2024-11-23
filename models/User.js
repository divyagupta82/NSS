// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true, 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  }
}, { timestamps: true }); // Add timestamps

userSchema.plugin(passportLocalMongoose);
// Export the User model
module.exports = mongoose.model('User', userSchema);
