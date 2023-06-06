const router = require('express').Router()

const { AddNewSeller, LoginSeller } = require('../controllers/Seller/SellerAuthController');
const SellerAuthMiddleware = require('../middlewares/auth.seller');

//add new seller
router.post('/auth/signup', AddNewSeller );

// login an existing user
router.post('/auth/login', LoginSeller )




module.exports = router