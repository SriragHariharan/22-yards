import React from 'react'

export default function CheckoutProductCard({item}) {
  return (
    <div>
        <div className="d-flex align-items-center mb-4">
            <div className="me-3 position-relative">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-dark">
                    {item?.quantity}
                </span>
                <img src={`http://localhost:4000/product-images/${item?.productID}-01.jpg`} style={{height: "96px", width: "96x"}} className="img-sm rounded border" />
            </div>
            <div>
                <div>
                    {item?.productName}
                </div>
                <div className="price text-muted mb-3">Price: ₹ {item?.offerPrice}</div>
            </div>
        </div>
    </div>
  )
}
