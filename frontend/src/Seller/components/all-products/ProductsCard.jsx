import { Link } from 'react-router-dom';

import '../../styles/SellerPages.css';

export default function ProductsCard({ productName, stock, mrp, offerPrice, productID, description }) {
    const stockClass = stock <= 5 ? 'seller-product-row__stock seller-product-row__stock--low' : 'seller-product-row__stock';

    return (
        <article className="seller-product-row">
            <img
                className="seller-product-row__image"
                src={`${import.meta.env.VITE_SERVER_IMG}/product-images/${productID}-01.jpg`}
                alt={productName}
            />
            <div>
                <h3 className="seller-product-row__name">{productName}</h3>
                <p className="seller-product-row__desc">
                    {description?.slice(0, 120)}{description?.length > 120 ? '…' : ''}
                </p>
                <span className={stockClass}>{stock} in stock</span>
            </div>
            <div className="seller-product-row__aside">
                <div className="seller-product-row__prices">
                    <span className="seller-product-row__offer">₹ {offerPrice}</span>
                    {mrp > offerPrice && (
                        <span className="seller-product-row__mrp">₹ {mrp}</span>
                    )}
                </div>
                <Link
                    to={`/seller/home/view-product/${productID}`}
                    className="seller-btn seller-btn--secondary seller-product-row__cta"
                >
                    View details
                </Link>
            </div>
        </article>
    );
}
