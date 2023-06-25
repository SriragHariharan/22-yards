const router = require('express').Router()

const { AddNewSeller, LoginSeller } = require('../controllers/Seller/SellerAuthController');
const { deleteProduct, getAProduct, editAProduct, SellerGetAllOrders, updateProductQuantity, updateProductOrderStatus } = require('../controllers/Seller/SellerProductController');
const { getProducts } = require('../controllers/Seller/SellerProductController');
const { AddNewProduct } = require('../controllers/Seller/SellerProductController');

const SellerAuthMiddleware = require('../middlewares/auth.seller');

//add new seller
router.post('/auth/signup', AddNewSeller );

// login an existing user
router.post('/auth/login', LoginSeller )

//add new product to sales
router.post('/add-new-product/', SellerAuthMiddleware, AddNewProduct  )

//get all products
router.get('/', SellerAuthMiddleware, getProducts  )

//delete a product
router.delete('/delete-product/:id', SellerAuthMiddleware, deleteProduct )

//get details of a single product
router.get('/get-product/:id', SellerAuthMiddleware, getAProduct)

//edit a product
router.patch('/edit-product/:id', SellerAuthMiddleware, editAProduct)

//seller get all orders
router.get('/orders', SellerAuthMiddleware, SellerGetAllOrders)

//update order status of product to confirmed
router.post('/update-order-status', SellerAuthMiddleware, updateProductOrderStatus)


module.exports = router