import React from 'react'
import useSellerProductInstance from '../../axios/useSellerProductInstance';
import { ToastContainer, toast } from 'react-toastify';

export default function OrdersCard({product}) {
    const [sellerProductInstance] = useSellerProductInstance()
    let time = new Date(product?.createdAt);
    time = time.toTimeString().split(' ')[0];

    let orderID = product._id;

    //toast message
    const showToastMessage = () => {
        toast("Order status changed successfully...! refresh page to see updates", {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const errorToastMessage = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER
        });
    };


    //mongodb date to real date
    let date = new Date(product?.createdAt);
    date = date.toLocaleString('en-GB', {day:'numeric', month:'long', year:'numeric'});

    // update product order status
    let confirmOrder = ( productID, status ) => {
        sellerProductInstance.post('/update-order-status', {orderID, productID, status})
        .then(resp => showToastMessage())
        .catch(err => errorToastMessage(err.message))
    }

  return (
    <div className="card border shadow-0">
        <div className="m-4">
            <div className="row gy-3 mb-0">
            <ToastContainer />
                <div className="col-lg-5">
                    <div className="">
                    <div className="d-flex">
                        <img src={`http://localhost:4000/product-images/${product?.cart?.productID}-01.jpg`} className="border rounded me-3" style={{width: "150px", height: "150px" }} />
                        <div>
                            <div className="nav-link">{product?.cart.productName}</div>
                            <small className="text-muted">Size : {product?.cart?.size}</small>                      <br />
                            <small className="text-muted">Quantity : {product?.cart?.quantity}</small>              <br />
                            <small className="text-muted">Bill amount : ₹ {product?.cart.totalPrice}</small>        <br />
                            <small className="text-muted">₹ {product?.cart.offerPrice} / <sub>item on offer</sub> </small>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div className="col-lg-4 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                    <div>
                        <div className="p">Shipping address <br /></div>
                        <small className="text-muted text-nowrap">
                            {product?.fullName}, <br /> {product?.address}, {product?.city}, <br/>
                             {product?.state}. &nbsp; Pin : {product?.pincode} <br />
                             Landmark : {product?.landmark} <br />
                             Mobile : {product?.mobile} &nbsp; &nbsp;
                             email : {product?.email}
                        </small>
                    </div>
                </div>

                <div className="col-lg-3 col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                    <div className="float-md-end">
                        <small>Order placed on : {date},&nbsp; &nbsp; {time}</small> <br />
                        <small>Payment status : {product?.paymentSuccess ? (<span className='text-success h6'>Payment Success</span>) : (<span className='text-danger h6'>Payment Failed</span>)}</small> <br />
                        <small className=' mt-5'>Order status : <span className='text-danger h5'><u>{product?.cart?.orderStatus}</u></span> </small>
                        
                        {/* click to confirm the order placed */}
                        {
                            product?.cart?.orderStatus === 'order placed' && 
                            <div onClick={() => confirmOrder( product?.cart?.productID, 'order confirmed')} className="w-100 mt-4 btn btn-info border border-5 text-dark"> 
                                Confirm order &nbsp; &nbsp;
                                .....<i class="fa-solid fa-truck-fast">...</i>
                            </div>
                        }

                        {/* if order is confirmed need to pack product for shipment */}
                        {
                            product?.cart?.orderStatus === 'order confirmed' && 
                            <div onClick={() => confirmOrder( product?.cart?.productID, 'order packed')} className="w-100 mt-4 btn btn-info border border-5 text-dark"> 
                                Order packed &nbsp; &nbsp;
                                .....<i class="fa-solid fa-truck-fast">...</i>
                            </div>
                        }

                        {/* if order is shipped click here */}
                        {
                            product?.cart?.orderStatus === 'order packed' && 
                            <div onClick={() => confirmOrder( product?.cart?.productID, 'order shipped')} className="w-100 mt-4 btn btn-info border border-5 text-dark"> 
                                Order shipped &nbsp; &nbsp;
                                .....<i class="fa-solid fa-truck-fast">...</i>
                            </div>
                        }

                        {/* if order is delivered change to delivered */}
                        {
                            product?.cart?.orderStatus === 'order shipped' && 
                            <div onClick={() => confirmOrder( product?.cart?.productID, 'order delivered')} className="w-100 mt-4 btn btn-info border border-5 text-dark"> 
                                Order delivered &nbsp; &nbsp;
                                .....<i class="fa-solid fa-truck-fast">...</i>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </div>
    </div> 
    )
}
