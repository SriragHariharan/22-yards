//add a new product for sales by the seller
const Products = require("../../models/ProductsModel");

const uploadPath ='./uploads/product-images/'       
const fs = require("fs")

const AddNewProduct = async(req, res) => {
    try {
        let sellerID = req.sellerID
        let {brand, productName, features, originalPrice, offerPrice, stock, size } = req.body;
        originalPrice = Number(originalPrice);
        offerPrice    = Number(offerPrice);
        stock= Number(stock)
        let newProduct = new Products({ sellerID, brand, productName, features, originalPrice, offerPrice, stock, size });
        let productFromDB = await newProduct.save()
        //file upload

        let image1 = req.files.image1;
        let image2 = req.files.image2;
        let image3 = req.files.image3;

        image1.mv(uploadPath + productFromDB._id +"-01.jpg", function(err) { if (err) return res.json({success:false, message:"Server Error", error_code:500, data:{} }) })           
        image2.mv(uploadPath + productFromDB._id +"-02.jpg", function(err) { if (err) return res.json({success:false, message:"Server Error", error_code:500, data:{} }) })           
        image3.mv(uploadPath + productFromDB._id +"-03.jpg", function(err) { if (err) return res.json({success:false, message:"Server Error", error_code:500, data:{} }) })           

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
        let products = await Products.find({sellerID})
        return res.json({ success:true, message:"Data fetched", data:{products} })
    } catch (error) {
        return res.json({ success:false,error_code:400, message:error.message, data:{} })
    }
}

const deleteProduct = async(req, res) => {
    try {
        let productID = req.params.id;
        let product = await Products.findOne({_id:productID})
        if(product === null){
            return res.json({ success:false, message:"Unable to find product", error_code:500, data:{} })
        }
        if(product.sellerID !== req.sellerID){
            return res.json({ success:false, message:"Unable to delete", error_code:500, data:{} })
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



module.exports = {
    AddNewProduct,
    getProducts,
    deleteProduct
}

