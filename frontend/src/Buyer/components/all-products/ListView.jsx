import React from 'react'

export default function ListView() {
  return (
        <div className="col-md-10">
            <div className="card shadow-0 border rounded-3">
                <div className="card-body">
                    <div className="row g-0">
                        <div className="col-xl-3 col-md-3 d-flex justify-content-center">
                            <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                            <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp" className="w-50" />
                            <a href="#!">
                                <div className="hover-overlay">
                                <div className="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
                                </div>
                            </a>
                            </div>
                        </div>

                        <div className="col-xl-5 col-md-4 col-sm-6   me-5">
                            <h5>Rucksack Backpack Jeans</h5>
                            <div className="d-flex flex-row">
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
                                <span className="text-muted">154 orders</span>
                            </div>
                            <p className="text mb-4 mb-md-0">
                                Short description about the product goes here, for ex its features. Lorem ipsum dolor sit amet with hapti you enter into any new area of science, you almost lorem ipsum is great text
                                consectetur adipisicing
                            </p>
                        </div>

                        <div className="col-xl-3 col-md-3 col-sm-5">
                            <div className="d-flex flex-row align-items-center mb-1">
                                <h4 className="mb-1 me-1">$34,50</h4>
                                <span className="text-danger"><s>$49.99</s></span>
                            </div>
                            <h6 className="text-success">Free shipping</h6>
                            <div className="mt-4">
                                <button className="btn btn-dark shadow-0" type="button">Details</button>
                                {/* <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i className="fas fa-heart fa-lg px-1"></i></a> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    </div>
    )
}
