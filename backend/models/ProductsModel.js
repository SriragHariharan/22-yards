const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    sellerID:{
        required:true,
        type:String,
    },
    brand:{
        required:true,
        type:String,
    },
    productName:{
        required:true,
        type:String,
    },
    features:{
        required:true,
        type:String,
    },
    originalPrice:{
        required:true,
        type:Number,
    },
    offerPrice:{
        required:true,
        type:Number,
    },
    stock:{
        required:true,
        type:Number,
    },
    size:{
        required:true,
        type:String,
    }
})

module.exports = mongoose.model('Products', productSchema)