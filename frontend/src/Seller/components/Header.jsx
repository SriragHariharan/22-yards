import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MDBCollapse, MDBIcon } from 'mdb-react-ui-kit';

import '../styles/SellerLayout.css';
import { AdminLogout } from '../../redux-tk/reducers/AdminReducer';

const NAV_LINKS = [
    { to: '/seller/home', label: 'Home', end: true },
    { to: '/seller/home/view-all-products', label: 'Products' },
    { to: '/seller/home/orders', label: 'Orders' },
    { to: '/seller/home/add-new-product', label: 'Add product' },
    { to: '/seller/home/faq', label: 'FAQ' },
];

const navLinkClass = ({ isActive }) =>
    `seller-header__nav-link${isActive ? ' seller-header__nav-link--active' : ''}`;

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const seller = useSelector(state => state?.Admin?.seller?.seller);

    const handleLogout = () => {
        localStorage.removeItem('22YardsAdmin');
        dispatch(AdminLogout(null));
    };

    const closeMenu = () => setMenuOpen(false);

    const navLinks = NAV_LINKS.map(({ to, label, end }) => (
        <NavLink
            key={to}
            to={to}
            end={end}
            className={navLinkClass}
            onClick={closeMenu}
        >
            {label}
        </NavLink>
    ));

    const userActions = (
        <>
            <span className="seller-header__greeting">
                Hi, <strong>{seller?.sellerName ?? 'Seller'}</strong>
            </span>
            <button type="button" className="seller-header__logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </>
    );

    return (
        <header className="seller-header">
            <div className="seller-header__inner">
                <Link to="/seller/home" className="seller-header__brand" onClick={closeMenu}>
                    <img
                        className="seller-header__logo"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-196UvngLppQ7fGE1-TQfG75ZKli2l6IdAkNCgK83g&s"
                        alt="22Yards"
                    />
                    <span className="seller-header__brand-text">
                        <span className="seller-header__brand-name">22Yards</span>
                        <span className="seller-header__brand-sub">Seller Hub</span>
                    </span>
                </Link>

                <nav className="seller-header__nav" aria-label="Seller navigation">
                    {navLinks}
                </nav>

                <div className="seller-header__actions">
                    {userActions}
                </div>

                <button
                    type="button"
                    className="seller-header__toggler"
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <MDBIcon icon="bars" fas />
                </button>
            </div>

            <MDBCollapse show={menuOpen} className={`seller-header__mobile-nav${menuOpen ? ' is-open' : ''}`}>
                <div className="seller-header__inner" style={{ paddingTop: 0 }}>
                    <nav className="seller-header__nav" aria-label="Mobile seller navigation">
                        {navLinks}
                    </nav>
                    <div className="seller-header__mobile-actions">
                        {userActions}
                    </div>
                </div>
            </MDBCollapse>
        </header>
    );
}
