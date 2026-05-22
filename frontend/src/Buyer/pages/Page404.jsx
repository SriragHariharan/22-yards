import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
  return (
    <section className="buyer-not-found buyer-section" aria-labelledby="not-found-title">
      <div className="buyer-container">
        <div className="buyer-not-found__card">
          <div className="buyer-not-found__hero">
            <div className="buyer-not-found__icon" aria-hidden="true">
              <i className="fa-solid fa-compass" />
            </div>
            <p className="buyer-not-found__code">404</p>
          </div>
          <h1 id="not-found-title" className="buyer-not-found__title">Page not found</h1>
          <p className="buyer-not-found__text">
            The page you are looking for does not exist or may have moved. Head back to the store to keep shopping.
          </p>
          <div className="buyer-not-found__actions">
            <Link to="/" className="buyer-btn buyer-btn--primary">
              Back to homepage
            </Link>
            <Link to="/all-products" className="buyer-btn buyer-btn--outline">
              Browse products
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
