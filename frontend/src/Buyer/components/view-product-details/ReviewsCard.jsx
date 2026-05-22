import React from 'react'
import ReactStars from "react-rating-stars-component";

export default function ReviewsCard({ review }) {
    const ratingStars = {
        size: 22,
        value: review.productRating,
        edit: false,
    };

    let date = new Date(review.purchaseDate)
    date = date.toLocaleString('en-GB', { month: 'long', year: 'numeric' })

    return (
        <article className="buyer-review-card">
            <ReactStars {...ratingStars} />
            <p className="buyer-review-card__text">{review.productReview}</p>
            <p className="buyer-review-card__author">{review.userName}</p>
            <p className="buyer-review-card__meta">Verified purchase · {date}</p>
        </article>
    )
}
