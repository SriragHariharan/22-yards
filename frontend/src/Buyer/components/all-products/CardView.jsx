import React from 'react'

export default function CardView() {
  return (
    <>
        <div className="col-lg-3 col-md-6 col-sm-6 col-12 d-flex">
            <div className="card w-100 my-2 shadow-2-strong">
                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp" className="card-img-top" />
                <div className="card-body d-flex flex-column">
                    <div className="d-flex flex-row">
                        <h5 className="mb-1 me-1">$34,50</h5>
                        <span className="text-danger"><s>$49.99</s></span>
                    </div>
                    <p className="card-text">T-shirts with multiple colors, for men and lady</p>
                    <div className="text-warning mb-1 me-2">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                        <span className="ms-1">
                            4.5
                        </span>
                    </div>
                </div>
            </div>
        </div> 
    </> 
)
}
