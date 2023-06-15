import React from 'react'

export default function Features() {
  return (
    <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
            <div className="col-lg-3 col-md-6 col-sm-6 pb-1">
                <div className="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                    <h1 className="fa fa-check m-0 mr-3 me-4"></h1>
                    <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 pb-1">
                <div className="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                    <h1 className="fa fa-shipping-fast m-0 mr-2  me-4"></h1>
                    <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 pb-1">
                <div className="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                    <h1 className="fas fa-exchange-alt m-0 mr-3 me-4"></h1>
                    <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 pb-1">
                <div className="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                    <h1 className="fa fa-phone-volume m-0 mr-3 me-4"></h1>
                    <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
                </div>
            </div>
        </div>
    </div>
  )
}
