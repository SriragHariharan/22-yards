import React, { useEffect, useState } from 'react'
import useBuyerAuthInstance from '../axios/useBuyerAuthInstance'
import OrderCard from '../components/orders/OrderCard';
import { ToastContainer, toast } from 'react-toastify';

export default function OrdersBuyer() {
    const [BuyerAuthInstance] = useBuyerAuthInstance()
    const [orders, setOrders] = useState(null);
    const [error, setError] = useState(null);

    const showToast = (message) => {
        toast(message, { position: toast.POSITION.TOP_CENTER });
    }

    useEffect(() => {
        BuyerAuthInstance.get('/orders')
            .then(resp => setOrders(resp.data.data.orders))
            .catch(err => setError(err.message))
    }, [])

    return (
        <section className="buyer-orders buyer-section">
            <ToastContainer />
            <div className="buyer-container">
                <header className="buyer-section__header">
                    <h1 className="buyer-section-title">Your Orders</h1>
                    <p className="buyer-section-subtitle">Track purchases and delivery status</p>
                </header>

                {error && (
                    <div className="buyer-empty-state">
                        <p className="buyer-empty-state__text text-danger">{error}</p>
                    </div>
                )}

                {!error && orders === null && (
                    <div className="buyer-catalog__loading">
                        <div className="buyer-catalog__spinner" aria-hidden="true" />
                        <p className="buyer-empty-state__text">Loading orders…</p>
                    </div>
                )}

                {!error && orders?.length === 0 && (
                    <div className="buyer-empty-state">
                        <p className="buyer-empty-state__text">You have no orders yet.</p>
                    </div>
                )}

                {!error && orders?.length > 0 && orders.map(order => (
                    <OrderCard key={order._id} order={order} onToast={showToast} />
                ))}
            </div>
        </section>
    )
}
