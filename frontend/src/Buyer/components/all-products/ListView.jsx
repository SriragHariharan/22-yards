import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import BuyerProductInstance from '../../axios/BuyerProductInstance';
import StarComponent from '../view-product-details/StarComponent';

export default function ListView({productName, description, mrp, offerPrice, stock, productID}) {
    const [reviews, setReviews] = useState(null)
    const [error, setError] = useState(null);

    //add commas automatically to prices
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    let offerPrice1 = numberWithCommas(offerPrice);
    let mrp1= numberWithCommas(mrp)

    //fetch reviews on load
    useEffect(() => {
        BuyerProductInstance.post('/reviews/',{productID})
        .then(resp => setReviews(resp.data.data.reviews))
        .catch(err => setError(err.message))
    },[])

    //find average rating of the current product
    let avgRating = useMemo(() => {
        let numberOfReviews = reviews?.map(item => item.productRating).length
        let reviewsTotal = reviews?.map(item => item.productRating).reduce((accu, curr) => {return accu+curr}, 0);
        let averageRating = Number(Math.ceil(reviewsTotal / numberOfReviews));
        return [averageRating, numberOfReviews]
    }, [reviews])

  return (
        <div className="col-md-10">
            <div className="card shadow-0 border rounded-3">
                <div className="card-body">
                <Link to={'../view-product/'+productID} className='link'>
                    <div className="row g-0">
                        <div className="col-xl-3 col-md-3 d-flex justify-content-center">
                            <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                            <img src={`http://localhost:4000/product-images/${productID}-01.jpg`} className="w-50" />
                            <div>
                                <div className="hover-overlay">
                                <div className="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="col-xl-5 col-md-4 col-sm-6   me-5">
                            <h5>{productName}</h5>
                            <div className="d-flex flex-row">
                                <div className="mb-1 me-3">
                                    {
                                        avgRating[1] === 0 && <p className='me-2 text-warning'>No reviews</p>
                                    }
                                    <StarComponent rating={avgRating[0]}  />
                                </div>
                                <div>
                                {
                                    stock < 1 &&  <span className="text-danger">out of stock</span>
                                }
                                {
                                    (stock >= 1 && stock <=3) &&  <span className="text-danger">Only {stock} items in stock</span>
                                }
                                {
                                    stock >= 3 && <span className="text-success">{stock} items in stock</span>
                                }

                                </div>
                            </div>
                            <p className="text mb-4 mb-md-0">
                                {description.slice(0,100)}.....
                            </p>
                        </div>

                        <div className="col-xl-3 col-md-3 col-sm-5">
                            <div className="d-flex flex-row align-items-center mb-1">
                                <h4 className="mb-1 me-2"> ₹ {offerPrice1}</h4>
                                <span className="text-danger me-2"><s> ₹ {mrp1}</s></span>
                                <span className=" text-success mb-1 me-2"> {Math.floor(((mrp-offerPrice)/offerPrice)*100)}% off</span>
                            </div>
                            <h6 className="text-success">Free shipping</h6>
                            <div className="mt-4">
                                {/* <button className="btn btn-dark shadow-0" type="button">Details</button> */}
                                {/* <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i className="fas fa-heart fa-lg px-1"></i></a> */}
                            </div>
                        </div>

                    </div>
                </Link>
                </div>
            </div>
    </div>
    )
}
