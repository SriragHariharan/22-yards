import React from 'react'
import { Link } from 'react-router-dom'

function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ''
}

export default function SimilarItemsCard({ product }) {
    if (!product || product._id === undefined) return null

    return (
        <Link className="buyer-pdp__similar-item" to={`/view-product/${product._id}`}>
            <img
                src={`${import.meta.env.VITE_SERVER_IMG}/product-images/${product._id}-01.jpg`}
                alt={product.productName}
                className="buyer-pdp__similar-thumb"
                loading="lazy"
            />
            <div>
                <div className="buyer-pdp__similar-name">
                    {product.productName?.length > 40
                        ? `${product.productName.slice(0, 40)}…`
                        : product.productName}
                </div>
                <span className="buyer-pdp__similar-price">₹ {numberWithCommas(product.offerPrice)}</span>
                <span className="buyer-pdp__similar-mrp">₹ {numberWithCommas(product.mrp)}</span>
                {product.size && (
                    <div className="buyer-pdp__similar-size">Size: {product.size}</div>
                )}
            </div>
        </Link>
    )
}
