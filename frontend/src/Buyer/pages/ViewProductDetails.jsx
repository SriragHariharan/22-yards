import React, { useState, useEffect, useMemo } from 'react'
import SimilarItemsCard from '../components/view-product-details/SimilarItemsCard'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BuyerProductInstance from '../axios/BuyerProductInstance';
import Error from '../../Seller/components/general/Error';
import { useSelector, useDispatch } from "react-redux";
import { NewCartItem } from '../../redux-tk/reducers/CartReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReviewsCard from '../components/view-product-details/ReviewsCard';
import StarComponent from '../components/view-product-details/StarComponent';
import ReactImageMagnify from 'react-image-magnify';

function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? '';
}

function stockBadge(stock) {
    if (stock < 1) return { text: 'Out of stock', className: 'buyer-pdp__stock-badge--out' }
    if (stock <= 3) return { text: `Only ${stock} left`, className: 'buyer-pdp__stock-badge--low' }
    return { text: `${stock} in stock`, className: 'buyer-pdp__stock-badge--ok' }
}

export default function ViewProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState(null);
    const [categorizedProducts, setCategorizedProducts] = useState(null)
    const [error, setError] = useState(null);
    const [image, setImage] = useState(1);
    const [reviews, setReviews] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart.cart);

    const showToastMessage = () => {
        toast.success('Item added to cart !', {
            position: toast.POSITION.TOP_CENTER
        });
    };

    useEffect(() => {
        setProduct(null)
        setError(null)
        setImage(1)

        BuyerProductInstance.get('get-single-product/' + id)
            .then(resp => {
                if (resp.data.success === false) {
                    setError(resp.data.message);
                    return false;
                }
                setProduct(resp.data.data.product);
                return resp.data.data.product.category;
            })
            .then(category => {
                if (!category) return
                BuyerProductInstance.get('category/' + category)
                    .then(resp => {
                        if (resp.data.success === false) {
                            setError(resp.data.message);
                        } else {
                            setCategorizedProducts(
                                resp.data.data.products.filter(p => p._id !== id)
                            )
                        }
                    })
                BuyerProductInstance.post('/reviews/', { productID: id })
                    .then(resp => setReviews(resp.data.data.reviews))
                    .catch(err => setError(err.message))
            })
            .catch(err => setError(err.message))
    }, [id])

    const offerPrice1 = numberWithCommas(product?.offerPrice)
    const mrp1 = numberWithCommas(product?.mrp)
    const discount = product?.mrp && product?.offerPrice
        ? Math.floor(((product.mrp - product.offerPrice) / product.offerPrice) * 100)
        : 0

    const handleAddToCart = (productID, productName, offerPrice, sellerID, size) => {
        dispatch(NewCartItem({ productID, productName, offerPrice, quantity: 1, sellerID, size, totalPrice: offerPrice, orderStatus: "order placed" }));
        showToastMessage()
    }

    const handleBuyNow = (productID, productName, offerPrice, sellerID, size) => {
        dispatch(NewCartItem({ productID, productName, offerPrice, quantity: 1, sellerID, size, totalPrice: offerPrice, orderStatus: "order placed" }));
        navigate('/cart')
    }

    const productExistsInCart = cart?.filter(item => item.productID === product?._id);

    const avgRating = useMemo(() => {
        if (!reviews?.length) return [0, 0]
        const reviewsTotal = reviews.reduce((accu, curr) => accu + curr.productRating, 0);
        return [Number(Math.ceil(reviewsTotal / reviews.length)), reviews.length]
    }, [reviews])

    const imgBase = `${import.meta.env.VITE_SERVER_IMG}/product-images/${product?._id}`
    const stock = stockBadge(product?.stock ?? 0)

    return (
        <>
            {error && <Error error={error} />}
            {!error && !product && (
                <section className="buyer-pdp buyer-section">
                    <div className="buyer-container buyer-catalog__loading">
                        <div className="buyer-catalog__spinner" aria-hidden="true" />
                        <p className="buyer-empty-state__text">Loading product…</p>
                    </div>
                </section>
            )}
            {!error && product && (
                <>
                    <ToastContainer />
                    <section className="buyer-pdp buyer-section">
                        <div className="buyer-container">
                            <div className="row g-4">
                                <aside className="col-lg-6">
                                    <div className="buyer-pdp__gallery-frame">
                                        <ReactImageMagnify {...{
                                            smallImage: {
                                                alt: product.productName,
                                                isFluidWidth: true,
                                                src: `${imgBase}-0${image}.jpg`
                                            },
                                            largeImage: {
                                                src: `${imgBase}-0${image}.jpg`,
                                                width: 2000,
                                                height: 1800
                                            },
                                            isHintEnabled: true
                                        }} />
                                    </div>
                                    <div className="buyer-pdp__thumbs">
                                        {[1, 2, 3].map(n => (
                                            <img
                                                key={n}
                                                onClick={() => setImage(n)}
                                                src={`${imgBase}-0${n}.jpg`}
                                                alt={`${product.productName} view ${n}`}
                                                className={`buyer-pdp__thumb ${image === n ? 'buyer-pdp__thumb--active' : ''}`}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => e.key === 'Enter' && setImage(n)}
                                            />
                                        ))}
                                    </div>
                                </aside>

                                <main className="col-lg-6">
                                    <h1 className="buyer-pdp__title">{product.productName}</h1>

                                    <div className="buyer-pdp__rating-row">
                                        <StarComponent rating={avgRating[0]} count={avgRating[1]} />
                                        <span className={`buyer-pdp__stock-badge ${stock.className}`}>
                                            {stock.text}
                                        </span>
                                    </div>

                                    <div className="buyer-pdp__price-block">
                                        <span className="buyer-pdp__offer-price">₹ {offerPrice1}</span>
                                        <span className="buyer-pdp__mrp">₹ {mrp1}</span>
                                        {discount > 0 && (
                                            <span className="buyer-pdp__discount">{discount}% off</span>
                                        )}
                                    </div>

                                    <p className="buyer-pdp__description">{product.description}</p>

                                    <dl className="buyer-pdp__meta">
                                        <dt>Size</dt>
                                        <dd>{product.size}</dd>
                                        <dt>Brand</dt>
                                        <dd>{product.brand}</dd>
                                        <dt>Category</dt>
                                        <dd>{product.category}</dd>
                                        <dt>Color</dt>
                                        <dd>{product.productColor}</dd>
                                    </dl>

                                    <div className="buyer-pdp__actions">
                                        {product.stock < 1 && (
                                            <div className="buyer-pdp__out-of-stock">
                                                <i className="fa-solid fa-box-open" aria-hidden="true" />
                                                Product out of stock
                                            </div>
                                        )}
                                        {product.stock > 1 && productExistsInCart?.length !== 0 && (
                                            <Link to="/cart" className="buyer-btn buyer-btn--primary buyer-btn--full">
                                                <i className="fa-solid fa-cart-shopping" aria-hidden="true" /> Go to cart
                                            </Link>
                                        )}
                                        {product.stock > 1 && productExistsInCart?.length === 0 && (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddToCart(product._id, product.productName, product.offerPrice, product.sellerID, product.size)}
                                                    className="buyer-btn buyer-btn--accent"
                                                >
                                                    <i className="fa-solid fa-cart-shopping" aria-hidden="true" /> Add to cart
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleBuyNow(product._id, product.productName, product.offerPrice, product.sellerID, product.size)}
                                                    className="buyer-btn buyer-btn--primary"
                                                >
                                                    <i className="fas fa-bolt" aria-hidden="true" /> Buy now
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </main>
                            </div>
                        </div>
                    </section>

                    <section className="buyer-pdp__specs-section">
                        <div className="buyer-container">
                            <div className="row g-4">
                                <div className="col-lg-8">
                                    <div className="buyer-pdp__specs-card">
                                        <h2 className="buyer-pdp__specs-title">Specifications</h2>
                                        <p className="buyer-pdp__description">{product.description}</p>
                                        <ul className="buyer-pdp__features">
                                            {product.feature1 && <li><i className="fas fa-check" />{product.feature1}</li>}
                                            {product.feature2 && <li><i className="fas fa-check" />{product.feature2}</li>}
                                            {product.feature3 && <li><i className="fas fa-check" />{product.feature3}</li>}
                                            {product.feature4 && <li><i className="fas fa-check" />{product.feature4}</li>}
                                        </ul>
                                        <table className="buyer-pdp__spec-table">
                                            <tbody>
                                                <tr><th>Brand</th><td>{product.brand}</td></tr>
                                                <tr><th>Size</th><td>{product.size}</td></tr>
                                                <tr><th>Weight</th><td>{product.weight}</td></tr>
                                                <tr><th>Items in box</th><td>{product.itemsInBox}</td></tr>
                                                <tr><th>Warranty</th><td>{product.warranty}</td></tr>
                                                <tr><th>Shipping</th><td>2 – 3 business days</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    {categorizedProducts?.length > 0 && (
                                        <div className="buyer-pdp__similar-card">
                                            <h3 className="buyer-pdp__similar-title">Similar items</h3>
                                            {categorizedProducts.slice(0, 6).map(p => (
                                                <SimilarItemsCard key={p._id} product={p} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="buyer-reviews">
                        <div className="buyer-container">
                            <header className="buyer-reviews__header">
                                <h2 className="buyer-section-title">Customer Reviews</h2>
                                <p className="buyer-section-subtitle">
                                    {reviews?.length ? `${reviews.length} review${reviews.length !== 1 ? 's' : ''}` : 'Be the first to review'}
                                </p>
                            </header>
                            {reviews?.length === 0 && (
                                <div className="buyer-empty-state">
                                    <p className="buyer-empty-state__text">No reviews yet.</p>
                                </div>
                            )}
                            {reviews?.length > 0 && reviews.map((review, index) => (
                                <ReviewsCard key={index} review={review} />
                            ))}
                        </div>
                    </section>
                </>
            )}
        </>
    )
}
