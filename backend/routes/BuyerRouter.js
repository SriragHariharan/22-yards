const router = require('express').Router()

const { getAllProducts, getSingleProduct } = require('../controllers/Buyer/BuyerProductsController');

//get all products
router.get('/all-products/', getAllProducts)

//get a single product based on ID
router.get('/get-single-product/:id', getSingleProduct)

module.exports = router;