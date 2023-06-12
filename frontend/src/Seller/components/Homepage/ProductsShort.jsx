import React from 'react'
import { Link } from 'react-router-dom'

function ProductsShort() {
  return (
        <div className="shadow-2 border rounded-3  p-3" style={{backgroundColor:'white'}}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                  <img src="http://localhost:4000/product-images/648083cf0480f37ae5a5ea65-02.jpg" className="w-75" />
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-6">
                <h5>Quant trident shirts</h5>
                <h6 className='text-success'>Stock : 16</h6>
                <p className="text-truncate mb-4 mb-md-0">
                  Size : Mens
                </p>
              </div>
              <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                <div className="d-flex flex-row align-items-center mb-1">
                  <h4 className="mb-1 me-1">$13.99</h4>
                  <span className="text-danger"><s>$20.99</s></span>
                </div>
                <div className="d-flex flex-column mt-4">
                  <Link to={'/seller/home/view-product/'} className="btn btn-primary btn-sm">Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

  )
}

export default ProductsShort