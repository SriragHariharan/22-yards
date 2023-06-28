const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productID:{
        required:true,
        type:String,
    },
    email:{
        required:true,
        type:String,
    },
    userName:{
        required:true,
        type:String,
    },
    productRating:{
        required:true,
        type:Number
    },
    productReview:{
        required:false,
        type:String
    },
    purchaseDate:{
        required:true,
        type:String
    },
    orderID:{
        required:true,
        type:String
    }
})

module.exports = mongoose.model('Reviews', reviewSchema);