import React from 'react'

const TRUST_ITEMS = [
  { icon: 'fa-certificate', title: '100% Authentic', desc: 'Official gear from top brands' },
  { icon: 'fa-truck-fast', title: 'Free Delivery', desc: 'On orders above ₹999' },
  { icon: 'fa-rotate-left', title: 'Easy Returns', desc: '14-day hassle-free returns' },
  { icon: 'fa-headset', title: 'Expert Support', desc: 'Cricket specialists on call' },
]

export default function Features() {
  return (
    <section className="buyer-section buyer-section--muted" aria-label="Why shop with us">
      <div className="buyer-container">
        <div className="buyer-trust-grid">
          {TRUST_ITEMS.map((item) => (
            <article key={item.title} className="buyer-trust-item">
              <div className="buyer-trust-item__icon" aria-hidden="true">
                <i className={`fa ${item.icon}`} />
              </div>
              <div>
                <h3 className="buyer-trust-item__title">{item.title}</h3>
                <p className="buyer-trust-item__desc">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
