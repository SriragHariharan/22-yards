import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import '../styles/SellerPages.css';
import '../styles/AddNewProduct.css';
import Error from '../components/general/Error';

const fieldError = (msg) => <p className="field-error">{msg}</p>;

const DEFAULT_DESCRIPTION =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda porro ducimus quidem hic excepturi magni, non reprehenderit distinctio labore explicabo, alias officia itaque voluptatum ab suscipit placeat corporis tenetur a iure doloribus? Accusamus ut soluta odio?';

const DEFAULT_SPECIFICATION =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt repellat aliquid sapiente vel perferendis illum, rerum doloribus, suscipit aliquam fugiat sequi unde.';

const CATEGORIES = [
    { value: 'cricket-bat', label: 'Cricket bat' },
    { value: 'leg-guard', label: 'Leg guards' },
    { value: 'gloves', label: 'Gloves' },
    { value: 'cricket-ball', label: 'Balls' },
    { value: 'kit-bag', label: 'Bag' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'helmet', label: 'Helmet' },
    { value: 'protection', label: 'Protection' },
    { value: 'wearables', label: 'Wearables' },
    { value: 'accessories', label: 'Accessories' },
];

function ImageUploadTile({ index, preview, register, onChange, error }) {
    return (
        <div className="add-product__upload-tile">
            <p className="add-product__upload-label">Image {index}</p>
            {preview ? (
                <img className="add-product__upload-preview" src={preview} alt={`Preview ${index}`} />
            ) : (
                <div className="add-product__upload-placeholder">
                    <i className="fas fa-image" />
                </div>
            )}
            <MDBInput
                type="file"
                size="lg"
                {...register(`image${index}`, { required: true })}
                onChange={onChange}
            />
            {error && fieldError('Image required')}
        </div>
    );
}

