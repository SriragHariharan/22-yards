import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import OrderPlaced from './order-status/OrderPlaced'
import OrderConfirmed from './order-status/OrderConfirmed'
import OrderPacked from './order-status/OrderPacked'
import OrderShipped from './order-status/OrderShipped'
import OrderDelivered from './order-status/OrderDelivered'

import useBuyerAuthInstance from '../../axios/useBuyerAuthInstance'

//react star rating code
import ReactStars from "react-rating-stars-component";


export default function OrderCard({order}) {

    const [BuyerAuthInstance] = useBuyerAuthInstance()
    const [rating, setRating] = useState(1);
    const [productReview, setProductReview] = useState(null)
    const [reviewPresent, setReviewPresent] = useState(false)

    const addReview = (e) => {
        e.preventDefault();
        setProductReview(e.target.value)
    }

    //to show toast message
    function showToastMessage (message){
        toast(message, {
            position: toast.POSITION.TOP_CENTER
        });
    };

    //to submit review
    const handleSubmit = (productID, email,userName, purchaseDate, orderID ) => {
        let data = {}
        data.productID = productID
        data.email=email
        data.userName = userName
        data.productRating = rating
        data.productReview = productReview
        data.purchaseDate = purchaseDate
        data.orderID = orderID

        //sending data to backend api
        BuyerAuthInstance.post('/add-review', {...data})
        .then(resp => showToastMessage(resp.data.message) )
        .catch(err => showToastMessage(err.message))

    }

    //to check whether a review is present or not
    useEffect(() => {
        BuyerAuthInstance.post('/check-review', {email:order?.email ,orderID:order?._id, productID:order?.cart?.productID, })
        .then(resp => {
            if(resp.data.success === false){
                setReviewPresent(false);
            }else{
                setReviewPresent(true);
            }
        }).catch(err => showToastMessage(err.message) )
    },[])


    const starRating = {
        size: 25,
        count: 5,
        value: 1,
        color: "grey",
        activeColor: "#FFC55C",
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        onChange: newValue => {
            setRating(newValue);
        }
      };

  return (
    <div>
        {/* for showing toast message */}
        <ToastContainer />
        <div class="row justify-content-center mb-3">
            <div class="col-md-10 col-xl-9">
                <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                    <div class="row">
                    <div class="col-md-6 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                        <div class="bg-image hover-zoom ripple rounded ripple-surface">
                        <img src={`${import.meta.env.VITE_SERVER_IMG}/product-images/${order?.cart?.productID}-01.jpg`}
                            class="w-100" />
                        <div>
                            <div class="hover-overlay">
                            <div class="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-9 col-xl-9">
                        <h5>{order?.cart?.productName}</h5>
                        <div class="d-flex flex-row">
                            <span>Size : {order?.cart?.size}</span>
                            &nbsp; &nbsp; &nbsp;
                            <span>Quantity : {order?.cart?.quantity}</span>
                        </div>
                            <p class="mb-1 mt-3">Amount payable : &nbsp; &nbsp; $ {order?.cart?.totalPrice}</p>
                            <p class="mb-1 mt-3">Payment status : &nbsp; &nbsp; {order?.paymentSuccess ? <span className="text-success  h6">Payment completed</span> : <span className="text-danger h6">Payment incomplete / failed</span> }</p>
                            {
                             order?.paymentSuccess && <p class="mb-1 mt-3">Delivery status : <span className="text-success h5">{order?.cart?.orderStatus}</span> </p>
                            }
                        </div>
                        
                            {
                                order?.paymentSuccess && order?.cart?.orderStatus === 'order placed' && <OrderPlaced/>
                            }
                            {
                                order?.paymentSuccess && order?.cart?.orderStatus === 'order confirmed' && <OrderConfirmed/>
                            }
                            {
                                order?.paymentSuccess && order?.cart?.orderStatus === 'order packed' && <OrderPacked/>
                            }
                            {
                                order?.paymentSuccess && order?.cart?.orderStatus === 'order shipped' && <OrderShipped/>
                            }
                            {
                                order?.paymentSuccess && order?.cart?.orderStatus === 'order delivered' && <OrderDelivered/>
                            }
                            {/* if order is delivered show section to addd rating */}
                            {
                                order?.paymentSuccess && order?.cart?.orderStatus === 'order delivered' && 
                                ( !reviewPresent ? <div className='text-primary mt-2'>user review added for this product</div> :
                                <div className='card p-3'>
                                    <p>Add review for this product</p>
                                    <ReactStars {...starRating} />
                                    <textarea cols="30" rows="3" onChange={addReview}></textarea>
                                    <div className="btn btn-info m-2 w-25 flex-end" 
                                    onClick={() => handleSubmit(order?.cart?.productID, order?.email, order?.fullName, order?.createdAt, order?._id )}
                                    >
                                        add review
                                    </div>
                                </div>

                                )
                            }
                    </div>
                </div>
                </div>
            </div>
    </div>
    </div>
  )
}
