import React from 'react'
import { Link } from 'react-router-dom'

export default function EmptyCart() {
  return (
    <section className="buyer-cart-empty buyer-section">
      <div className="buyer-cart-empty__icon" aria-hidden="true">
        <i className="fa-solid fa-cart-shopping" />
      </div>
      <h1 className="buyer-cart-empty__title">Your cart is empty</h1>
      <p className="buyer-cart-empty__text">
        Looks like you have not added any gear yet. Browse our collection and build your kit.
      </p>
      <Link to="/all-products" className="buyer-btn buyer-btn--primary">
        Browse products
      </Link>
    </section>
  )
}
