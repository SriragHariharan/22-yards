const jwt = require('jsonwebtoken');

const BuyerAuthMiddleware = (req, res, next) => {
    try {
        let Authorization = req.headers.authorization;
        if(!Authorization){
            return res.json({success:false, message:"Auth failed", error_code:404, data:{}})
        }
        Authorization = Authorization.split(' ')[1]
        let verifiedToken = jwt.verify(Authorization, process.env.JWT_SECRET)
        if(!verifiedToken){
            return res.json({success:false, message:"Auth failed", error_code:404, data:{}})
        }
        req.userEmail = verifiedToken.email;
        next()
    } catch (error) {
        return res.json({success:false, message:error.message, error_code:404, data:{}})
    }
}

module.exports = BuyerAuthMiddleware