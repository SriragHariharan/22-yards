import { useEffect, useState } from "react"
import useSellerProductInstance from "../../axios/useSellerProductInstance";

function SoldProducts() {

  const [sellerProductInstance] = useSellerProductInstance();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null)

  useEffect(() => {
    sellerProductInstance.get('orders')
    .then(resp => setOrders(resp.data.data.orders))
    .catch(err => setError(err.message))
  },[])

  let newOrdersNumber = orders?.filter(item => item.paymentSuccess === true).map(item => item.cart.quantity).reduce((accu, curr) => {return accu+curr},0)

  return (
    <div className="pb-1" style={{}}>
        <div className="d-flex flex-column align-items-center border mb-4" style={{padding: "30px", backgroundColor:'pink'}}>
            <h1 className="col-12"> {newOrdersNumber}</h1>
            <h5 className="col-12 font-weight-semi-bold m-0">items sold via 22Yards</h5>
        </div>
    </div>

  )
}

export default SoldProducts