import React, { useState, useEffect, useMemo } from 'react'
import SimilarItemsCard from '../components/view-product-details/SimilarItemsCard'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BuyerProductInstance from '../axios/BuyerProductInstance';
import Error from '../../Seller/components/general/Error';
import { useSelector, useDispatch } from "react-redux";
import { NewCartItem } from '../../redux-tk/reducers/CartReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReviewsCard from '../components/view-product-details/ReviewsCard';
import StarComponent from '../components/view-product-details/StarComponent';
import ReactImageMagnify from 'react-image-magnify';

export default function ViewProductDetails() {
    const {id} = useParams()
    const [product, setProduct] = useState(null);
    const [categorizedProducts, setCategorizedProducts] = useState(null)
    const [error, setError] = useState(null);
    const [image, setImage] = useState(1);
    const [reviews, setReviews] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    //show toast message
    const showToastMessage = () => {
        toast.success('Item added to cart !', {
            position: toast.POSITION.TOP_CENTER
        });
    };
    
    //convert currency with commas
    function numberWithCommas(x) {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    //promise chaining is done here
    useEffect(() => {
        BuyerProductInstance.get('get-single-product/'+id)
        .then(resp => {
            if(resp.data.success === false){
                setError(resp.data.message);
                return false;
            }else{
                setProduct(resp.data.data.product);
                return resp.data.data.product.category;
            }
        })
        .then(resp => {
                BuyerProductInstance.get('category/'+resp)
                .then(resp => {
                    if(resp.data.success === false){
                        setError(resp.data.message);
                    }else{
                        setCategorizedProducts(resp.data.data.products)
                        return true;
                    }
                }).then(resp => {
                    BuyerProductInstance.post('/reviews/',{productID:id})
                    .then(resp => setReviews(resp.data.data.reviews))
                    .catch(err => setError(err.message))
                } )

            })
        .catch(err => setError(err.message))
    }, [id])

    let offerPrice1 = numberWithCommas(product?.offerPrice)
    let mrp1 = numberWithCommas(product?.mrp)

    //handle add to cart functionality
    const handleAddToCart = (productID,  productName, offerPrice, sellerID, size) => {
        dispatch(NewCartItem({productID, productName, offerPrice, quantity:1, sellerID, size, totalPrice:offerPrice, orderStatus:"order placed" }));
        showToastMessage()
    }

    //handle buy now
    const handleBuyNow = (productID,  productName, offerPrice, sellerID, size) => {
        dispatch(NewCartItem({productID, productName, offerPrice, quantity:1, sellerID, size, totalPrice:offerPrice, orderStatus:"order placed" }));
        navigate('/cart')
    }
    
    const cart = useSelector(state => state.cart.cart);  //here we get the cart items in this variable

    //code to find whether product is found in cart
    let productExistsInCart = cart?.filter(item => item.productID === product?._id);

    //find average rating of the current product
    let avgRating = useMemo(() => {
        let numberOfReviews = reviews?.map(item => item.productRating).length
        let reviewsTotal = reviews?.map(item => item.productRating).reduce((accu, curr) => {return accu+curr}, 0);
        let averageRating = Number(Math.ceil(reviewsTotal / numberOfReviews));
        return [averageRating, numberOfReviews]
    }, [reviews])


    return (

    <>
        {error && <Error error={error} />}
        {!error && (
            <>
                <ToastContainer />
                <section className="py-5">
                    <div className="container">
                        <div className="row">
                            
                            <aside className="col-lg-6">
                                <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                <div className="rounded-4">
                                <ReactImageMagnify {...{
                                    smallImage: {
                                        alt: 'Wristwatch by Ted Baker London',
                                        isFluidWidth: true,
                                        src: "http://localhost:4000/product-images/"+ product?._id +"-0"+image+".jpg"

                                    },
                                    largeImage: {
                                        src: "http://localhost:4000/product-images/"+ product?._id +"-0"+image+".jpg",
                                        width: 2000,
                                        height: 1800
                                    },
                                    isHintEnabled:true
                                }} />
                                    {/* <img style={{maxWidth: "100%", maxHeight: "100vh", margin: "auto"}} className="rounded-4 fit" src={`http://localhost:4000/product-images/${product?._id}-0${image}.jpg`}/> */}
                                </div>
                                </div>
                                <div className="d-flex justify-content-center mb-3">
                                    <img onClick={() => setImage(1)} width="60" height="60" className="rounded-2" src={`http://localhost:4000/product-images/${product?._id}-01.jpg`} />
                                    <img onClick={() => setImage(2)} width="60" height="60" className="rounded-2" src={`http://localhost:4000/product-images/${product?._id}-02.jpg`} />
                                    <img onClick={() => setImage(3)} width="60" height="60" className="rounded-2" src={`http://localhost:4000/product-images/${product?._id}-03.jpg`} />
                                </div>
                            </aside>

                            <main className="col-lg-6">
                                <div className="ps-lg-3">
                                    <h4 className="title h2 text-dark">
                                        {product?.productName}
                                    </h4>
                                    <div className="d-flex flex-column my-3">
                                        <div class="mb-1 me-2">
                                            <StarComponent rating={avgRating[0]} count={avgRating[1]} /> 
                                        </div>
                                        <span className="text-success h6 ms-2 mt-3"> { product?.stock > 0 ? product?.stock : 'No Product ' } items In stock</span>
                                    </div>

                                    <div className="mb-3">
                                        <strong className="h4 me-3">₹ {offerPrice1}</strong>
                                        <span className="h5 me-3 text-danger"><s>₹ {mrp1}</s></span>
                                        <strong className="h4 text-success">{Math.floor(((product?.mrp-product?.offerPrice)/product?.offerPrice)*100)}% off</strong>
                                    </div>

                                    <p className='mt-5 mb-5'>
                                        {product?.description}
                                    </p>

                                    <div className="row">
                                        <dt className="col-3 h5">Size</dt>
                                        <dd className="col-9 h5">{product?.size}</dd>

                                        <dt className="col-3">Brand</dt>
                                        <dd className="col-9">{product?.brand}</dd>

                                        <dt className="col-3">Category:</dt>
                                        <dd className="col-9">{product?.category}</dd>

                                        <dt className="col-3">Color</dt>
                                        <dd className="col-9">{product?.productColor}</dd>
                                    </div>

                                    <hr />

                                                                        
                                    <>
                                    {
                                        product?.stock < 1 &&
                                        <div className="btn btn-danger p-5 h1 w-100"> 
                                                <i className="fa-solid fa-box-open fa-2xl me-5"></i>
                                                <b>PRODUCT OUT OF STOCK</b>
                                            </div>
                                    }
                                    {
                                        (product?.stock > 1 && productExistsInCart?.length !== 0) &&
                                            <Link to={'/cart'}  className="link btn btn-success border border-5 p-3 w-100">
                                                <i class="fa-solid fa-cart-shopping fa-bounce fa-xl me-4"></i>
                                                GO TO CART
                                            </Link> 
                                            
                                    }
                                    {
                                        (product?.stock > 1 && productExistsInCart.length ===0) && (
                                            <>
                                            <div onClick={() => handleAddToCart(product?._id, product?.productName, product?.offerPrice, product?.sellerID, product?.size, )} className="btn btn-info border p-3 border-5 w-50 "> 
                                                <i className="fa-solid fa-cart-shopping fa-xl me-4"></i>                                                    
                                                Add cart 
                                            </div>
                                            <div onClick={() => handleBuyNow(product?._id, product?.productName, product?.offerPrice, product?.sellerID, product?.size, )} className="btn btn-warning border p-3 border-5 w-50"> 
                                                <i className="fas fa-bolt fa-xl me-3"></i> 
                                                BUY NOW 
                                            </div>
                                            </>
                                        )
                                    }   

                                    </>
                                </div>
                            </main>

                        </div>
                    </div>
                </section>

                <section className="bg-light border-top py-4">
                    <div className="container">
                        <div className="row gx-4">

                            <div className="col-lg-8 mb-4">
                                <div className="border rounded-2 px-3 py-2 bg-white">
                                <ul className="nav nav-pills nav-justified mb-3">
                                    <li className="nav-item d-flex">
                                        <div className="nav-link d-flex align-items-center justify-content-center w-100 border border-5" ><b>S p e c i f i c a t i o n</b></div>
                                    </li>
                                </ul>

                                <div className="tab-content" id="ex1-content">
                                    <div className="tab-pane fade show active">
                                    <p className='mt-4 mb-5'>
                                        {product?.description}
                                    </p>
                                    <div className="row mb-2">
                                        <div className="col-12 col-md-6">
                                        <ul className="list-unstyled mb-3">
                                            <li><i className="fas fa-check text-success me-2"></i>{product?.feature1}</li><br />
                                            <li><i className="fas fa-check text-success me-2"></i>{product?.feature2}</li>
                                        </ul>
                                        </div>
                                        <div className="col-12 col-md-6 mb-0">
                                        <ul className="list-unstyled">
                                            <li><i className="fas fa-check text-success me-2"></i>{product?.feature3}</li><br />
                                            <li><i className="fas fa-check text-success me-2"></i>{product?.feature4}</li>
                                        </ul>
                                        </div>
                                    </div>
                                    <table className="table border mt-3 mb-2">
                                        <tbody>
                                            <tr>
                                                <th className="py-2">Brand</th>
                                                <td className="py-2">{product?.brand}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Size</th>
                                                <td className="py-2">{product?.size}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Weight</th>
                                                <td className="py-2">{product?.weight}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Items in box:</th>
                                                <td className="py-2">{product?.itemsInBox}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Warranty:</th>
                                                <td className="py-2">{product?.warranty}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Shipping</th>
                                                <td className="py-2">2 - 3 bussiness days</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-4">
                                <div className="px-0 border rounded-2 shadow-0">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Similar items</h5>
                                            <>
                                            {
                                                categorizedProducts?.map(product => ( <SimilarItemsCard key={product._id} product={product} />))

                                            }
                                            </>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                {
                    reviews?.length === 0 && <div className="h3 text-center p-4">No reviews yet</div>
                }
                {
                    reviews?.length > 0  && (reviews.map((review, index) => <ReviewsCard key={index} review={review} /> ))  
                }
            </>
        )}
    </>



    )
}
