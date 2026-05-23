const Products = require("../../models/ProductsModel");
const Orders = require("../../models/OrdersModal");
const mongoose = require('mongoose')
const { uploadProductImages, deleteProductImages } = require('../../services/image.service')

const AddNewProduct = async(req, res) => {
    try {
        let sellerID = req.sellerID
        let { productName, brand, category, mrp, offerPrice, size, stock, description, specification, feature1, feature2, feature3, feature4, productColor, productMaterial, itemsInBox, warranty, weight} = JSON.parse(req.body.data);
        
        mrp = Number(mrp);
        offerPrice    = Number(offerPrice);
        stock= Number(stock)
        
        let newProduct = new Products({ sellerID, productName, brand, category, mrp, offerPrice, size, stock, description, specification, feature1, feature2, feature3, feature4, productColor, productMaterial, itemsInBox, warranty, weight });
        let productFromDB = await newProduct.save()

        try {
            await uploadProductImages(productFromDB._id, req.files)
        } catch (uploadError) {
            await Products.deleteOne({ _id: productFromDB._id })
            return res.json({ success: false, message: "Failed to upload product images", error_code: 500, data: {} })
        }

        return res.json({success:true, message:"New product has been added successfully", data:{product:productFromDB}})
    } 
    catch (error) {
        return res.json({ success:false, error:error.message, error_code:400, data:{} })
    }
}

const getProducts = async(req, res) => {
    try {
        let sellerID = req.sellerID;
        let products = await Products.find({sellerID}).sort({createdAt:-1})
        return res.json({ success:true, message:"Data fetched", data:{products} })
    } catch (error) {
        return res.json({ success:false,error_code:400, message:error.message, data:{} })
    }
}

const deleteProduct = async(req, res) => {
    try {
        let productID = req.params.id;
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
        await deleteProductImages(product._id)
        return res.json({ success:true, message:"Product deleted successfully", data:{} })            
    } 
    catch (error) {
        return res.json({ success:false, message:error.message, error_code:500, data:{} })            
    }
}

const getAProduct = async(req, res) => {
    try 
    {
        let productID = req.params.id;
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

const editAProduct = async(req, res) => {
    try {
        let editedDetails = req.body;
        const productID = req.params.id;
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

const updateProductOrderStatus = async(req, res) => {
    try {
        let {orderID, productID, status} = req.body;

        let response = await Orders.updateOne({_id:orderID, 'cart.productID':productID}, 
        {"$set" :{ 'cart.$.orderStatus': status }},
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
