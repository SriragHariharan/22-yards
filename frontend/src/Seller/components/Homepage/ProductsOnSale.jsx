import { useEffect, useState } from "react"
import useSellerProductInstance from "../../axios/useSellerProductInstance";

function ProductsOnSale() {

  const [sellerProductInstance] = useSellerProductInstance();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null)

  useEffect(() => {
    sellerProductInstance.get('/')
    .then(resp => setOrders(resp.data.data.products))
    .catch(err => setError(err.message))
  },[])

  let newOrdersNumber = orders?.length
  console.log(newOrdersNumber);

  return (
    <div className="pb-1" style={{}}>
        <div className="d-flex flex-column align-items-center border mb-4" style={{padding: "30px", backgroundColor:'lavender'}}>
            <h1 className="col-12">{newOrdersNumber}</h1>
            <h5 className="col-12 font-weight-semi-bold m-0">items on live for sale</h5>
        </div>
    </div>

  )
}

export default ProductsOnSale