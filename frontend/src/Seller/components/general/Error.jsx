import { Link } from 'react-router-dom';

import '../../styles/SellerPages.css';

export default function Error({ error }) {
    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <div className="seller-error">
            <i className="fas fa-exclamation-circle seller-error__icon" />
            <h3 className="seller-error__title">Something went wrong</h3>
            <p className="seller-error__message">{error}</p>
            <div className="seller-error__actions">
                <button type="button" className="seller-btn seller-btn--secondary" onClick={refreshPage}>
                    <i className="fas fa-redo" /> Try again
                </button>
                <Link to="/seller/home" className="seller-btn seller-btn--primary">
                    <i className="fas fa-home" /> Go to dashboard
                </Link>
            </div>
        </div>
    );
}
