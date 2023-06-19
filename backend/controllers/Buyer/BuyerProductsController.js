const Products = require('../../models/ProductsModel')
const Orders =  require('../../models/OrdersModal')
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
        const products = await Products.find({}).sort({mrp:id})
        return res.json({ success:true, message:"Product sorted by price", data:{products} }) 
    } 
    catch (error) {
        return res.json({ success:false, message:error.message, error_code:404, data:{} })
    }
}

const getProductsByCategory = async(req, res) => {
    try {
        const category = req.params.id;
        let products = await Products.find({category});
        if(!products){
            return res.json({success:false, message:"Cannot find products", error_code:404, data:{}})
        }
        return res.json({success:true, message:"Data fetched", data:{products}})
    } catch (error) {
        return res.json({success:false, message:error.message, error_code:404, data:{}})        
    }
}

//create an order for a single product selected using buy now
const createOrder = async(req, res) => {
    try {
        //console.log(req.body)
        if(req.body === {} || req.body === null || req.body === undefined){
            return res.json({   success:false, message:"Cannot proceed furthur", error_code:404, data:{} })
        }
        let newOrder =  new Orders({...req.body});
        let savedNewOrder = await newOrder.save()
        return res.json({success:true, message:"Order placed successfully", data:{orderID:savedNewOrder._id, billAmount : savedNewOrder.billAmount, fullName:savedNewOrder.fullName, mobile:savedNewOrder.mobile}})
    } catch (error) {
        console.log(error)
        return res.json({   success:false, message:error.message, error_code:404, data:{} })
    }
}




module.exports={
    getAllProducts,
    getSingleProduct,
    sortByDate,
    sortByPrice,
    getProductsByCategory,
    createOrder,
}