import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LOGO_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-196UvngLppQ7fGE1-TQfG75ZKli2l6IdAkNCgK83g&s'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'All Products', to: '/all-products' },
  { label: 'FAQ', to: '/faq' },
]

const PRODUCT_CATEGORIES = [
  { name: 'Cricket Bats', slug: 'cricket-bat' },
  { name: 'Leg Guards', slug: 'leg-guard' },
  { name: 'Gloves', slug: 'gloves' },
  { name: 'Cricket Balls', slug: 'cricket-ball' },
  { name: 'Kit Bags', slug: 'kit-bag' },
  { name: 'Shoes', slug: 'shoes' },
  { name: 'Helmets', slug: 'helmet' },
  { name: 'Protection', slug: 'protection' },
  { name: 'Wearables', slug: 'wearables' },
  { name: 'Accessories', slug: 'accessories' },
]

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const cart = useSelector((state) => state.cart.cart)
  const user = useSelector((state) => state.User.user)
  const location = useLocation()
  const cartCount = cart?.length ?? 0

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const navLinkClass = (path) =>
    `buyer-header__nav-link${isActive(path) ? ' buyer-header__nav-link--active' : ''}`

  return (
    <header className="buyer-header">
      <div className="buyer-header__top">
        <div className="buyer-header__top-inner">
          <Link to="/" className="buyer-header__brand">
            <img
              src={LOGO_URL}
              alt="22 Yards"
              className="buyer-header__logo-img"
            />
            <span className="buyer-header__brand-text">
              <span className="buyer-header__brand-name">22 Yards</span>
              <span className="buyer-header__brand-sub">Premium Cricket Gear</span>
            </span>
          </Link>

          <div className="buyer-header__actions">
            <Link to="/search" className="buyer-header__action" aria-label="Search">
              <i className="fa fa-search" aria-hidden="true" />
            </Link>

            <Link
              to={user ? '/profile' : '/user/login'}
              className="buyer-header__action"
            >
              <i className="fa fa-user" aria-hidden="true" />
              <span>{user ? 'Account' : 'Sign in'}</span>
            </Link>

            <Link to="/cart" className="buyer-header__action buyer-header__action--cart">
              <i className="fa fa-shopping-cart" aria-hidden="true" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="buyer-header__cart-badge">{cartCount}</span>
              )}
            </Link>

            <button
              type="button"
              className="buyer-header__mobile-toggle"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <i className={`fa ${mobileOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <nav className="buyer-header__nav" aria-label="Main navigation">
        <div className="buyer-header__nav-inner">
          <div className="buyer-header__nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={navLinkClass(link.to)}
              >
                {link.label}
              </Link>
            ))}

            <div
              className="buyer-header__dropdown"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                className={`buyer-header__dropdown-toggle${location.pathname.startsWith('/category') ? ' buyer-header__nav-link--active' : ''}`}
                aria-expanded={productsOpen}
                onClick={() => setProductsOpen(!productsOpen)}
              >
                Shop by Category
                <i className="fa fa-chevron-down buyer-header__chevron" aria-hidden="true" />
              </button>
              {productsOpen && (
                <div className="buyer-header__dropdown-menu">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className="buyer-header__dropdown-item"
                      onClick={() => setProductsOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Link to="/all-products" className="buyer-header__cta">
            Shop Now
          </Link>
        </div>
      </nav>

      {mobileOpen && (
        <div className="buyer-header__mobile-nav buyer-header__mobile-nav--open">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={navLinkClass(link.to)}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <p className="buyer-header__mobile-label">Categories</p>
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="buyer-header__nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
          <Link
            to="/all-products"
            className="buyer-btn buyer-btn--accent buyer-header__mobile-cta"
            onClick={() => setMobileOpen(false)}
          >
            Shop Now
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
