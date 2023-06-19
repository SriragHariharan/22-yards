import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BuyerProductInstance from '../axios/BuyerProductInstance';
import { useForm } from "react-hook-form";

export default function Checkout() {

    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1)

    //hook form
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {
        let orderDetails = {}

        orderDetails.fullName = data.fullName;
        orderDetails.email = data.email;
        orderDetails.mobile = data.mobile;
        orderDetails.address = data.address+ ", "+data.city+", "+data.state+", "+"pin:"+data.pincode; 
        orderDetails.landmark = data.landmark;

        orderDetails.paymentSuccess=false;
        orderDetails.deliveryStatus='order placed';
        orderDetails.billAmount = product?.offerPrice * quantity;
        orderDetails.quantity=quantity;
        orderDetails.messageToSeller = data.messageToSeller;

        orderDetails.product = {};
        orderDetails.product._id = product?._id;
        orderDetails.product.productName = product?.productName;
        orderDetails.product.offerPrice = product?.offerPrice
        orderDetails.product.sellerID = product.sellerID
        //console.log(orderDetails);

        BuyerProductInstance.post('create-order', {...orderDetails})
        .then(resp => {
            if(resp.data.success === false){
                setError(resp.data.message)
            }else{
                console.log(resp.data.data);
            }
        }).catch(err => setError(err.message))
    } 

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
            }).catch(err => setError(err.message))
    }, [id])

  return (
    <>
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

                                    {/* form errors */}
                                    {/* {errors.mobile?.type === 'required' && <Error error={'Mobile number required'} /> }
                                    {errors.mobile?.type === 'required' && <Error error={'Full name is required'} /> } */}



                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                        
                                            <div className="col-12 mb-3">
                                                <p className="mb-0">Full name</p>
                                                <div className="form-outline">
                                                    <input value='sriragHari' {...register("fullName", { required: true })} type="text" className="form-control border border-3" />
                                                </div>
                                            {errors.fullName?.type === 'required' && <p className='error'>Fullname required</p>}
                                            </div>

                                            {/* <div className="col-6">
                                                <p className="mb-0">Last name</p>
                                                <div className="form-outline">
                                                <input type="text" className="form-control border border-3" />
                                                </div>
                                            </div> */}

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

                        <div className="d-flex align-items-center mb-4">
                            <div className="me-3 position-relative">
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-dark">
                                    {quantity}
                                </span>
                                <img src={`http://localhost:4000/product-images/${product?._id}-01.jpg`} style={{height: "96px", width: "96x"}} className="img-sm rounded border" />
                            </div>
                            <div>
                                <div>
                                    {product?.productName}
                                </div>
                                <div className="price text-muted mb-3">Price: ₹ {product?.mrp}</div>
                                <span className="btn btn-warning" onClick={() => quantity >1 && setQuantity(quantity - 1)}>-</span>
                                <span>&nbsp; &nbsp; {quantity} &nbsp; &nbsp;</span>
                                <span className="btn btn-success" onClick={() => quantity <5 && setQuantity(quantity + 1)}>+</span>
                            </div>
                        </div>

                        <hr />
                        
                        <h6 className="mb-3">Summary</h6>
                        <div className="d-flex justify-content-between">
                            <p className="mb-2">Total price:</p>
                            <p className="mb-2">₹ {product?.mrp * quantity}.00</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="mb-2">Discount:</p>
                            <p className="mb-2 text-danger">- ₹ {(product?.mrp - product?.offerPrice)*quantity}.00</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping cost:</p>
                            <p className="mb-2 text-success">Free</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <p className="mb-2">Total price:</p>
                            <p className="mb-2 fw-bold">₹ {product?.offerPrice * quantity}.00</p>
                        </div>

                        {/* <div className="input-group mt-3 mb-4">
                            <input type="text" className="form-control border border" name="" placeholder="Promo code" />
                            <button className="btn btn-light text-primary border">Apply</button>
                        </div> */}

                        
                        

                        {/* <div className="d-flex align-items-center mb-4">
                            <div className="me-3 position-relative">
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-dark">
                                1
                            </span>
                            <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp" style={{height: "96px", width: "96x"}} className="img-sm rounded border" />
                            </div>
                            <div className="">
                            <a className="nav-link">
                                Apple Watch Series 4 Space <br />
                                Large size
                            </a>
                            <div className="price text-muted">Total: $217.99</div>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-4">
                            <div className="me-3 position-relative">
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-dark">
                                3
                            </span>
                            <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp" style={{height: "96px", width: "96x"}} className="img-sm rounded border" />
                            </div>
                            <div className="">
                            <a className="nav-link">GoPro HERO6 4K Action Camera - Black</a>
                            <div className="price text-muted">Total: $910.00</div>
                            </div>
                        </div> */}

                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>
  )
}
