import React from 'react'
import { BRANDS } from './brandsData'

function Brands() {
  return (
    <section className="buyer-section buyer-section--muted" aria-labelledby="brands-heading">
      <div className="buyer-container">
        <header className="buyer-section__header">
          <h2 id="brands-heading" className="buyer-section-title">Trusted Brands</h2>
          <p className="buyer-section-subtitle">Gear from the names that define the game</p>
        </header>

        <div className="buyer-brands-grid">
          {BRANDS.map((brand) => (
            <div key={brand.src} className="buyer-brands-grid__item">
              <img
                className="buyer-brands-grid__logo"
                src={brand.src}
                alt={brand.name}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Brands
