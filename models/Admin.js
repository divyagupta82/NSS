const mongoose = require('mongoose');
const passportLocalMongoose=require("passport-local-mongoose"); 
const { Schema } = mongoose;

const adminSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }, 
}) 

adminSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
