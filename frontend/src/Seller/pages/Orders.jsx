import React, { useEffect, useState } from 'react'
import useSellerProductInstance from '../axios/useSellerProductInstance';
import OrdersCard from '../components/orders/OrdersCard';

export default function Orders() {
    const [sellerProductInstance] = useSellerProductInstance();
    const [orders, setOrders] = useState(null);
    const [error, setError] = useState(null)

    useEffect(() => {
        sellerProductInstance.get('orders')
        .then(resp => setOrders(resp.data.data.orders))
        .catch(err => setError(err.message))
    }, [])


  return (
<section className="bg-light my-5">
    <div className="container">
        <div className="row">
        <h4 className="card-title mb-4">Your orders</h4>
            <div className="col-lg-12">
                {
                    orders?.filter(item => item.paymentSuccess === true).map(order => <OrdersCard product={order} /> )
                }                
            </div>
        </div>
    </div>
</section>
    )
}
