import React, { useEffect, useState } from 'react'
import useBuyerAuthInstance from '../axios/useBuyerAuthInstance'

import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import OrderCard from '../components/orders/OrderCard';

export default function OrdersBuyer() {
    const [BuyerAuthInstance] = useBuyerAuthInstance()
    const [orders, setOrders] = useState(null);
    const [error, setError] = useState(null);

    console.log(orders?.length);

    useEffect(() => {
        BuyerAuthInstance.get('/orders')
        .then(resp => setOrders(resp.data.data.orders))
        .catch(err => setError(err.message))
    },[])



  return (
    <div>
        <section>
            <div className="container py-5">
                {
                    orders?.map(order => (<OrderCard order={order} />))
                }                
            </div>


        </section>
    </div>
  )
}
