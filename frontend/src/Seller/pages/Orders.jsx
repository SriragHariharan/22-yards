import { useCallback, useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import '../styles/SellerPages.css';
import '../styles/Orders.css';
import useSellerProductInstance from '../axios/useSellerProductInstance';
import OrdersCard from '../components/orders/OrdersCard';
import Error from '../components/general/Error';

const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'order placed', label: 'Placed' },
    { id: 'order confirmed', label: 'Confirmed' },
    { id: 'order packed', label: 'Packed' },
    { id: 'order shipped', label: 'Shipped' },
    { id: 'order delivered', label: 'Delivered' },
];

export default function Orders() {
    const [sellerProductInstance] = useSellerProductInstance();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');

    const fetchOrders = useCallback((isRefetch = false) => {
        if (isRefetch) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }
        sellerProductInstance.get('orders')
            .then(resp => {
                if (resp.data.success === false) {
                    setError(resp.data.message);
                } else {
                    setOrders(resp.data.data.orders ?? []);
                    setError(null);
                }
            })
            .catch(err => setError(err.message))
            .finally(() => {
                setLoading(false);
                setRefreshing(false);
            });
    }, [sellerProductInstance]);

    useEffect(() => {
        fetchOrders(false);
    }, [fetchOrders]);

    const paidOrders = useMemo(
        () => orders.filter(item => item.paymentSuccess === true),
        [orders]
    );

    const filtered = useMemo(() => {
        if (activeFilter === 'all') return paidOrders;
        return paidOrders.filter(o => o.cart?.orderStatus === activeFilter);
    }, [paidOrders, activeFilter]);

    const handleStatusChange = (errMsg, isError) => {
        if (isError) {
            toast.error(errMsg ?? 'Update failed', { position: toast.POSITION.TOP_CENTER });
        } else {
            toast.success('Order status updated. Refreshing...', { position: toast.POSITION.TOP_CENTER });
            fetchOrders(true);
        }
    };

    if (error) {
        return (
            <div className="seller-page">
                <Error error={error} />
            </div>
        );
    }

    return (
        <>
            <ToastContainer />
            <div className="seller-page">
                <div className="seller-page__inner">
                    <header className="seller-page__header">
                        <div>
                            <h1 className="seller-page__title">Your orders</h1>
                            <p className="seller-page__subtitle">
                                Manage fulfillment for paid orders from your shop.
                            </p>
                        </div>
                        <span className="seller-page__badge">{paidOrders.length} paid orders</span>
                    </header>

                    <div className="orders-filters">
                        {FILTERS.map(f => (
                            <button
                                key={f.id}
                                type="button"
                                className={`orders-filter-chip${activeFilter === f.id ? ' orders-filter-chip--active' : ''}`}
                                onClick={() => setActiveFilter(f.id)}
                            >
                                {f.label}
                            </button>
                        ))}
                        {refreshing && (
                            <span className="seller-page__badge seller-orders-updating">
                                Updating…
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <p className="seller-loading">Loading orders...</p>
                    ) : paidOrders.length === 0 ? (
                        <div className="seller-empty">
                            <i className="fas fa-box seller-empty__icon" />
                            <p>No paid orders yet. They will appear here when customers checkout.</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="seller-empty">
                            <i className="fas fa-filter seller-empty__icon" />
                            <p>No orders match this filter.</p>
                        </div>
                    ) : (
                        filtered.map(order => (
                            <OrdersCard
                                key={order._id}
                                product={order}
                                onStatusChange={handleStatusChange}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
