import React from 'react'
import { Link } from 'react-router-dom'

function ProductsShort({ productName, mrp, offerPrice, productID }) {
  return (
        <div className="shadow-2 border rounded-3  p-3" style={{backgroundColor:''}}>
          <div className="card-body">
            <div className="row">
              
              <div className="col-md-12 col-lg-3 mb-lg-0">
                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                  <img src={`http://localhost:4000/product-images/${productID}-01.jpg`} className="w-50" />
                </div>
              </div>
              
              <div className="col-md-6 col-lg-5 ">
                <h6>{productName}</h6>
              </div>
              
              <div className="col-md-6 col-lg-3 border-sm-start-none border-start">
                <div className="d-flex flex-row align-items-center mb-1">
                  <h5 className="mb-1 me-2">₹ {offerPrice}</h5>
                  <span className="text-danger h6"><s>₹ {mrp}</s></span>
                </div>
                <div className="d-flex flex-column mt-0">
                  <Link to={'/seller/home/view-product/'+productID} className="btn btn-primary btn-sm">Details</Link>
                </div>
              </div>
            
            </div>
          </div>
        </div>

  )
}

export default ProductsShort