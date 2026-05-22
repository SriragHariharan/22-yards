import { Link } from 'react-router-dom';

function ProductsShort({ productName, mrp, offerPrice, productID }) {
    const discount = mrp > 0 ? Math.round(((mrp - offerPrice) / mrp) * 100) : 0;

    return (
        <article className="product-card">
            <div className="product-card__image-wrap">
                <img
                    className="product-card__image"
                    src={`${import.meta.env.VITE_SERVER_IMG}/product-images/${productID}-01.jpg`}
                    alt={productName}
                />
                {discount > 0 && (
                    <span className="product-card__badge">{discount}% off</span>
                )}
            </div>
            <div className="product-card__body">
                <h3 className="product-card__name">{productName}</h3>
                <div className="product-card__prices">
                    <span className="product-card__offer">₹ {offerPrice}</span>
                    {mrp > offerPrice && (
                        <span className="product-card__mrp">₹ {mrp}</span>
                    )}
                </div>
                <Link
                    to={`/seller/home/view-product/${productID}`}
                    className="product-card__link"
                >
                    View details
                </Link>
            </div>
        </article>
    );
}

export default ProductsShort;
