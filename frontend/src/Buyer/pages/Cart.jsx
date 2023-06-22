import React, { useState } from 'react'
import CartItemsCard from '../components/cart/CartItemsCard'
import { useSelector } from 'react-redux';
import EmptyCart from '../components/cart/EmptyCart';
import { Link } from 'react-router-dom';

export default function Cart() {
    const cart = useSelector(state => state.cart.cart);  //here we get the cart items in this variable
    const [billAmount, setBillAmount] = useState(null)
  return (

    <>
        {cart.length === 0 && <EmptyCart/> }
        {
            cart.length !== 0 && (
            <section className="bg-light my-5">
            <div className="container">
                <div className="row">

                <div className="col-lg-9">
                    <div className="card border shadow-0">
                    <div className="m-4">
                        <h4 className="card-title mb-4">Your shopping cart</h4>
                        <hr className='mb-4' />
                        {
                            cart.map(item => (<CartItemsCard key={item.productID} item={item} setBillAmount={setBillAmount} />))
                        }
                            

                    </div>

                    <div className=" mt-5 pt-4 mx-4 mb-4">
                        <p><i className="fas fa-truck text-muted fa-lg"></i> Free Delivery within a week</p>
                        <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip
                        </p>
                    </div>
                    </div>
                </div>

                <div className="col-lg-3">
                    <div className="card mb-3 border shadow-0">
                    <div className="card-body">
                        <form>
                        <div className="form-group">
                            <label className="form-label">Have coupon?</label>
                            <div className="input-group">
                            <input type="text" className="form-control border" name="" placeholder="Coupon code" />
                            <button className="btn btn-light border">Apply</button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                    <div className="card shadow-0 border">
                    <div className="card-body">
                        {/* <div className="d-flex justify-content-between">
                        <p className="mb-2">Total price:</p>
                        <p className="mb-2">$329.00</p>
                        </div>
                        <div className="d-flex justify-content-between">
                        <p className="mb-2">Discount:</p>
                        <p className="mb-2 text-success">-$60.00</p>
                        </div>
                        <div className="d-flex justify-content-between">
                        <p className="mb-2">TAX:</p>
                        <p className="mb-2">$14.00</p>
                        </div>
                        <hr /> */}
                        <div className="d-flex justify-content-between">
                        <p className="mb-2">Total price:</p>
                        <p className="mb-2 fw-bold">₹ {billAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        </div>

                        <div className="mt-3">
                        <Link to={'../checkout'} className="btn btn-success w-100 shadow-0 mb-2"> Proceed to checkout </Link>
                        <Link to={'/all-products'} className="btn btn-light w-100 border mt-2"> Back to products page </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
                ) 
        }
    </>

    )
}
