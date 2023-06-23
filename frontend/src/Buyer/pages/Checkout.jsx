import React, { useEffect, useState } from 'react'
import BuyerProductInstance from '../axios/BuyerProductInstance';
import { useForm } from "react-hook-form";
import Payment from '../components/checkout/Payment';
import CheckoutProductCard from '../components/checkout/CheckoutProductCard';
import { useSelector } from 'react-redux';

export default function Checkout() {
    const cart = useSelector(state => state.cart.cart);  //here we get the cart items in this variable
    const billAmount = useSelector(state => state.cart.billAmount)

    //hook form
    const { register, formState: { errors }, handleSubmit } = useForm();
    
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    const onSubmit = (data) => {
        data.totalBillAmount = billAmount
        data.paymentSuccess=false;
        data.cart = cart;        
        
        BuyerProductInstance.post('create-order', {...data})
        .then(resp => {
            if(resp.data.success === false){
                setError(resp.data.message)
            }else{
                setOrder(resp.data.data.savedNewOrder);
            }
        })        
        .catch(err => setError(err.message))
    }
    


  return (
    <>
    {
        cart.length === 0 && <div className='h1 text-center m-5 p-5 text-danger'>Nothing to checkout</div>
    }
    {
        cart.length !== 0 && (
            <section className="bg-light py-5">
            <div className="container">
                <div className="row">

                    <div className="col-xl-8 col-lg-8 mb-4">
                        <div className="card mb-4 border shadow-0">
                            <div className="p-4 d-flex justify-content-between">
                                <div className="">
                                    <h5>Have an account?</h5>
                                    <p className="mb-0 text-wrap ">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center flex-column flex-md-row">
                                    <a className="btn btn-outline-primary me-0 me-md-2 mb-2 mb-md-0 w-100">Register</a>
                                    <a className="btn btn-primary shadow-0 text-nowrap w-100">Sign in</a>
                                </div>
                            </div>
                        </div>


                        <div className="card shadow-0 border">
                            <div className="p-4">
                                <h5 className="card-title mb-3">Guest checkout</h5>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                        
                                            <div className="col-12 mb-3">
                                                <p className="mb-0">Full name</p>
                                                <div className="form-outline">
                                                    <input value='sriragHari' {...register("fullName", { required: true })} type="text" className="form-control border border-3" />
                                                </div>
                                            {errors.fullName?.type === 'required' && <p className='error'>Fullname required</p>}
                                            </div>

                                            <div className="col-6 mb-3">
                                                <p className="mb-0">Phone</p>
                                                <div className="form-outline">
                                                <input value='9876543210' {...register("mobile", { required: true, minLength:10, maxLength:10 })} type="tel" className="form-control border border-3" />
                                                </div>
                                            {errors.mobile?.type === 'required' && <p className='error'>Mobile required</p>}
                                            {errors.mobile?.type === ('minLength' || 'maxLength') && <p className='error'>Invalid mobile number</p>}
                                            </div>

                                            <div className="col-6 mb-3">
                                                <p className="mb-0">Email</p>
                                                <div className="form-outline">
                                                    <input value='sri@tez.co' {...register("email", { required: true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} type="email" className="form-control border border-3" />
                                                </div>
                                            {errors.email?.type === 'required' && <p className='error'>email required</p>}
                                            {errors.email?.type === 'pattern' && <p className='error'>invalid email</p>}
                                            </div>

                                        </div>

                                        <hr className="my-4 mb-5" />

                                        <div className="row">

                                            <div className="col-sm-8 mb-3">
                                                <p className="mb-0">Address</p>
                                                <div className="form-outline">
                                                    <input value='srira Vila' {...register("address", { required: true })} type="text" className="form-control border border-3" />
                                                </div>
                                                {errors.address?.type === 'required' && <p className='error'>address required</p>}
                                            </div>

                                            <div className="col-sm-4 mb-3">
                                                <p className="mb-0">Landmark</p>
                                                <div className="form-outline">
                                                    <input value='Puliyal BT' {...register("landmark", { required: true })} type="text" id="typeText" className="form-control border border-3" />
                                                </div>
                                                {errors.landmark?.type === 'required' && <p className='error'>landmark required</p>}
                                            </div>

                                            <div className="col-sm-4 mb-3">
                                                <p className="mb-0">City</p>
                                                <div className="form-outline">
                                                    <input value='palakkad12' {...register("city", { required: true })} type="text" id="typeText" className="form-control border border-3" />
                                                </div>
                                                {errors.city    ?.type === 'required' && <p className='error'>city   required</p>}
                                            </div>

                                            <div className="col-sm-4 col-6 mb-3">
                                                <p className="mb-0">Postal code</p>
                                                <div className="form-outline">
                                                    <input value='678551abcd' {...register("pincode", { required: true, maxLength:10 })} type="text" id="typeText" className="form-control border border-3" />
                                                </div>
                                                {errors.pincode?.type === 'required' && <p className='error'>pincode required</p>}
                                                {errors.pincode?.type === 'maxLength' && <p className='error'>pincode invalid</p>}
                                            </div>

                                            <div className="col-sm-4 col-6 mb-3">
                                                <p className="mb-0">State</p>
                                                <div className="form-outline">
                                                    <input value='keralam123' {...register("state", { required: true })} type="text" id="typeText" className="form-control border border-3" />
                                                </div>
                                                {errors.state?.type === 'required' && <p className='error'>state required</p>}
                                            </div>

                                        </div>

                                        <div className="mb-3">
                                            <p className="mb-0">Message to seller</p>
                                            <div className="form-outline">
                                                <textarea {...register("messageToSeller")} className="form-control border border-3" rows="3"></textarea>
                                            </div>
                                        </div>

                                        <div className="float-end">
                                            <button className="btn btn-danger border me-3">Cancel</button>
                                            <input className="btn btn-success border me-3" type="submit" value="Proceed"/>
                                        </div>
                                    
                                    </form>
                            </div>
                        </div>
                    </div>


                    <div className="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
                        <div className="ms-lg-4 mt-4 mt-lg-0" style={{maxWidth: "320px"}}>
                        
                        <h6 className="text-dark my-4">Items in cart</h6>



                        <hr />

                        {
                            cart.map(item => <CheckoutProductCard key={item.productID} item ={item} /> )
                        }
                        
                        <h6 className="mb-3">Summary</h6>
                        <div className="d-flex justify-content-between">
                            <p className="mb-2">Total price:</p>
                            <p className="mb-2">₹ {billAmount}.00</p>
                        </div>
                        
                        <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping cost:</p>
                            <p className="mb-2 text-success">Free</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <p className="mb-2">Total price:</p>
                            <p className="mb-2 fw-bold">₹ {billAmount}.00</p>
                        </div>

                        {/* <div className="input-group mt-3 mb-4">
                            <input type="text" className="form-control border border" name="" placeholder="Promo code" />
                            <button className="btn btn-light text-primary border">Apply</button>
                        </div> */}

                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }
        

        {
            order && (<Payment order={order} autoFocus={true} />)
        }

    </>
  )
}
