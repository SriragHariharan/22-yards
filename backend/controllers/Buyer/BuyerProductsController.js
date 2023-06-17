const Products = require('../../models/ProductsModel')
var mongoose = require('mongoose');


//get all products

const getAllProducts = async(req, res) => {
    try {
        let products = await Products.find({});
        return res.json({success:true, message:"Data fetched successfully", data:{products}})
    } catch (error) {
        return res.json({success:false, message:error.message, error_code:400, data:{}})
    }
}

//get a product by id
const getSingleProduct = async(req, res) => {
    try {
        let productID = req.params.id;
        
        //validating a mongodb ID
        let isMongoIDValid = mongoose.Types.ObjectId.isValid(productID);
        if(!isMongoIDValid){
            return res.json({success:false, message:"Product not found", error_code:400, data:{}})                        
        }
        
        //checking whether a product is found or not
        let product = await Products.findOne({_id:productID})
        if(!product){
            return res.json({success:false, message:"Product not found", error_code:400, data:{}})            
        }
        return res.json({success:true, message:"Product found", data:{product}})
    } 
    catch (error) {
        return res.json({success:false, message:error.message, error_code:400, data:{}})
    }
}


//sort by date
const sortByDate = async(req, res) => {
    try {
        const id = req.params.id
        const products = await Products.find({}).sort({createdAt:id});
        return res.json({  success:true, message:"Data sorted successfully", data:{products}})
    } catch (error) {
        return res.json({  success:false, data:error.message, error_code:404, data:{} })
    }
}

//sort by price
const sortByPrice = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Products.find({}).sort({price:id})
        return res.json({ success:true, message:"Product sorted by price", data:{products} }) 
    } 
    catch (error) {
        return res.json({ success:false, message:error.message, error_code:404, data:{} })
    }
}




module.exports={
    getAllProducts,
    getSingleProduct,
    sortByDate,
    sortByPrice,
}