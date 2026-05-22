import React, { useEffect, useState } from 'react'
import BuyerProductInstance from '../axios/BuyerProductInstance';
import { useForm } from "react-hook-form";
import Payment from '../components/checkout/Payment';
import CheckoutProductCard from '../components/checkout/CheckoutProductCard';
import { useSelector } from 'react-redux';
import useBuyerAuthInstance from '../axios/useBuyerAuthInstance';
import { Link } from 'react-router-dom';

function getInitials(name) {
    if (!name) return '?'
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    return name.slice(0, 2).toUpperCase()
}

function formatBill(amount) {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '0'
}

const addressPayload = (user) => ({
    fullName: user?.fullName,
    mobile: user?.address?.mobile,
    email: user?.email,
    address: user?.address?.house,
    landmark: user?.address?.landmark,
    city: user?.address?.city,
    pincode: user?.address?.pincode,
    state: user?.address?.state,
})

export default function Checkout() {
    const cart = useSelector(state => state.cart.cart);
    const billAmount = useSelector(state => state.cart.billAmount)

    const [BuyerAuthInstance] = useBuyerAuthInstance()
    const [profile, setProfile] = useState(null);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect(() => {
        BuyerAuthInstance?.get('/profile')
            .then(resp => setProfile(resp.data.data))
            .catch(err => setError(err.message))
    }, [])

    const submitOrder = (data) => {
        data.totalBillAmount = billAmount
        data.paymentSuccess = false
        data.cart = cart

        BuyerProductInstance.post('create-order', { ...data })
            .then(resp => {
                if (resp.data.success === false) {
                    setError(resp.data.message)
                } else {
                    setOrder(resp.data.data.savedNewOrder);
                }
            })
            .catch(err => setError(err.message))
    }

    const handleProceedToPay = () => {
        submitOrder(addressPayload(profile?.user))
    }

    const onSubmit = (data) => submitOrder(data)

    const user = profile?.user
    const hasSavedAddress = Boolean(user?.address?.house)

    if (cart.length === 0) {
        return (
            <section className="buyer-checkout buyer-section">
                <div className="buyer-container buyer-checkout__empty">
                    <div className="buyer-checkout__empty-icon" aria-hidden="true">
                        <i className="fa-solid fa-bag-shopping" />
                    </div>
                    <h1 className="buyer-section-title">Nothing to checkout</h1>
                    <p className="buyer-section-subtitle">Your cart is empty. Add items before checkout.</p>
                    <Link to="/cart" className="buyer-btn buyer-btn--primary">View cart</Link>
                </div>
            </section>
        )
    }

    return (
        <>
            <section className="buyer-checkout buyer-section">
                <div className="buyer-container">
                    <header className="buyer-section__header">
                        <h1 className="buyer-section-title">Checkout</h1>
                        <p className="buyer-section-subtitle">Review your order and delivery details</p>
                    </header>

                    {error && (
                        <div className="buyer-empty-state mb-4">
                            <p className="buyer-empty-state__text text-danger">{error}</p>
                        </div>
                    )}

                    <div className="buyer-checkout__layout">
                        <div className="buyer-checkout__main">
                            {hasSavedAddress && (
                                <div className="buyer-checkout__card">
                                    <h2 className="buyer-checkout__card-title">Delivery address</h2>
                                    <div className="buyer-checkout__address-header">
                                        <div className="buyer-checkout__avatar" aria-hidden="true">
                                            {getInitials(user?.fullName)}
                                        </div>
                                        <div>
                                            <p className="buyer-checkout__address-name">{user?.fullName}</p>
                                            <p className="buyer-checkout__address-lines">
                                                {user?.address?.house}, {user?.address?.city}, {user?.address?.state}
                                                <br />
                                                Landmark: {user?.address?.landmark} · Pincode: {user?.address?.pincode}
                                                <br />
                                                {user?.email} · {user?.address?.mobile}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="buyer-checkout__actions">
                                        <Link to="/cart" className="buyer-btn buyer-btn--outline">Back to cart</Link>
                                        <button
                                            type="button"
                                            onClick={handleProceedToPay}
                                            className="buyer-btn buyer-btn--accent"
                                        >
                                            Proceed to pay
                                        </button>
                                    </div>
                                </div>
                            )}

                            {!hasSavedAddress && (
                                <>
                                    {user?.fullName && (
                                        <div className="buyer-checkout__card">
                                            <h2 className="buyer-checkout__card-title">Hi, {user.fullName}</h2>
                                            <p className="buyer-checkout__prompt-text">
                                                Add a delivery address in your profile for a smooth checkout experience.
                                            </p>
                                            <div className="buyer-checkout__prompt-actions">
                                                <Link to="/profile" className="buyer-btn buyer-btn--primary">
                                                    Update profile
                                                </Link>
                                                <Link to="/cart" className="buyer-btn buyer-btn--outline">Back to cart</Link>
                                            </div>
                                        </div>
                                    )}

                                    {!user?.fullName && (
                                        <>
                                            <div className="buyer-checkout__card">
                                                <h2 className="buyer-checkout__card-title">Have an account?</h2>
                                                <p className="buyer-checkout__prompt-text">
                                                    Sign in to use saved details, or continue as a guest below.
                                                </p>
                                                <div className="buyer-checkout__prompt-actions">
                                                    <Link to="/user/login" className="buyer-btn buyer-btn--outline">Sign in</Link>
                                                    <Link to="/user/signup" className="buyer-btn buyer-btn--primary">Register</Link>
                                                </div>
                                            </div>

                                            <div className="buyer-checkout__card">
                                                <h2 className="buyer-checkout__card-title">Guest checkout</h2>
                                                <p className="buyer-checkout__prompt-text">
                                                    Enter your details to place the order. You can sign up later with the same email to track orders.
                                                </p>
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="buyer-checkout__form-grid">
                                                        <div className="buyer-checkout__field buyer-checkout__field--full">
                                                            <label className="buyer-checkout__label">Full name</label>
                                                            <input {...register("fullName", { required: true })} type="text" className="buyer-checkout__input" />
                                                            {errors.fullName?.type === 'required' && <p className="buyer-checkout__error">Full name is required</p>}
                                                        </div>

                                                        <div className="buyer-checkout__field">
                                                            <label className="buyer-checkout__label">Phone</label>
                                                            <input {...register("mobile", { required: true, minLength: 10, maxLength: 10 })} type="tel" className="buyer-checkout__input" />
                                                            {errors.mobile && <p className="buyer-checkout__error">Valid 10-digit mobile required</p>}
                                                        </div>

                                                        <div className="buyer-checkout__field">
                                                            <label className="buyer-checkout__label">Email</label>
                                                            <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} type="email" className="buyer-checkout__input" />
                                                            {errors.email?.type === 'required' && <p className="buyer-checkout__error">Email is required</p>}
                                                            {errors.email?.type === 'pattern' && <p className="buyer-checkout__error">Invalid email</p>}
                                                        </div>

                                                        <div className="buyer-checkout__field buyer-checkout__field--full">
                                                            <label className="buyer-checkout__label">Address</label>
                                                            <input {...register("address", { required: true })} type="text" className="buyer-checkout__input" />
                                                            {errors.address && <p className="buyer-checkout__error">Address is required</p>}
                                                        </div>

                                                        <div className="buyer-checkout__field">
                                                            <label className="buyer-checkout__label">Landmark</label>
                                                            <input {...register("landmark", { required: true })} type="text" className="buyer-checkout__input" />
                                                            {errors.landmark && <p className="buyer-checkout__error">Landmark is required</p>}
                                                        </div>

                                                        <div className="buyer-checkout__field">
                                                            <label className="buyer-checkout__label">City</label>
                                                            <input {...register("city", { required: true })} type="text" className="buyer-checkout__input" />
                                                            {errors.city && <p className="buyer-checkout__error">City is required</p>}
                                                        </div>

                                                        <div className="buyer-checkout__field">
                                                            <label className="buyer-checkout__label">Postal code</label>
                                                            <input {...register("pincode", { required: true, maxLength: 10 })} type="text" className="buyer-checkout__input" />
                                                            {errors.pincode && <p className="buyer-checkout__error">Pincode is required</p>}
                                                        </div>

                                                        <div className="buyer-checkout__field">
                                                            <label className="buyer-checkout__label">State</label>
                                                            <input {...register("state", { required: true })} type="text" className="buyer-checkout__input" />
                                                            {errors.state && <p className="buyer-checkout__error">State is required</p>}
                                                        </div>
                                                    </div>

                                                    <div className="buyer-checkout__actions">
                                                        <Link to="/cart" className="buyer-btn buyer-btn--outline">Back to cart</Link>
                                                        <button type="submit" className="buyer-btn buyer-btn--accent">Proceed to pay</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>

                        <aside className="buyer-checkout__summary">
                            <h3 className="buyer-checkout__summary-title">Order summary</h3>
                            {cart.map(item => (
                                <CheckoutProductCard key={item.productID} item={item} />
                            ))}
                            <div className="buyer-checkout__total-row">
                                <span>Subtotal</span>
                                <span>₹ {formatBill(billAmount)}</span>
                            </div>
                            <div className="buyer-checkout__total-row">
                                <span>Shipping</span>
                                <span className="text-success">Free</span>
                            </div>
                            <div className="buyer-checkout__total-row buyer-checkout__total-row--final">
                                <span>Total</span>
                                <span className="buyer-checkout__total-value">₹ {formatBill(billAmount)}</span>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {order && <Payment order={order} autoFocus={true} />}
        </>
    )
}
