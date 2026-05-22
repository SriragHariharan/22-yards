import React from 'react'
import { Link } from 'react-router-dom'

import image1 from '../../../assets/categories/megalite.jpg'
import image2 from '../../../assets/categories/IMG_7218-copy-1-scaled.jpg'
import image3 from '../../../assets/categories/RP-Lite-2-1-scaled.jpg'
import image4 from '../../../assets/categories/helmet.jpg'
import image5 from '../../../assets/categories/protection.jpg'
import image6 from '../../../assets/categories/shoes.jpg'
import image7 from '../../../assets/categories/ball.jpg'
import image8 from '../../../assets/categories/kit-bag.jpg'
import image9 from '../../../assets/categories/wearable.jpg'
import image10 from '../../../assets/categories/grips.jpg'

const CATEGORIES = [
  { name: 'Cricket Bats', slug: 'cricket-bat', image: image2 },
  { name: 'Leg Guards', slug: 'leg-guard', image: image1 },
  { name: 'Gloves', slug: 'gloves', image: image3 },
  { name: 'Cricket Balls', slug: 'cricket-ball', image: image7 },
  { name: 'Kit Bags', slug: 'kit-bag', image: image8 },
  { name: 'Shoes', slug: 'shoes', image: image6 },
  { name: 'Helmets', slug: 'helmet', image: image4 },
  { name: 'Protection', slug: 'protection', image: image5 },
  { name: 'Wearables', slug: 'wearables', image: image9 },
  { name: 'Accessories', slug: 'accessories', image: image10 },
]

export default function Categories() {
  return (
    <section className="buyer-section" aria-labelledby="categories-heading">
      <div className="buyer-container">
        <header className="buyer-section__header">
          <h2 id="categories-heading" className="buyer-section-title">Shop by Category</h2>
          <p className="buyer-section-subtitle">Find the right gear for every format</p>
        </header>

        <div className="buyer-category-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="buyer-category-card link"
            >
              <img
                className="buyer-category-card__image"
                src={cat.image}
                alt={cat.name}
                loading="lazy"
              />
              <div className="buyer-category-card__overlay" aria-hidden="true" />
              <span className="buyer-category-card__label">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
