import React from 'react'
import { Link } from 'react-router-dom'

const PRODUCT_LINKS = [
  { label: 'Cricket Bats', to: '/category/cricket-bat' },
  { label: 'Leg Guards', to: '/category/leg-guard' },
  { label: 'Gloves', to: '/category/gloves' },
  { label: 'Wearables', to: '/category/wearables' },
]

const USEFUL_LINKS = [
  { label: 'All Products', to: '/all-products' },
  { label: 'FAQ', to: '/faq' },
  { label: 'My Orders', to: '/orders' },
]

function Footer() {
  return (
    <footer className="buyer-footer">
      <div className="buyer-footer__main">
        <div className="buyer-footer__grid">
          <div>
            <p className="buyer-footer__brand-name">
              22 <span>Yards</span>
            </p>
            <p className="buyer-footer__desc">
              India&apos;s trusted destination for premium cricket equipment — bats, pads,
              gloves, and pro-grade kit from the brands you know.
            </p>
          </div>

          <div>
            <h3 className="buyer-footer__heading">Products</h3>
            {PRODUCT_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="buyer-footer__link">
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h3 className="buyer-footer__heading">Quick Links</h3>
            {USEFUL_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="buyer-footer__link">
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h3 className="buyer-footer__heading">Contact</h3>
            <p className="buyer-footer__contact-item">
              <i className="fa fa-location-dot" aria-hidden="true" />
              2/717, Palakkad, KL, India
            </p>
            <p className="buyer-footer__contact-item">
              <i className="fa fa-envelope" aria-hidden="true" />
              <a href="mailto:info@22yards.com">info@22yards.com</a>
            </p>
            <p className="buyer-footer__contact-item">
              <i className="fa fa-phone" aria-hidden="true" />
              <a href="tel:+919876543210">+91 987 654 3210</a>
            </p>
          </div>
        </div>

        <div className="buyer-footer__trust">
          <span className="buyer-footer__trust-item">
            <i className="fa fa-certificate" aria-hidden="true" />
            100% Authentic Gear
          </span>
          <span className="buyer-footer__trust-item">
            <i className="fa fa-truck-fast" aria-hidden="true" />
            Free Shipping over ₹999
          </span>
          <span className="buyer-footer__trust-item">
            <i className="fa fa-rotate-left" aria-hidden="true" />
            14-Day Returns
          </span>
        </div>
      </div>

      <div className="buyer-footer__bottom">
        © {new Date().getFullYear()}{' '}
        <Link to="/">22yards.com</Link> — All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
