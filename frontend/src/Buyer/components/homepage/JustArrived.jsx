import React, { useState, useEffect } from 'react'
import BuyerProductInstance from '../../axios/BuyerProductInstance'
import { Link } from 'react-router-dom'
import { getProductImageUrl } from '../../../utils/productImage'

function ProductSkeleton() {
  return (
    <div className="buyer-skeleton-card">
      <div className="buyer-skeleton-card__image" />
      <div className="buyer-skeleton-card__body">
        <div className="buyer-skeleton-line" />
        <div className="buyer-skeleton-line buyer-skeleton-line--short" />
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  const discount = Math.floor(
    ((product.mrp - product.offerPrice) / product.mrp) * 100
  )

  return (
    <Link to={`/view-product/${product._id}`} className="buyer-product-grid__link">
      <article className="buyer-product-card">
        <div className="buyer-product-card__image-wrap">
          <img
            className="buyer-product-card__image"
            src={getProductImageUrl(product._id)}
            alt={product.productName}
            loading="lazy"
          />
          {discount > 0 && (
            <span className="buyer-product-card__badge">{discount}% OFF</span>
          )}
        </div>
        <div className="buyer-product-card__body">
          <h3 className="buyer-product-card__name">{product.productName}</h3>
          <div className="buyer-product-card__price-row">
            <span className="buyer-product-card__price">₹ {product.offerPrice}</span>
            <span className="buyer-product-card__mrp">₹ {product.mrp}</span>
            {discount > 0 && (
              <span className="buyer-product-card__off">{discount}% off</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function JustArrived() {
  const [products, setProducts] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    BuyerProductInstance.get('sort-by-date/-1')
      .then((resp) => {
        if (resp.data.success === true) {
          setProducts(resp.data.data.products)
        } else {
          setError(resp.data.message)
        }
      })
      .catch((err) => setError(err.message))
  }, [])

  return (
    <section className="buyer-section" aria-labelledby="just-arrived-heading">
      <div className="buyer-container">
        <div className="buyer-section__header-row">
          <header className="buyer-section__header">
            <h2 id="just-arrived-heading" className="buyer-section-title">Just Arrived</h2>
            <p className="buyer-section-subtitle">Fresh stock, straight to your kit bag</p>
          </header>
          <Link to="/all-products" className="buyer-section__view-all">
            View all <i className="fa fa-arrow-right" aria-hidden="true" />
          </Link>
        </div>

        {error && (
          <div className="buyer-empty-state" role="alert">
            <p className="buyer-empty-state__text">{error}</p>
          </div>
        )}

        {!error && (
          <div className="buyer-product-grid">
            {!products
              ? Array.from({ length: 8 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              : products.slice(0, 8).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
        )}
      </div>
    </section>
  )
}
