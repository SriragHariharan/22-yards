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
                <div className="text-center mb-4">
                    <h4 className="section-title px-5"><span className="px-2">Your Orders</span></h4>
                </div>
                {
                    orders?.length ===0 && <div className="text-danger text-center p-5 m-5 h1">Sorry You have no orders yet</div>
                }
                {
                    orders?.length >0 && orders?.map(order => (<OrderCard order={order} />))
                }                
            </div>


        </section>
    </div>
  )
}
