import React from 'react'
import '../../styles/homepage/offers.css'
import image1 from '../../../assets/offers/offer-img1.png'
import image2 from '../../../assets/offers/offer-img2.png'


export default function Offers() {
  return (
    <div className="container-fluid offer pt-5">
    <div className="row px-xl-5">
        <div className="col-md-6 pb-4">
            <div className="position-relative bg-dark text-center text-md-right text-white mb-2 py-5 px-5">
                <img src={image1} />
                <div className="position-relative">
                    <h5 className="text-uppercase text-primary mb-3"> Min 20% off on all products </h5>
                    <h1 className="mb-4 font-weight-semi-bold">ICC CWC Collection</h1>
                    <a className="btn btn-outline-primary py-md-2 px-md-3">Shop Now</a>
                </div>
            </div>
        </div>
        <div className="col-md-6 pb-4">
            <div className="position-relative bg-dark text-center text-md-left text-white mb-2 py-5 px-5">
                <img src={image2} alt="" />
                <div className="position-relative">
                    <h5 className="text-uppercase text-primary mb-3">10% off the all wearables</h5>
                    <h1 className="mb-4 font-weight-semi-bold">IPL Collection</h1>
                    <a className="btn btn-outline-primary py-md-2 px-md-3">Shop Now</a>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}
