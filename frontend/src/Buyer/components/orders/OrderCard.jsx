import React from 'react'
import OrderPlaced from './order-status/OrderPlaced'
import OrderConfirmed from './order-status/OrderConfirmed'
import OrderPacked from './order-status/OrderPacked'
import OrderShipped from './order-status/OrderShipped'
import OrderDelivered from './order-status/OrderDelivered'

export default function OrderCard({order}) {
  return (
    <div>
        <div class="row justify-content-center mb-3">
            <div class="col-md-10 col-xl-9">
                <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                    <div class="row">
                    <div class="col-md-6 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                        <div class="bg-image hover-zoom ripple rounded ripple-surface">
                        <img src={`http://localhost:4000/product-images/${order?.cart?.productID}-01.jpg`}
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

                    </div>
                </div>
                </div>
            </div>
    </div>
    </div>
  )
}
