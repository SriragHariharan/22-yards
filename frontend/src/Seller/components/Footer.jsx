import { Link } from 'react-router-dom';

import '../styles/SellerLayout.css';

function Footer() {
    return (
        <footer className="seller-footer">
            <div className="seller-footer__inner">
                <div className="seller-footer__top">
                    <span className="seller-footer__brand">22Yards</span>
                    <nav className="seller-footer__links" aria-label="Footer navigation">
                        <Link to="/" className="seller-footer__link">Buyer store</Link>
                        <Link to="/seller/home/faq" className="seller-footer__link">FAQ</Link>
                        <Link to="/contact" className="seller-footer__link">Contact</Link>
                    </nav>
                </div>
                <p className="seller-footer__copy">
                    &copy; {new Date().getFullYear()} 22Yards
                </p>
            </div>
        </footer>
    );
}

export default Footer;
