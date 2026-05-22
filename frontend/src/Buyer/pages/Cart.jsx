import React, { useState, useCallback } from 'react'
import CartItemsCard from '../components/cart/CartItemsCard'
import { useSelector } from 'react-redux';
import EmptyCart from '../components/cart/EmptyCart';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function formatBill(amount) {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '0'
}

export default function Cart() {
    const cart = useSelector(state => state.cart.cart);
    const [billAmount, setBillAmount] = useState(0)

    const handleItemRemoved = useCallback(() => {
        toast('Product removed from cart', {
            position: toast.POSITION.TOP_CENTER
        });
    }, [])

    if (cart.length === 0) {
        return <EmptyCart />
    }

    return (
        <section className="buyer-cart buyer-section">
            <ToastContainer />
            <div className="buyer-container">
                <header className="buyer-section__header">
                    <h1 className="buyer-section-title">Your Cart</h1>
                    <p className="buyer-section-subtitle">
                        {cart.length} {cart.length === 1 ? 'item' : 'items'} in your kit bag
                    </p>
                </header>

                <div className="buyer-cart__layout">
                    <div className="buyer-cart__items-card">
                        <h2 className="buyer-cart__items-title">Shopping cart</h2>
                        {cart.map(item => (
                            <CartItemsCard
                                key={item.productID}
                                item={item}
                                setBillAmount={setBillAmount}
                                onRemove={handleItemRemoved}
                            />
                        ))}

                        <div className="buyer-cart__delivery">
                            <p className="buyer-cart__delivery-title">
                                <i className="fas fa-truck" aria-hidden="true" />
                                Free delivery
                            </p>
                            <p>
                                Orders are typically delivered within 5–7 business days across India.
                                Track your order from your profile after checkout.
                            </p>
                        </div>
                    </div>

                    <aside className="buyer-cart__summary">
                        <div className="buyer-cart__coupon-card">
                            <label className="buyer-cart__coupon-label" htmlFor="coupon-code">
                                Have a coupon?
                            </label>
                            <div className="buyer-cart__coupon-row">
                                <input
                                    id="coupon-code"
                                    type="text"
                                    className="buyer-cart__coupon-input"
                                    placeholder="Coupon code"
                                />
                                <button type="button" className="buyer-cart__coupon-btn">
                                    Apply
                                </button>
                            </div>
                        </div>

                        <div className="buyer-cart__total-card">
                            <div className="buyer-cart__total-row">
                                <p className="buyer-cart__total-label">Total</p>
                                <p className="buyer-cart__total-value">₹ {formatBill(billAmount)}</p>
                            </div>
                            <div className="buyer-cart__actions">
                                <Link to="/checkout" className="buyer-btn buyer-btn--accent">
                                    Proceed to checkout
                                </Link>
                                <Link to="/all-products" className="buyer-btn buyer-btn--outline">
                                    Continue shopping
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    )
}