export default function AddNewProduct() {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const Token = useSelector(state => state?.Admin.seller.token);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);

    const showToastMessage = () => {
        toast.success('New product has been added successfully!', {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    const onSubmit = async (data) => {
        setSubmitting(true);
        setError(null);
        const formData = new FormData();
        formData.append('image1', data.image1[0]);
        formData.append('image2', data.image2[0]);
        formData.append('image3', data.image3[0]);
        formData.append('data', JSON.stringify(data));

        fetch(import.meta.env.VITE_SERVER + 'seller/add-new-product', {
            method: 'POST',
            body: formData,
            headers: { Authorization: `Bearer ${Token}` },
        })
            .then(resp => resp.json())
            .then(result => {
                if (result.success === false) {
                    setError(result.message);
                } else {
                    showToastMessage();
                    navigate('/seller/home/view-all-products');
                }
            })
            .catch(err => setError(err?.message ?? String(err)))
            .finally(() => setSubmitting(false));
    };

    return (
        <>
            <ToastContainer />
            <div className="seller-page">
                <div className="seller-page__inner">
                    <Link to="/seller/home" className="seller-page__back">
                        <i className="fas fa-arrow-left" /> Back to dashboard
                    </Link>

                    <header className="seller-page__header">
                        <div>
                            <h1 className="seller-page__title">Add new product</h1>
                            <p className="seller-page__subtitle">
                                Upload images and fill in details to list on 22Yards.
                            </p>
                        </div>
                    </header>

                    {error && <Error error={error} />}

                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="seller-card">
                        <section className="seller-form__section">
                            <h2 className="seller-form__section-title">
                                <span className="seller-form__section-num">1</span>
                                Product images
                            </h2>
                            <p className="seller-form__section-desc">Upload three clear photos of your product.</p>
                            <div className="add-product__upload-grid">
                                <ImageUploadTile
                                    index={1}
                                    preview={image1}
                                    register={register}
                                    onChange={e => setImage1(URL.createObjectURL(e.target.files[0]))}
                                    error={errors.image1?.type === 'required'}
                                />
                                <ImageUploadTile
                                    index={2}
                                    preview={image2}
                                    register={register}
                                    onChange={e => setImage2(URL.createObjectURL(e.target.files[0]))}
                                    error={errors.image2?.type === 'required'}
                                />
                                <ImageUploadTile
                                    index={3}
                                    preview={image3}
                                    register={register}
                                    onChange={e => setImage3(URL.createObjectURL(e.target.files[0]))}
                                    error={errors.image3?.type === 'required'}
                                />
                            </div>
                        </section>

                        <section className="seller-form__section">
                            <h2 className="seller-form__section-title">
                                <span className="seller-form__section-num">2</span>
                                Basic details
                            </h2>
                            <p className="seller-form__section-desc">Name, category, pricing, and inventory.</p>
                            <div className="seller-form__grid">
                                <div className="seller-form__field seller-form__field--full">
                                    <MDBInput label="Product name" type="text" size="lg" {...register('productName', { required: true })} />
                                    {errors.productName?.type === 'required' && fieldError('Product name required')}
                                </div>
                                <div className="seller-form__field">
                                    <MDBInput label="Brand" type="text" size="lg" {...register('brand', { required: true })} />
                                    {errors.brand?.type === 'required' && fieldError('Brand required')}
                                </div>
                                <div className="seller-form__field">
                                    <label className="seller-form__label">Category</label>
                                    <select className="seller-form__select" {...register('category', { required: true })}>
                                        <option value="">Select category</option>
                                        {CATEGORIES.map(c => (
                                            <option key={c.value} value={c.value}>{c.label}</option>
                                        ))}
                                    </select>
                                    {errors.category?.type === 'required' && fieldError('Category required')}
                                </div>
                                <div className="seller-form__field">
                                    <MDBInput label="MRP (₹)" type="number" size="lg" {...register('mrp', { required: true })} />
                                    {errors.mrp?.type === 'required' && fieldError('MRP required')}
                                </div>
                                <div className="seller-form__field">
                                    <MDBInput label="Offer price (₹)" type="number" size="lg" {...register('offerPrice', { required: true })} />
                                    {errors.offerPrice?.type === 'required' && fieldError('Offer price required')}
                                </div>
                                <div className="seller-form__field">
                                    <MDBInput label="Size" type="text" size="lg" {...register('size', { required: true })} />
                                    {errors.size?.type === 'required' && fieldError('Size required')}
                                </div>
                                <div className="seller-form__field">
                                    <MDBInput label="Stock" type="number" size="lg" defaultValue={10} {...register('stock', { required: true })} />
                                    {errors.stock?.type === 'required' && fieldError('Stock required')}
                                </div>
                            </div>
                        </section>

                        <section className="seller-form__section">
                            <h2 className="seller-form__section-title">
                                <span className="seller-form__section-num">3</span>
                                Description & features
                            </h2>
                            <p className="seller-form__section-desc">Help buyers understand your product.</p>
                            <div className="seller-form__field">
                                <label className="seller-form__label">Product description</label>
                                <textarea
                                    className="seller-form__textarea"
                                    rows={4}
                                    defaultValue={DEFAULT_DESCRIPTION}
                                    {...register('description', { required: true })}
                                />
                                {errors.description?.type === 'required' && fieldError('Description required')}
                            </div>
                            <div className="seller-form__field">
                                <label className="seller-form__label">Specification</label>
                                <textarea
                                    className="seller-form__textarea"
                                    rows={6}
                                    defaultValue={DEFAULT_SPECIFICATION}
                                    {...register('specification', { required: true })}
                                />
                                {errors.specification?.type === 'required' && fieldError('Specification required')}
                            </div>
                            <div className="seller-form__grid">
                                {[1, 2, 3, 4].map(n => (
                                    <div key={n} className="seller-form__field">
                                        <MDBInput
                                            label={`Feature ${n}`}
                                            type="text"
                                            size="lg"
                                            defaultValue="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
                                            {...register(`feature${n}`, { required: true })}
                                        />
                                        {errors[`feature${n}`]?.type === 'required' && fieldError('Feature required')}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="seller-form__section">
                            <h2 className="seller-form__section-title">
                                <span className="seller-form__section-num">4</span>
                                Physical details
                            </h2>
                            <p className="seller-form__section-desc">Color, material, warranty, and weight.</p>
                            <div className="seller-form__grid">
                                <div className="seller-form__field">
                                    <MDBInput label="Product color" type="text" size="lg" defaultValue="White" {...register('productColor', { required: true })} />
                                    {errors.productColor?.type === 'required' && fieldError('Color required')}
                                </div>
                                <div className="seller-form__field">
                                    <MDBInput label="Product material" type="text" size="lg" defaultValue="PU brushed with PVC Inlets" {...register('productMaterial', { required: true })} />
                                    {errors.productMaterial?.type === 'required' && fieldError('Material required')}
                                </div>
                                <div className="seller-form__field">
                                    <MDBInput label="Items in box" type="text" size="lg" defaultValue="A pair of batting pads" {...register('itemsInBox', { required: true })} />
                                    {errors.itemsInBox?.type === 'required' && fieldError('Required')}
                                </div>
                                <div className="seller-form__field">
                                    <MDBInput label="Warranty" type="text" size="lg" defaultValue="No seller or product warranty applied" {...register('warranty', { required: true })} />
                                    {errors.warranty?.type === 'required' && fieldError('Warranty required')}
                                </div>
                                <div className="seller-form__field">
                                    <MDBInput label="Weight" type="text" size="lg" defaultValue="800g per pad" {...register('weight', { required: true })} />
                                    {errors.weight?.type === 'required' && fieldError('Weight required')}
                                </div>
                            </div>
                        </section>

                        <div className="seller-form__actions">
                            <Link to="/seller/home" className="seller-btn seller-btn--secondary">Cancel</Link>
                            <button type="submit" className="seller-btn seller-btn--primary" disabled={submitting}>
                                <i className="fas fa-check" />
                                {submitting ? 'Publishing...' : 'Publish product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
