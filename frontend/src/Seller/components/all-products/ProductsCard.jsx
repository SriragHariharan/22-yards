import React from 'react'

export default function ProductsCard() {
  return (
    <div>
        <div className="card shadow p-4 m-3" style={{backgroundColor:'#ececec'}}>
            <div className="row align-items-center">
                <aside className="col-md-3">
                    <a>
                        <img width='150vh' src="http://localhost:4000/product-images/648083cf0480f37ae5a5ea65-01.jpg" alt="premium watch" />
                    </a>
                </aside> 
                <div className="col-md-6">
                    <div className="info-main">
                        <a className="h5 title"> Apple Watch Series 3 </a>
                        <div className="mt-3">
                        </div>
                        <p>Monitor your health. Track your workouts. Get the motivation you need to achieve your fitness goals. And stay connected to the people and information you care about.</p>
                    </div>
                </div> 
                <div className="col-12 col-md-3">
                    <div className="d-flex align-items-center">
                        <span className="h5 mb-0 text-gray text-through me-2">
                            $299.00
                        </span>
                        <span className="h6 mb-0 text-danger">$199.00</span>
                    </div> 
                    <span className="text-success medium mt-3">Stock : 3 left</span>
                    <div className="d-grid gap-2 mt-4">
                        <a className="btn btn-info btn-sm mb-5">
                            Details
                        </a>
                    </div>
                </div> 
            </div> 
        </div>
    </div>
  )
}
