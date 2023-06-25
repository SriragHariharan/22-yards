//add a new product for sales by the seller
const Products = require("../../models/ProductsModel");
const Orders = require("../../models/OrdersModal");

const uploadPath ='./uploads/product-images/'       
const fs = require("fs");
const mongoose = require('mongoose')

const sharp = require('sharp');

//add new product
const AddNewProduct = async(req, res) => {
    try {
        let sellerID = req.sellerID
        let { productName, brand, category, mrp, offerPrice, size, stock, description, specification, feature1, feature2, feature3, feature4, productColor, productMaterial, itemsInBox, warranty, weight} = JSON.parse(req.body.data);
        
        //type conversion String  ==> Number
        mrp = Number(mrp);
        offerPrice    = Number(offerPrice);
        stock= Number(stock)
        
        //saving to db
        let newProduct = new Products({ sellerID, productName, brand, category, mrp, offerPrice, size, stock, description, specification, feature1, feature2, feature3, feature4, productColor, productMaterial, itemsInBox, warranty, weight });
        let productFromDB = await newProduct.save()
        
        

        //node-sharp to convert 3 images to desired size
        sharp(req.files.image1.data)
        .resize(1024, 1024, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255 }
        })
        .toFile(uploadPath+productFromDB._id +"-01.jpg")
        .then().catch(err => console.log(err))

        sharp(req.files.image2.data)
        .resize(1024, 1024, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255 }
        })
        .toFile(uploadPath+productFromDB._id +"-02.jpg")
        .then().catch(err => console.log(err))

        sharp(req.files.image3.data)
        .resize(1024, 1024, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255 }
        })
        .toFile(uploadPath+productFromDB._id +"-03.jpg")
        .then().catch(err => console.log(err))

        //moving files to uploads folder
        // image1.mv(uploadPath + productFromDB._id +"-01.jpg", function(err) { if (err) return res.json({success:false, message:"Server Error", error_code:500, data:{} }) })           
        // image2.mv(uploadPath + productFromDB._id +"-02.jpg", function(err) { if (err) return res.json({success:false, message:"Server Error", error_code:500, data:{} }) })           
        // image3.mv(uploadPath + productFromDB._id +"-03.jpg", function(err) { if (err) return res.json({success:false, message:"Server Error", error_code:500, data:{} }) })           

        return res.json({success:true, message:"New product has been added successfully", data:{product:productFromDB}})
    } 
    catch (error) {
        return res.json({ success:false, error:error.message, error_code:400, data:{} })
    }
}

//get all products for a specific seller
const getProducts = async(req, res) => {
    try {
        let sellerID = req.sellerID;
        let products = await Products.find({sellerID}).sort({createdAt:-1})
        return res.json({ success:true, message:"Data fetched", data:{products} })
    } catch (error) {
        return res.json({ success:false,error_code:400, message:error.message, data:{} })
    }
}


//delete products of sellers
const deleteProduct = async(req, res) => {
    try {
        let productID = req.params.id;
        //validate mongoose objectID
        let isObjectIDValid = mongoose.Types.ObjectId.isValid(productID);
        if(!isObjectIDValid){
            return res.json({ success:false, message:"Unable to find product", error_code:400, data:{} })
        }
        let product = await Products.findOne({_id:productID})
        if(product === null){
            return res.json({ success:false, message:"Unable to find product", error_code:500, data:{} })
        }
        if(product.sellerID !== req.sellerID){
            return res.json({ success:false, message:"Unauthorized request", error_code:500, data:{} })
        }
        let deletedResponse = await Products.deleteOne({_id:productID})
        if(deletedResponse.deletedCount === 0){
            return res.json({ success:false, message:"Nothing to delete", error_code:500, data:{} })            
        }
        fs.unlinkSync(uploadPath + product._id +"-01.jpg");
        fs.unlinkSync(uploadPath + product._id +"-02.jpg");
        fs.unlinkSync(uploadPath + product._id +"-03.jpg");
        return res.json({ success:true, message:"Product deleted successfully", data:{} })            
    } 
    catch (error) {
        return res.json({ success:false, message:error.message, error_code:500, data:{} })            
    }
}


//get a single product
const getAProduct = async(req, res) => {
    try 
    {
        let productID = req.params.id;
        //validate mongoose objectID
        let isObjectIDValid = mongoose.Types.ObjectId.isValid(productID);
        if(!isObjectIDValid){
            return res.json({ success:false, message:"Unable to find product", error_code:400, data:{} })
        }
        let product = await Products.findOne({_id:productID})
        if(product === null || product === undefined){
            return res.json({success:false, message:"Unable to find product", error_code:400, data:{} })
        }
        if(req.sellerID !== product.sellerID){
            return res.json({ success:false, message:"Unauthorized request", error_code:400, data:{} })
        }
        return res.json({success:true, message:"Product fetched", data:{product}})       
    } 
    catch (error) 
    {
        return res.json({success:false, message:error.message, error_code:400, data:{} })        
    }
}    

//edit a product by seller
const editAProduct = async(req, res) => {
    try {
        let editedDetails = req.body;
        const productID = req.params.id;
        //validate mongodb object id
        let isObjectIDValid = mongoose.Types.ObjectId.isValid(productID);
        if(!isObjectIDValid){
            return res.json({ success:false, message:"Unable to update", error_code:400, data:{} })
        }
        let product = await Products.findOne({_id:productID})
        if(product.sellerID !== req.sellerID){
            return res.json({ success:false, message:"Unauthorized request", error_code:400, data:{} })
        }
        let updatedProduct = await Products.updateOne({_id:productID}, {$set:{...editedDetails}});
        if(updatedProduct.modifiedCount === 0){
            return res.json({ success:false, message:"Unable to update", error_code:400, data:{} })
        }
        return res.json({success:true, message:"Product updated", data:{} })    
    } 
    catch (error) 
    {
        return res.json({success:false, message:error.message, error_code:400, data:{} })            
    }
}

//get all orders for a particular seller

const SellerGetAllOrders = async(req, res) => {
    try {
        let orders = await Orders.aggregate(
            [
                {
                    $unwind : '$cart'
                },
                {
                    $match:{
                        'cart.sellerID' : req.sellerID
                    }
                },
                {
                    $sort:{createdAt : -1}
                }
            ]
        );
        return res.json({ success : true, message:"orders fetched successfully", data:{orders} })
    } 
    catch (error) {
        return res.json({ success:false, message:error.message, error_code:404, data:{} })
    }
}



//update order status
const updateProductOrderStatus = async(req, res) => {
    try {
        let {orderID, productID} = req.body;

        let response = await Orders.updateOne({_id:orderID, 'cart.productID':productID}, 
        {"$set" :{ 'cart.$.orderStatus': "order shipped" }},
        )
        if(response.modifiedCount > 0){
            return res.json({success:true, message:"order status updated", data:{} })
        }else{
            return res.json({ success:false, message:"Unable to proceed", error_code:404, data:{} })
        }
    } 
    catch (error) {
        return res.json({ success:false, message:error.message, error_code:404, data:{} })
    }
}


module.exports = {
    AddNewProduct,
    getProducts,
    deleteProduct,
    getAProduct,
    editAProduct,
    SellerGetAllOrders,
    updateProductOrderStatus,
}

