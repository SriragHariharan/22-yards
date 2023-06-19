const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    fullName :      { type:String, required:true },
    email :         { type:String, required:true },
    mobile :        { type:String, required:true },
    address :       { type:String, required:true },
    landmark :      { type:String, required:true },

    paymentSuccess :    { type:Boolean, required:true },
    billAmount :        { type:Number,  required:true },
    quantity :          { type:Number,  required:true },
    messageToSeller :   { type:String,  required:false },
    deliveryStatus :    { type:String,  required:true },

    product : {
        _id:            { type:String, required:true },
        productName :   { type:String, required:true },
        offerPrice:     { type:Number, required:true },
        sellerID :      { type:String, required:true },
    }
})

module.exports = mongoose.model("Orders", orderSchema);