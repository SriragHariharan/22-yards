//add a new product for sales by the seller
const Products = require("../../models/ProductsModel");

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
        uploadPath ='./uploads/product-images/'       

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

module.exports = {
    AddNewProduct,
}

