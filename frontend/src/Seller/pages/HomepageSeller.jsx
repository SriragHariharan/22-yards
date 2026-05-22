import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../styles/Homepage.css';
import ProductShort from '../components/Homepage/ProductsShort.jsx';
import StatCard from '../components/Homepage/StatCard';
import useSellerProductInstance from '../axios/useSellerProductInstance';
import Error from '../components/general/Error';

function computeStats(products, orders) {
    const paidOrders = orders?.filter(item => item.paymentSuccess === true) ?? [];

    return {
        newOrders: paidOrders.filter(item => item.cart.orderStatus === 'order placed').length,
        revenue: paidOrders.map(item => item.cart.totalPrice).reduce((acc, curr) => acc + curr, 0),
        itemsSold: paidOrders.map(item => item.cart.quantity).reduce((acc, curr) => acc + curr, 0),
        liveProducts: products?.length ?? 0,
    };
}

export default function HomepageSeller() {
    const sellerName = useSelector(state => state?.Admin?.seller?.seller?.sellerName);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sellerProductInstance] = useSellerProductInstance();

    useEffect(() => {
        Promise.all([
            sellerProductInstance.get('/'),
            sellerProductInstance.get('orders'),
        ])
            .then(([productsResp, ordersResp]) => {
                if (productsResp.data.success === false) {
                    setError(productsResp.data.message);
                    return;
                }
                if (ordersResp.data.success === false) {
                    setError(ordersResp.data.message);
                    return;
                }
                setProducts(productsResp.data.data.products ?? []);
                setOrders(ordersResp.data.data.orders ?? []);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [sellerProductInstance]);

    const stats = useMemo(() => computeStats(products, orders), [products, orders]);
    const recentProducts = products.slice(0, 4);

    if (error) {
        return <Error error={error} />;
    }

    return (
        <div className="seller-dashboard">
            <div className="seller-dashboard__inner">
                <header className="seller-dashboard__header">
                    <div>
                        <h1 className="seller-dashboard__greeting">
                            Welcome back{sellerName ? `, ${sellerName}` : ''}
                        </h1>
                        <p className="seller-dashboard__subtitle">Here&apos;s what&apos;s happening with your shop today.</p>
                    </div>
                    <div className="seller-dashboard__actions">
                        <Link to="/seller/home/add-new-product" className="seller-dashboard__btn seller-dashboard__btn--primary">
                            <i className="fas fa-plus" /> Add product
                        </Link>
                        <Link to="/seller/home/orders" className="seller-dashboard__btn seller-dashboard__btn--secondary">
                            <i className="fas fa-box" /> View orders
                        </Link>
                    </div>
                </header>

                <section className="seller-dashboard__stats">
                    <StatCard label="New orders" value={loading ? null : stats.newOrders} icon="bell" />
                    <StatCard label="Total revenue" value={loading ? null : stats.revenue} prefix="₹ " icon="indian-rupee-sign" />
                    <StatCard label="Items sold" value={loading ? null : stats.itemsSold} icon="shopping-bag" />
                    <StatCard label="Live products" value={loading ? null : stats.liveProducts} icon="store" />
                </section>

                <section className="seller-dashboard__products">
                    <div className="seller-dashboard__products-header">
                        <h2 className="seller-dashboard__section-title">Recent products</h2>
                        {products.length > 0 && (
                            <Link to="view-all-products" className="seller-dashboard__link">
                                View all &rarr;
                            </Link>
                        )}
                    </div>

                    {loading ? (
                        <p className="seller-dashboard__loading">Loading products...</p>
                    ) : recentProducts.length === 0 ? (
                        <div className="seller-dashboard__empty">
                            <i className="fas fa-box-open seller-dashboard__empty-icon" />
                            <p>No products listed yet.</p>
                            <Link to="/seller/home/add-new-product" className="seller-dashboard__btn seller-dashboard__btn--primary">
                                Add your first product
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="seller-dashboard__product-grid">
                                {recentProducts.map(product => (
                                    <ProductShort
                                        key={product._id}
                                        productName={product.productName}
                                        mrp={product.mrp}
                                        offerPrice={product.offerPrice}
                                        productID={product._id}
                                    />
                                ))}
                            </div>
                            <div className="seller-dashboard__view-all">
                                <Link to="view-all-products" className="seller-dashboard__btn seller-dashboard__btn--secondary">
                                    View all products
                                </Link>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}
