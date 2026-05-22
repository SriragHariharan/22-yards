import React, { useEffect, useState } from 'react'
import OrderTimeline from './OrderTimeline'
import useBuyerAuthInstance from '../../axios/useBuyerAuthInstance'
import ReactStars from "react-rating-stars-component";

function formatPrice(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '0'
}

export default function OrderCard({ order, onToast }) {
    const [BuyerAuthInstance] = useBuyerAuthInstance()
    const [rating, setRating] = useState(1);
    const [productReview, setProductReview] = useState('')
    const [reviewPresent, setReviewPresent] = useState(false)

    const addReview = (e) => {
        setProductReview(e.target.value)
    }

    const handleSubmit = () => {
        const data = {
            productID: order?.cart?.productID,
            email: order?.email,
            userName: order?.fullName,
            productRating: rating,
            productReview: productReview,
            purchaseDate: order?.createdAt,
            orderID: order?._id,
        }

        BuyerAuthInstance.post('/add-review', { ...data })
            .then(resp => {
                onToast?.(resp.data.message)
                setReviewPresent(true)
            })
            .catch(err => onToast?.(err.message))
    }

    useEffect(() => {
        BuyerAuthInstance.post('/check-review', {
            email: order?.email,
            orderID: order?._id,
            productID: order?.cart?.productID,
        })
            .then(resp => {
                setReviewPresent(resp.data.success === false)
            })
            .catch(err => onToast?.(err.message))
    }, [order?._id, order?.email, order?.cart?.productID])

    const starRating = {
        size: 22,
        count: 5,
        value: rating,
        color: "var(--buyer-border-strong)",
        activeColor: "var(--buyer-gold)",
        onChange: newValue => setRating(newValue),
    };

    const isDelivered = order?.paymentSuccess && order?.cart?.orderStatus === 'order delivered'

    return (
        <article className="buyer-order-card">
            <div className="buyer-order-card__inner">
                <img
                    src={`${import.meta.env.VITE_SERVER_IMG}/product-images/${order?.cart?.productID}-01.jpg`}
                    alt={order?.cart?.productName}
                    className="buyer-order-card__image"
                />
                <div>
                    <h3 className="buyer-order-card__name">{order?.cart?.productName}</h3>
                    <p className="buyer-order-card__meta">
                        Size: {order?.cart?.size} · Qty: {order?.cart?.quantity}
                    </p>
                    <p className="buyer-order-card__detail">
                        Amount: <strong>₹ {formatPrice(order?.cart?.totalPrice)}</strong>
                    </p>
                    <p className="buyer-order-card__detail">
                        Payment:{' '}
                        {order?.paymentSuccess ? (
                            <span className="buyer-order-card__badge buyer-order-card__badge--success">Completed</span>
                        ) : (
                            <span className="buyer-order-card__badge buyer-order-card__badge--danger">Incomplete / failed</span>
                        )}
                    </p>
                    {order?.paymentSuccess && (
                        <p className="buyer-order-card__detail">
                            <span className="buyer-order-card__status-label">Status: </span>
                            <span className="buyer-order-card__badge buyer-order-card__badge--success">
                                {order?.cart?.orderStatus}
                            </span>
                        </p>
                    )}

                    {order?.paymentSuccess && (
                        <OrderTimeline activeStatus={order?.cart?.orderStatus} />
                    )}

                    {isDelivered && (
                        reviewPresent ? (
                            <p className="buyer-order-card__review-done">
                                <i className="fas fa-check-circle" aria-hidden="true" /> Thank you — your review has been submitted.
                            </p>
                        ) : (
                            <div className="buyer-order-card__review">
                                <p className="buyer-order-card__review-title">Rate this product</p>
                                <ReactStars {...starRating} />
                                <textarea
                                    cols={30}
                                    rows={3}
                                    className="buyer-order-card__textarea"
                                    placeholder="Share your experience…"
                                    onChange={addReview}
                                />
                                <button
                                    type="button"
                                    className="buyer-btn buyer-btn--accent"
                                    onClick={handleSubmit}
                                >
                                    Submit review
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </article>
    )
}
