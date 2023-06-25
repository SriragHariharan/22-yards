// this folder contains all code for authenticating a seller and signup a seller
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../../models/UserModel')

const createJWT = (email) => {
    return jwt.sign( {email}, process.env.JWT_SECRET, {expiresIn:'1d'} )
}

//signup a new user
const BuyerSignup = async(req, res) => {
    try {
        let { fullName, email, password } = req.body;
        let userAlreadyExists = await Users.findOne({email});
        if(userAlreadyExists){
            return res.json({ success:false, message:"User already exists", error_code:400, data:{} })
        }
        password = await bcrypt.hash(password, 10);
        let newUser = new Users({ fullName, email, password });
        let savedUserDB = await newUser.save(); //user saved to mongodb database
        let token = createJWT(savedUserDB.email);
        return res.json({success:true, message:"Signup successfull", data:{token, userName:savedUserDB.fullName,}})
    } 
    catch (error) {
        return res.json({ success:false, message:error.message, error_code:400, data:{} })
    }
}

//login existing user
const BuyerLogin = async(req, res) => {
    try {
        let { email, password } = req.body;
        let userAlreadyExists = await Users.findOne({email});
        if(!userAlreadyExists){
            return res.json({ success:false, message:"User not found", error_code:400, data:{} })
        }
        let passwordVerified = await bcrypt.compare(password, userAlreadyExists.password)
        if(!passwordVerified){
            return res.json({ success:false, message:"Wrong Password", error_code:406, data:{} })
        }
        let token = createJWT(userAlreadyExists.email);
        return res.json({success:true, message:"Login successfull", data:{token, userName:userAlreadyExists.fullName, }})
    } catch (error) {
        return res.json({ success:false, message:error.message, error_code:400, data:{} })
    }
}


//get profile details of user
const getProfile = async(req, res) => {
    try {
        let email=req.userEmail;
        let userProfile = await Users.findOne({email});
        return res.json({success:true, message:"Signup successfull", data:{user:userProfile}})
    } 
    catch (error) {
        return res.json({ success:false, message:error.message, error_code:400, data:{} })        
    }
}

//update profile
const updateProfile = async(req, res) => {
    try {
        let email=req.userEmail;
        let { city, house, landmark, mobile, pincode, state } = req.body;
        let updatedResponse = await Users.updateOne({email}, 
            {$set:{address:{house:house, city:city, state:state, landmark:landmark, mobile:mobile, pincode:pincode }}})
        if(updatedResponse.modifiedCount === 0 || updatedResponse.matchedCount === 0 ){
            return res.json({ success:false, message:"Unable to update", error_code:400, data:{} })           
        }
        return res.json({ success:true, message:"Profile updated", data:{} })
    } 
    catch (error) {
        return res.json({ success:false, message:error.message, error_code:400, data:{} })              
    }
}

module.exports = {
    BuyerSignup,
    getProfile,
    updateProfile,
    BuyerLogin,
}