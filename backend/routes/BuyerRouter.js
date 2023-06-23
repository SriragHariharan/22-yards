const router = require('express').Router()

const { getAllProducts, getSingleProduct, sortByDate, sortByPrice, getProductsByCategory, createOrder, generateRzpOrderID, verifyRzpPayment, updatePaymentStatus } = require('../controllers/Buyer/BuyerProductsController');

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
router.patch('/update-payment-status/:id', updatePaymentStatus)

module.exports = router;