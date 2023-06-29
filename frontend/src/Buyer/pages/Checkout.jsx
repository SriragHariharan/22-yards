import React, { useEffect, useState } from 'react'
import BuyerProductInstance from '../axios/BuyerProductInstance';
import { useForm } from "react-hook-form";
import Payment from '../components/checkout/Payment';
import CheckoutProductCard from '../components/checkout/CheckoutProductCard';
import { useSelector } from 'react-redux';
import useBuyerAuthInstance from '../axios/useBuyerAuthInstance';
import { Link } from 'react-router-dom';
export default function Checkout() {
    const cart = useSelector(state => state.cart.cart);  //here we get the cart items in this variable
    const billAmount = useSelector(state => state.cart.billAmount)
    const USER = useSelector(state => state.User?.user);

    const [BuyerAuthInstance] = useBuyerAuthInstance()
    const [profile, setProfile] = useState(null);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);
    


    //hook form
    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect(() => {
        BuyerAuthInstance?.get('/profile')
        .then(resp => setProfile(resp.data.data))
        .catch(err => setError(err.message))
    },[])

    const handleProceedToPay = (data) => {
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
                    {
                        profile?.user?.address?.house && (
                            <section className="col-xl-8 col-lg-8 mb-4">
                                <div className="text-center card text-black">
                                    <div className="card-body text-center">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                        className="rounded-circle img-fluid" style={{width: "150px"}} />
                                        <h5 className="my-3">{profile?.user?.fullName}</h5>
                                        <p>{profile?.user?.address?.house},</p>
                                        <p className="">{profile?.user?.address?.city}, {profile?.user?.address?.state},</p>
                                        <p className="">Landmark : {profile?.user?.address?.landmark}.</p>
                                        <p className="">Pincode : {profile?.user?.address?.pincode}.</p>
                                        <p className=""> email : {profile?.user?.email}.</p>
                                        <p className="">mobile : {profile?.user?.address?.mobile}.</p>
                                    </div>  
                                    <div className="float-end mb-5">
                                        <button className="btn btn-danger   border me-3">Cancel</button>
                                        <button onClick={() => handleProceedToPay({fullName:profile?.user?.fullName, mobile:profile?.user?.address?.mobile, email: profile?.user?.email, address:profile?.user?.address?.house, landmark:profile?.user?.address?.landmark, city:profile?.user?.address?.city, pincode:profile?.user?.address?.pincode, state:profile?.user?.address?.state })} 
                                            className="btn btn-success  border me-3">PROCEED TO PAY</button>
                                    </div>                          
                                </div>
                            </section>
                        ) 
                    }
                    {
                        !profile?.user?.address?.house && (
                            <div className="col-xl-8 col-lg-8 mb-4">
                                {
                                    profile?.user?.fullName && 
                                    <div className="card mb-4 border shadow-0">
                                        <div className="p-4 d-flex justify-content-between">
                                            <div className="">
                                                <h5>Hi {profile?.user?.fullName}</h5>
                                                <p className="mb-0 text-wrap ">Add address for a smooth and hassle free delivery</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center flex-column flex-md-row">
                                                <Link to={'/profile'} className="btn btn-outline-primary me-3  w-100">UPDATE PROFILE</Link>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                !profile?.user?.fullName && 
                                <>
                                    <div className="card mb-4 border shadow-0">
                                        <div className="p-4 d-flex justify-content-between">
                                            <div className="">
                                                <h5>Have an account?</h5>
                                                <p className="mb-0 text-wrap ">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center flex-md-row">
                                                <Link to={'/user/login' } className="btn btn-outline-primary me-4  w-100">LOGIN</Link>
                                                <Link to={'/user/signup'} className="btn btn-primary shadow-0 w-100">REGISTER </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card shadow-0 border">
                                        <div className="p-4">
                                            <h5 className="card-title mb-3">Guest checkout</h5>
                                            <p className="mb-4">Just enter basic details and get your order placed. <br /> Signup/Login again with the given email ID and track your orders.</p>
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="row">
                                                    
                                                        <div className="col-12 mb-3">
                                                            <p className="mb-0">Full name</p>
                                                            <div className="form-outline">
                                                                <input {...register("fullName", { required: true })} type="text" className="form-control border border-3" />
                                                            </div>
                                                        {errors.fullName?.type === 'required' && <p className='error'>Fullname required</p>}
                                                        </div>

                                                        <div className="col-6 mb-3">
                                                            <p className="mb-0">Phone</p>
                                                            <div className="form-outline">
                                                            <input {...register("mobile", { required: true, minLength:10, maxLength:10 })} type="tel" className="form-control border border-3" />
                                                            </div>
                                                        {errors.mobile?.type === 'required' && <p className='error'>Mobile required</p>}
                                                        {errors.mobile?.type === ('minLength' || 'maxLength') && <p className='error'>Invalid mobile number</p>}
                                                        </div>

                                                        <div className="col-6 mb-3">
                                                            <p className="mb-0">Email</p>
                                                            <div className="form-outline">
                                                                <input {...register("email", { required: true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} type="email" className="form-control border border-3" />
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
                                                                <input {...register("address", { required: true })} type="text" className="form-control border border-3" />
                                                            </div>
                                                            {errors.address?.type === 'required' && <p className='error'>address required</p>}
                                                        </div>

                                                        <div className="col-sm-4 mb-3">
                                                            <p className="mb-0">Landmark</p>
                                                            <div className="form-outline">
                                                                <input {...register("landmark", { required: true })} type="text" id="typeText" className="form-control border border-3" />
                                                            </div>
                                                            {errors.landmark?.type === 'required' && <p className='error'>landmark required</p>}
                                                        </div>

                                                        <div className="col-sm-4 mb-3">
                                                            <p className="mb-0">City</p>
                                                            <div className="form-outline">
                                                                <input {...register("city", { required: true })} type="text" id="typeText" className="form-control border border-3" />
                                                            </div>
                                                            {errors.city    ?.type === 'required' && <p className='error'>city   required</p>}
                                                        </div>

                                                        <div className="col-sm-4 col-6 mb-3">
                                                            <p className="mb-0">Postal code</p>
                                                            <div className="form-outline">
                                                                <input {...register("pincode", { required: true, maxLength:10 })} type="text" id="typeText" className="form-control border border-3" />
                                                            </div>
                                                            {errors.pincode?.type === 'required' && <p className='error'>pincode required</p>}
                                                            {errors.pincode?.type === 'maxLength' && <p className='error'>pincode invalid</p>}
                                                        </div>

                                                        <div className="col-sm-4 col-6 mb-3">
                                                            <p className="mb-0">State</p>
                                                            <div className="form-outline">
                                                                <input {...register("state", { required: true })} type="text" id="typeText" className="form-control border border-3" />
                                                            </div>
                                                            {errors.state?.type === 'required' && <p className='error'>state required</p>}
                                                        </div>

                                                    </div>

                                                    <div className="float-end">
                                                        <button className="btn btn-danger border me-3">Cancel</button>
                                                        <input className="btn btn-success border me-3" type="submit" value="Proceed"/>
                                                    </div>
                                                
                                                </form>
                                        </div>
                                    </div>
                                </>
                                }
                    </div>
                        )
                    }
                    


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
