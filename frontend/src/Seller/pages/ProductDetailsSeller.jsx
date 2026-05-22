import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../styles/SellerPages.css';
import '../styles/ProductDetails.css';
import useSellerProductInstance from '../axios/useSellerProductInstance';
import { removeProductDetails, setProductDetails } from '../../redux-tk/reducers/EditProductDetails';
import Error from '../components/general/Error';

export default function ProductDetailsSeller() {
    const [error, setError] = useState(null);
    const [sellerProductInstance] = useSellerProductInstance();
    const [image, setImage] = useState('01');
    const [showDeletePanel, setShowDeletePanel] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = useSelector(state => state.editProduct.productDetails);

    useEffect(() => {
        sellerProductInstance.get('/get-product/' + id)
            .then(resp => {
                if (resp.data.success === false) {
                    setError(resp.data.message);
                } else {
                    dispatch(setProductDetails(resp.data.data.product));
                }
            })
            .catch(err => setError(err.message));
        return () => { dispatch(removeProductDetails()); };
    }, [sellerProductInstance, id, dispatch]);

    const handleDelete = () => {
        sellerProductInstance.delete('/delete-product/' + product._id)
            .then(resp => {
                if (resp.data.success === false) {
                    setError(resp.data.message);
                } else {
                    toast.success('Product deleted successfully', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    navigate('/seller/home/view-all-products');
                }
            })
            .catch(err => setError(err.message));
    };

    if (error) {
        return <Error error={error} />;
    }

    if (!product) {
        return (
            <div className="seller-page">
                <p className="seller-loading">Loading product...</p>
            </div>
        );
    }

    const discount = product.mrp > 0
        ? Math.floor(((product.mrp - product.offerPrice) / product.mrp) * 100)
        : 0;
    const imgBase = `${import.meta.env.VITE_SERVER_IMG}/product-images/${product._id}`;

    return (
        <>
            <ToastContainer />
            <div className="seller-page">
                <div className="seller-page__inner">
                    <Link to="/seller/home/view-all-products" className="seller-page__back">
                        <i className="fas fa-arrow-left" /> All products
                    </Link>

                    <div className="product-detail__layout">
                        <aside>
                            <div className="product-detail__gallery-main">
                                <img src={`${imgBase}-${image}.jpg`} alt={product.productName} />
                            </div>
                            <div className="product-detail__thumbs">
                                {['01', '02', '03'].map(thumb => (
                                    <button
                                        key={thumb}
                                        type="button"
                                        className={`product-detail__thumb${image === thumb ? ' product-detail__thumb--active' : ''}`}
                                        onClick={() => setImage(thumb)}
                                    >
                                        <img src={`${imgBase}-${thumb}.jpg`} alt="" />
                                    </button>
                                ))}
                            </div>
                        </aside>

                        <main>
                            <h1 className="product-detail__name">{product.productName}</h1>

                            <div className="product-detail__pricing">
                                <span className="product-detail__offer">₹ {product.offerPrice}</span>
                                <span className="product-detail__mrp">₹ {product.mrp}</span>
                                {discount > 0 && (
                                    <span className="product-detail__discount">{discount}% off</span>
                                )}
                            </div>

                            <div className="product-detail__meta">
                                <span className="product-detail__meta-item">
                                    <i className="fas fa-box" /> Stock: {product.stock}
                                </span>
                                <span className="product-detail__meta-item product-detail__meta-item--stock">
                                    <i className="fas fa-check-circle" /> In stock
                                </span>
                            </div>

                            <p className="product-detail__desc">{product.description}</p>

                            <dl className="product-detail__attrs">
                                <dt>Category</dt>
                                <dd>{product.category}</dd>
                                <dt>Color</dt>
                                <dd>{product.productColor}</dd>
                                <dt>Material</dt>
                                <dd>{product.productMaterial}</dd>
                                <dt>Brand</dt>
                                <dd>{product.brand}</dd>
                            </dl>

                            <div className="product-detail__actions">
                                <Link
                                    to={`/seller/home/view-product/${id}/edit-name`}
                                    className="seller-btn seller-btn--secondary"
                                >
                                    <i className="fas fa-pen" /> Edit name
                                </Link>
                                <Link
                                    to={`/seller/home/view-product/${id}/edit-price`}
                                    className="seller-btn seller-btn--secondary"
                                >
                                    <i className="fas fa-tag" /> Edit price
                                </Link>
                            </div>

                            <div className="product-detail__delete-zone">
                                {!showDeletePanel ? (
                                    <button
                                        type="button"
                                        className="seller-btn seller-btn--danger"
                                        onClick={() => setShowDeletePanel(true)}
                                    >
                                        <i className="fas fa-trash" /> Delete product
                                    </button>
                                ) : (
                                    <div className="product-detail__delete-panel">
                                        <p>
                                            Are you sure you want to delete <strong>{product.productName}</strong>?
                                            This cannot be undone.
                                        </p>
                                        <div className="product-detail__delete-actions">
                                            <button
                                                type="button"
                                                className="seller-btn seller-btn--danger"
                                                onClick={handleDelete}
                                            >
                                                Yes, delete
                                            </button>
                                            <button
                                                type="button"
                                                className="seller-btn seller-btn--secondary"
                                                onClick={() => setShowDeletePanel(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>

                    <section className="product-detail__spec seller-card">
                        <h2 className="product-detail__spec-title">Specification</h2>
                        <p>{product.specification}</p>
                        <ul className="product-detail__features">
                            {[product.feature1, product.feature2, product.feature3, product.feature4]
                                .filter(Boolean)
                                .map((f, i) => (
                                    <li key={i}>
                                        <i className="fas fa-check" /> {f}
                                    </li>
                                ))}
                        </ul>
                        <table className="product-detail__spec-table">
                            <tbody>
                                <tr><th>Brand</th><td>{product.brand}</td></tr>
                                <tr><th>Color</th><td>{product.productColor}</td></tr>
                                <tr><th>Weight</th><td>{product.weight}</td></tr>
                                <tr><th>Items in box</th><td>{product.itemsInBox}</td></tr>
                                <tr><th>Warranty</th><td>{product.warranty}</td></tr>
                                <tr><th>Delivery</th><td>3 – 5 business days</td></tr>
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        </>
    );
}
