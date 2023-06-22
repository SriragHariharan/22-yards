import React from 'react'
import { Link } from 'react-router-dom'


export default function CardView({productName, mrp, offerPrice, stock, productID, description}) {
  return (
    <>
        {/* <div className="col-lg-3 col-md-6 col-sm-6 col-12 d-flex">
            <div className="card w-100 my-2 shadow-5-strong" >
            <img  src={`http://localhost:4000/product-images/${productID}-01.jpg`} className="card-img-top w-75 h-50 text-center" />
            <div className="card-body d-flex flex-column">
                        <div className="d-flex flex-row">
                        <h5 className="mb-1 me-2">₹ {offerPrice}</h5>
                        <span className="text-danger me-3"><s>₹ {mrp}</s></span>
                        <h5 className=" text-success mb-3 me-2"> {Math.floor(((mrp-offerPrice)/offerPrice)*100)}% off</h5>
                        </div>
                        <h5 className="card-text mb-2">{productName}</h5>
                        <p  className=" text-warning">only {stock} items left...</p>
                        <p>{description.slice(0,70)}...</p>
                    </div>
                    </div>
                </div>  */}
        <div className="col-lg-3 col-md-6 col-6 d-flex p-1">
            <div className="card w-100">
            <Link to={'../view-product/'+productID} className='link'>
                <img src={`http://localhost:4000/product-images/${productID}-01.jpg`} className="card-img-top" style={{aspectRatio: "1 / 1"}} />
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
