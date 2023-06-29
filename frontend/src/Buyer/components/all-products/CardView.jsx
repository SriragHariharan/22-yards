import React from 'react'
import { Link } from 'react-router-dom'


export default function CardView({productName, mrp, offerPrice, stock, productID, description}) {
  return (
    <>
        <div className="col-lg-3 col-md-6 col-6 d-flex p-1">
            <div className="card w-100">
            <Link to={'../view-product/'+productID} className='link'>
                <img src={`${import.meta.env.VITE_SERVER_IMG}/product-images/${productID}-01.jpg`} className="card-img-top" style={{aspectRatio: "1 / 1"}} />
            </Link>
            <div className="card-body d-flex flex-column">
                <p className="card-title">{productName}</p>
                <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                    <div className="d-flex flex-row mt-3">
                        <p className="mb-1 me-3">₹ {offerPrice}</p>
                        <p className="text-danger me-3"><s>₹ {mrp}</s></p>
                        <p className=" text-success mb-3 me-2"> {Math.floor(((mrp-offerPrice)/offerPrice)*100)}% off</p>
                    </div>
                </div>
            </div>
            </div>
      </div>
    </> 
)
}
