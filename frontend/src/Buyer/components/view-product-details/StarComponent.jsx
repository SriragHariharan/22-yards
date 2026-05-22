import React from 'react'

export default function StarComponent({ rating, count }) {
    const safeRating = Number.isFinite(rating) && rating > 0 ? Math.min(5, Math.max(1, Math.round(rating))) : 0

    return (
        <span className="buyer-stars" aria-label={safeRating ? `${safeRating} out of 5 stars` : 'No rating'}>
            {[1, 2, 3, 4, 5].map(star => (
                <i
                    key={star}
                    className={`fa fa-star buyer-stars__icon--${star <= safeRating ? 'filled' : 'empty'}`}
                    aria-hidden="true"
                />
            ))}
            {count > 0 && (
                <span className="buyer-stars__count">({count} reviews)</span>
            )}
        </span>
    )
}
