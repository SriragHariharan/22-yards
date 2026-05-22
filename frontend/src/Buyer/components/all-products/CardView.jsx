import React from 'react'
import { Link } from 'react-router-dom'

function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ''
}

export default function CardView({ productName, mrp, offerPrice, stock, productID }) {
    const discount = Math.floor(((mrp - offerPrice) / mrp) * 100)

    return (
        <Link to={`/view-product/${productID}`} className="buyer-product-grid__link">
            <article className="buyer-product-card">
                <div className="buyer-product-card__image-wrap">
                    <img
                        className="buyer-product-card__image"
                        src={`${import.meta.env.VITE_SERVER_IMG}/product-images/${productID}-01.jpg`}
                        alt={productName}
                        loading="lazy"
                    />
                    {discount > 0 && (
                        <span className="buyer-product-card__badge">{discount}% OFF</span>
                    )}
                    {stock < 1 && (
                        <span className="buyer-product-card__badge" style={{ background: 'var(--buyer-danger)', color: '#fff' }}>
                            Out of stock
                        </span>
                    )}
                </div>
                <div className="buyer-product-card__body">
                    <h3 className="buyer-product-card__name">{productName}</h3>
                    <div className="buyer-product-card__price-row">
                        <span className="buyer-product-card__price">₹ {numberWithCommas(offerPrice)}</span>
                        <span className="buyer-product-card__mrp">₹ {numberWithCommas(mrp)}</span>
                        {discount > 0 && (
                            <span className="buyer-product-card__off">{discount}% off</span>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    )
}
