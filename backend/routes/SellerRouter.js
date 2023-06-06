const router = require('express').Router()

const { AddNewSeller, LoginSeller } = require('../controllers/Seller/SellerAuthController');
const { AddNewProduct } = require('../controllers/Seller/SellerProductController');

const SellerAuthMiddleware = require('../middlewares/auth.seller');

//add new seller
router.post('/auth/signup', AddNewSeller );

// login an existing user
router.post('/auth/login', LoginSeller )

//add new product to sales
router.post('/add-new-product/', SellerAuthMiddleware, AddNewProduct  )


module.exports = router