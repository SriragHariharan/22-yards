const bcrypt = require('bcrypt')
const Seller = require('../../models/SellerModel')
const jwt = require('jsonwebtoken');

const JWToken = (sellerID) => {
    return jwt.sign({sellerID}, process.env.JWT_SECRET, {expiresIn:'1d'} )
}

//Add new seller to the database
const AddNewSeller = async(req, res) => {
    try {
        let {sellerName, email, mobile, address, password} = req.body
        let sellerExists = await Seller.findOne({email})
        if(sellerExists){
            return res.json({ success:false, message:"Seller already exists", error_code:406, data:{} })
        }
        password = await bcrypt.hash(password, 10)
        let newSeller = new Seller({sellerName, email, mobile, address, password})
        let seller = await newSeller.save()  //after saving, the saved object is returned by mongodb
        const token = JWToken(seller._id)
        return res.json({success:true, message:"New User created", data:{
            token,
            seller:{ sellerName:seller.sellerName, email:seller.email }
        }})
    } catch (error) {
        return res.json({ success:false, message:error.message, error_code:406, data:{} })
    }
}

//login an existing seller

const LoginSeller = async(req, res) => {
    try {
        let {email, password} = req.body;
        let sellerExists = await Seller.findOne({email})
        if(!sellerExists){
            return res.json({ success:false, message:"Seller not found", error_code:406, data:{} })
        }
        let passwordVerified = await bcrypt.compare(password, sellerExists.password)
        if(!passwordVerified){
            return res.json({ success:false, message:"Wrong Password", error_code:406, data:{} })
        }
        let token = JWToken(sellerExists._id)
        return res.json({success:true, message:"Login successfull", data:{
            token,
            seller:{ sellerName:sellerExists.sellerName, email:sellerExists.email }
        }})
    } catch (error) {
        return res.json({ success:false, message:error.message, error_code:406, data:{} })        
    }
}

module.exports = {
    AddNewSeller,
    LoginSeller,
}