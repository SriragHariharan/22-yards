const Products = require('../../models/ProductsModel')
const Orders =  require('../../models/OrdersModal')
const mongoose = require('mongoose');
const crypto = require('crypto')


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
        //console.log("req.body :::",req.body)
        if(req.body === {} || req.body === null || req.body === undefined){
            return res.json({   success:false, message:"Cannot proceed furthur", error_code:404, data:{} })
        }
        let newOrder =  new Orders({...req.body});
        let savedNewOrder = await newOrder.save()
        //console.log("SNO:::", savedNewOrder._id);
        return res.json({success:true, message:"Order placed successfully", data:{savedNewOrder}})
    } catch (error) {
        return res.json({   success:false, message:error.message, error_code:404, data:{} })
    }
}


//generate razorpay orderID
const generateRzpOrderID = async(req, res) => {
    try {
        const Razorpay = require('razorpay');
        var instance = new Razorpay({ key_id: process.env.RZP_KEY_ID, key_secret: process.env.RZP_KEY_SECRET })
        const options = {
            amount: req.body.totalBillAmount*100, // amount in smallest currency unit
            currency: "INR",
            receipt: req.body._id,
        };
        //creating a unique orderID based on given details
        const order = await instance.orders.create(options);
        if (!order) {
            return res.json({ success:false, message:"Some error occured", error_code:500, data:{} });
        }
        return res.json({ success:true, message:"Order created", data:{order} }) 
    } 
    catch (error) {
        return res.json({ success:false, message:error.message, error_code:500, data:{} });        
    }
}


//verify payment done by razorpay
const verifyRzpPayment = (req, res) => {
    try {
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        const shasum = crypto.createHmac("sha256", process.env.RZP_KEY_SECRET);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        if (digest !== razorpaySignature){
            return res.json({ success:false, message:"Payment not legit", error_code:400, data:{} })
        }else{
            return res.json({ success:true, message:"Payment sucessfull", data:{} });
        }
    } 
    catch (error) {
        return res.json({ success:false, message:error.message, error_code:400, data:{} })
    }
}

//updatePaymentStatus
const updatePaymentStatus = (req, res) => {
    try {
        let id = req.params.id;
        Orders.updateOne({_id: id}, {$set:{paymentSuccess:true}})
        .then(resp => res.json({success:true, message:"payment status updated", data:{} }))
        .catch(err => res.json({success:false, message:err.message, error_code:404, data:{} }))
    } catch (error) {
        return res.json({success:false, message:err.message, error_code:404, data:{} })
    }
}

//get all orders
const getordersBuyer = async(req, res) => {
    try {
        let email = req.userEmail;
        let orders = await Orders.aggregate([
            {
                $unwind : '$cart'
            },
            {
                $match:{
                    email:email
                }
            }
        ])
        return res.json({success:true, message:"Orders fetched", data:{orders}})
    } 
    catch (error) {
        return res.json({success:false, message:err.message, error_code:404, data:{} })      
    }
}



module.exports={
    getAllProducts,
    getSingleProduct,
    sortByDate,
    sortByPrice,
    getProductsByCategory,
    createOrder,
    generateRzpOrderID,
    verifyRzpPayment,
    updatePaymentStatus,
    getordersBuyer,
}