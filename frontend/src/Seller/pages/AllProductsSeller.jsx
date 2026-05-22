import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/SellerPages.css';
import ProductsCard from '../components/all-products/ProductsCard';
import useSellerProductInstance from '../axios/useSellerProductInstance';
import Error from '../components/general/Error';

export default function AllProductsSeller() {
    const [sellerProductInstance] = useSellerProductInstance();
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        sellerProductInstance.get('/')
            .then(resp => {
                if (resp.data.success === false) {
                    setError(resp.data.message);
                } else {
                    setProducts(resp.data.data.products ?? []);
                    setError(null);
                }
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [sellerProductInstance]);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return products;
        return products.filter(p => p.productName?.toLowerCase().includes(q));
    }, [products, search]);

    if (error) {
        return (
            <div className="seller-page">
                <Error error={error} />
            </div>
        );
    }

    return (
        <div className="seller-page">
            <div className="seller-page__inner">
                <header className="seller-page__header">
                    <div>
                        <h1 className="seller-page__title">All products</h1>
                        <p className="seller-page__subtitle">
                            You sell {products.length} product{products.length !== 1 ? 's' : ''} on 22Yards
                        </p>
                    </div>
                    <div className="seller-page__actions">
                        <span className="seller-page__badge">{filtered.length} shown</span>
                        <Link to="/seller/home/add-new-product" className="seller-btn seller-btn--primary">
                            <i className="fas fa-plus" /> Add product
                        </Link>
                    </div>
                </header>

                {products.length > 0 && (
                    <div className="seller-search seller-search--spaced">
                        <i className="fas fa-search seller-search__icon" />
                        <input
                            type="search"
                            className="seller-search__input"
                            placeholder="Search by product name..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                )}

                {loading ? (
                    <p className="seller-loading">Loading products...</p>
                ) : products.length === 0 ? (
                    <div className="seller-empty">
                        <i className="fas fa-box-open seller-empty__icon" />
                        <p>No products listed yet.</p>
                        <Link to="/seller/home/add-new-product" className="seller-btn seller-btn--primary">
                            Add your first product
                        </Link>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="seller-empty">
                        <i className="fas fa-search seller-empty__icon" />
                        <p>No products match your search.</p>
                    </div>
                ) : (
                    <div>
                        {filtered.map(product => (
                            <ProductsCard
                                key={product._id}
                                productName={product.productName}
                                stock={product.stock}
                                mrp={product.mrp}
                                offerPrice={product.offerPrice}
                                productID={product._id}
                                description={product.description}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
