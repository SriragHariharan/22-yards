import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import BuyerProductInstance from '../../axios/BuyerProductInstance';
import StarComponent from '../view-product-details/StarComponent';

function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ''
}

function stockLabel(stock) {
    if (stock < 1) return { text: 'Out of stock', className: 'buyer-product-list__stock--out' }
    if (stock <= 3) return { text: `Only ${stock} left`, className: 'buyer-product-list__stock--low' }
    return { text: `${stock} in stock`, className: 'buyer-product-list__stock--ok' }
}

export default function ListView({ productName, description, mrp, offerPrice, stock, productID }) {
    const [reviews, setReviews] = useState(null)

    const offerPrice1 = numberWithCommas(offerPrice)
    const mrp1 = numberWithCommas(mrp)
    const discount = Math.floor(((mrp - offerPrice) / offerPrice) * 100)
    const stockInfo = stockLabel(stock)

    useEffect(() => {
        BuyerProductInstance.post('/reviews/', { productID })
            .then(resp => setReviews(resp.data.data.reviews))
            .catch(() => {})
    }, [productID])

    const avgRating = useMemo(() => {
        if (!reviews?.length) return [0, 0]
        const total = reviews.reduce((acc, item) => acc + item.productRating, 0)
        return [Number(Math.ceil(total / reviews.length)), reviews.length]
    }, [reviews])

    return (
        <div className="buyer-product-list">
            <Link to={`/view-product/${productID}`} className="buyer-product-list__link">
                <article className="buyer-product-list__card">
                    <div className="buyer-product-list__image-wrap">
                        <img
                            src={`${import.meta.env.VITE_SERVER_IMG}/product-images/${productID}-01.jpg`}
                            alt={productName}
                            className="buyer-product-list__image"
                            loading="lazy"
                        />
                    </div>

                    <div className="buyer-product-list__body">
                        <h3 className="buyer-product-list__name">{productName}</h3>
                        <div className="buyer-product-list__meta">
                            {avgRating[1] === 0 ? (
                                <span className="buyer-product-list__stock" style={{ color: 'var(--buyer-text-muted)' }}>
                                    No reviews yet
                                </span>
                            ) : (
                                <StarComponent rating={avgRating[0]} count={avgRating[1]} />
                            )}
                            <span className={`buyer-product-list__stock ${stockInfo.className}`}>
                                {stockInfo.text}
                            </span>
                        </div>
                        <p className="buyer-product-list__desc">
                            {description?.slice(0, 120)}{description?.length > 120 ? '…' : ''}
                        </p>
                    </div>

                    <div className="buyer-product-list__price-col">
                        <p className="buyer-product-list__price">₹ {offerPrice1}</p>
                        <span className="buyer-product-list__mrp">₹ {mrp1}</span>
                        {discount > 0 && (
                            <span className="buyer-product-list__off">{discount}% off</span>
                        )}
                        <p className="buyer-product-list__shipping">Free shipping</p>
                    </div>
                </article>
            </Link>
        </div>
    )
}
