const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    sellerName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
}, {timestamps:true})

module.exports = mongoose.model("Sellers", sellerSchema)