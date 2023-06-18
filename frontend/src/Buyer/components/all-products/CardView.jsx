import React from 'react'
import { Link } from 'react-router-dom'


export default function CardView({productName, mrp, offerPrice, stock, productID, description}) {
  return (
    <>
        <div className="col-lg-3 col-md-6 col-sm-6 col-12 d-flex">
            <div className="card w-100 my-2 shadow-5-strong" >
                <Link to={'../view-product/'+productID} className='link'>
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
                </Link>
            </div>
        </div> 
    </> 
)
}
