import React from 'react'
import { Link } from 'react-router-dom'
import bannerImage from '../../../assets/Banner.jpg'

function Banner() {
  return (
    <section
      className="buyer-hero"
      style={{ backgroundImage: `url(${bannerImage})` }}
      aria-label="Hero"
    >
      <div className="buyer-hero__overlay" aria-hidden="true" />
      <div className="buyer-hero__inner">
        <span className="buyer-hero__eyebrow">India&apos;s Premier Cricket Store</span>
        <h1 className="buyer-hero__title">Believe. Become.</h1>
        <p className="buyer-hero__subtitle">
          Pro-grade bats, pads, gloves, and kit from the brands you trust — at prices that keep you on the pitch.
        </p>
        <div className="buyer-hero__actions">
          <Link to="/category/cricket-bat" className="buyer-btn buyer-btn--accent">
            Shop Bats
          </Link>
          <Link to="/all-products" className="buyer-btn buyer-btn--outline-light">
            Explore All Gear
          </Link>
        </div>
        <div className="buyer-hero__stats">
          <span className="buyer-hero__stat">500+ Products</span>
          <span className="buyer-hero__stat-dot" aria-hidden="true" />
          <span className="buyer-hero__stat">15+ Brands</span>
          <span className="buyer-hero__stat-dot" aria-hidden="true" />
          <span className="buyer-hero__stat">Free Shipping</span>
        </div>
      </div>
    </section>
  )
}

export default Banner
