import React from 'react'
import { Link } from 'react-router-dom'
import image1 from '../../../assets/offers/offer-img1.png'
import image2 from '../../../assets/offers/offer-img2.png'

const PROMOS = [
  {
    eyebrow: 'Min 20% off on all products',
    title: 'ICC CWC Collection',
    image: image1,
    to: '/all-products',
    align: 'left',
  },
  {
    eyebrow: '10% off all wearables',
    title: 'IPL Collection',
    image: image2,
    to: '/category/wearables',
    align: 'right',
  },
]

export default function Offers() {
  return (
    <section className="buyer-section buyer-section--muted" aria-label="Special offers">
      <div className="buyer-container">
        <div className="buyer-promo-grid">
          {PROMOS.map((promo) => (
            <Link
              key={promo.title}
              to={promo.to}
              className={`buyer-promo buyer-promo--${promo.align}`}
            >
              <img
                className="buyer-promo__bg"
                src={promo.image}
                alt=""
                aria-hidden="true"
              />
              <div className="buyer-promo__overlay" aria-hidden="true" />
              <div className="buyer-promo__content">
                <p className="buyer-promo__eyebrow">{promo.eyebrow}</p>
                <h2 className="buyer-promo__title">{promo.title}</h2>
                <span className="buyer-btn buyer-btn--outline-light">Shop Now</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
