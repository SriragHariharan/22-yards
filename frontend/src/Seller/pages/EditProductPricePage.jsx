import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Alert from 'react-bootstrap/Alert';

import '../styles/SellerPages.css';
import useSellerProductInstance from '../axios/useSellerProductInstance';
import { editProductPrice } from '../../redux-tk/reducers/EditProductDetails';

const fieldError = (msg) => <p className="field-error">{msg}</p>;

export default function EditProductPricePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sellerProductInstance] = useSellerProductInstance();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentMrp, setCurrentMrp] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        sellerProductInstance.get('/get-product/' + id)
            .then(resp => {
                if (resp.data.success !== false) {
                    const p = resp.data.data.product;
                    setCurrentPrice(p.offerPrice);
                    setCurrentMrp(p.mrp);
                }
            })
            .finally(() => setLoading(false));
    }, [sellerProductInstance, id]);

    const onSubmit = (data) => {
        sellerProductInstance.patch('/edit-product/' + id, { ...data })
            .then(resp => {
                if (resp.data.success === false) {
                    setError(resp.data.message);
                } else {
                    dispatch(editProductPrice(data.offerPrice));
                    toast.success('Offer price updated successfully!', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    navigate(`/seller/home/view-product/${id}`);
                }
            })
            .catch(err => setError(err.message));
    };

    return (
        <>
            <ToastContainer />
            <div className="seller-page">
                <div className="seller-page__inner">
                    <Link to={`/seller/home/view-product/${id}`} className="seller-page__back">
                        <i className="fas fa-arrow-left" /> Back to product
                    </Link>

                    <header className="seller-page__header">
                        <div>
                            <h1 className="seller-page__title">Edit pricing</h1>
                            <p className="seller-page__subtitle">Update the offer price for this product.</p>
                        </div>
                    </header>

                    {loading ? (
                        <p className="seller-loading">Loading...</p>
                    ) : (
                        <div className="seller-card seller-summary-card">
                            {error && <Alert variant="danger">{error}</Alert>}

                            <div className="seller-card seller-card--muted seller-summary-card--nested">
                                <p className="seller-summary__label">Current pricing</p>
                                <p className="seller-summary__value">
                                    Offer: ₹ {currentPrice}
                                    {currentMrp != null && (
                                        <span className="seller-summary__value-muted">
                                            MRP ₹ {currentMrp}
                                        </span>
                                    )}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="seller-form__field">
                                    <MDBInput label="New offer price (₹)" type="number" size="lg" {...register('offerPrice', { required: true })} />
                                    {errors.offerPrice?.type === 'required' && fieldError("Offer price can't be empty")}
                                </div>

                                <div className="seller-form__actions seller-form__actions--static">
                                    <Link to={`/seller/home/view-product/${id}`} className="seller-btn seller-btn--secondary">Cancel</Link>
                                    <button type="submit" className="seller-btn seller-btn--primary">
                                        <i className="fas fa-save" /> Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
