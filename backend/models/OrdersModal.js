const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    fullName :          { type:String, required:true },
    email :             { type:String, required:true },
    mobile :            { type:String, required:true },
    address :           { type:String, required:true },
    landmark :          { type:String, required:true },
    city :              { type:String, required:true },
    pincode :           { type:String, required:true },
    state :             { type:String, required:true },
    totalBillAmount :   { type:Number, required:true },
    paymentSuccess :    { type:Boolean, required:true },
    messageToSeller :   { type:String,  required:false },
    
    cart :          { type:Array,  required:true },
}, {timestamps:true})

module.exports = mongoose.model("Orders", orderSchema);