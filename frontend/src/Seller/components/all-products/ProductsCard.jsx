import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductsCard({productName, stock, mrp, offerPrice, productID, description}) {
  return (
    <div className='border'>
            <div className="row justify-content-center">
                <aside className="col-md-3">
                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                        <img className='w-50 mt-2 ms-5' src={`http://localhost:4000/product-images/${productID}-01.jpg`} alt="premium watch" />
                    </div>
                </aside> 
                <div className="col-md-6">
                    <div className="info-main mt-4">
                        <div className="h4 title"> {productName} </div>
                        <div className="mt-3">
                        </div>
                        <p>{description.slice(0,100)}.....</p>
                    </div>
                </div> 
                <div className="col-12 col-md-3 mt-4">
                    <div className="d-flex align-items-center">
                        <span className="h4 text-secondary text-through me-2">
                            ₹ {offerPrice}
                        </span>
                        <span className="h6 text-danger">₹ {mrp}</span>
                    </div> 
                    <span className="text-success medium mt-3">Stock : {stock} left</span>
                    <div className="d-grid gap-2 me-5 mt-4">
                        <Link to={'/seller/home/view-product/'+productID} className="btn btn-info btn-sm mb-3">
                            Details
                        </Link>
                    </div>
                </div> 
            </div> 
        </div>
  )
}
