const router = require('express').Router()

const { BuyerSignup, getProfile, updateProfile, BuyerLogin } = require('../controllers/Buyer/BuyerAuthController');
const { getAllProducts, getSingleProduct, sortByDate, sortByPrice, getProductsByCategory, createOrder, generateRzpOrderID, verifyRzpPayment, updatePaymentStatus, getordersBuyer, updateProductStock, addProductReview, getReviews, checkReview } = require('../controllers/Buyer/BuyerProductsController');
const BuyerAuthMiddleware = require('../middlewares/auth.buyer');

//get all products
router.get('/all-products/', getAllProducts);

//get a single product based on ID
router.get('/get-single-product/:id', getSingleProduct);

//sort products by date
router.get('/sort-by-date/:id', sortByDate);

//sort by price
router.get('/sort-by-price/:id', sortByPrice);

//get products by category
router.get('/category/:id', getProductsByCategory)

//create an order for a single product selected using buy now
router.post('/create-order', createOrder )

//generate rzp orderID
router.post('/generate-rzp-orderId', generateRzpOrderID);

//verify razorpay payment
router.post('/verify-payment/', verifyRzpPayment );

//update paymentSuccess from false to true on payment success
router.patch('/update-payment-status/:id', updatePaymentStatus);

//signup user
router.post('/buyer-signup', BuyerSignup)

//buyer login
router.post('/buyer-login', BuyerLogin)

//get profile details
router.get('/profile', BuyerAuthMiddleware, getProfile)

//update profile
router.post('/update-profile', BuyerAuthMiddleware, updateProfile)

//get all orders buyer
router.get('/orders', BuyerAuthMiddleware, getordersBuyer)

//update stock of a product on payment success
router.post('/update-stock', updateProductStock)

//add a review for a purchased product
router.post('/add-review', BuyerAuthMiddleware, addProductReview)

//get all reviews based on a product
router.post('/reviews', getReviews)

router.post('/check-review', BuyerAuthMiddleware, checkReview)

module.exports = router;