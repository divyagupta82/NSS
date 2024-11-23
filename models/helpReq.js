const mongoose = require('mongoose');
const { Schema } = mongoose;

const helpReqSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    regno: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    phnno:{
        type:Number,
        required:true
    },
    typeOfHelp:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
        }
});

const Request = new mongoose.model("Request", helpReqSchema);

module.exports = Request;