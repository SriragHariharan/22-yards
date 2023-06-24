const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:   { required:true, type:String,},
    email:      { required:true, type:String,},
    password:   { required:true, type:String,},
    address:    { required:false, type:Object}
}, {timestamps:true});

module.exports = mongoose.model("Users", userSchema);