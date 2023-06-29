import React from 'react'
import { Link, } from 'react-router-dom'

export default function SimilarItemsCard({product}) {

  return (
            <Link className='link' to={'../view-product/'+product?._id}>
                <div className="d-flex mb-3">
                        <div className="me-3">
                            <img src={`${import.meta.env.VITE_SERVER_IMG}/product-images/${product?._id}-01.jpg`} style={{minWidth: "96px", height: "96px"}} className="img-md img-thumbnail" />
                        </div>
                        <div className="info">
                            <div className="nav-link mb-1">
                                {product?.productName.slice(0,30)}... 
                            </div>
                            <strong className="text-success mt-5 me-2"> ₹ {product?.offerPrice}</strong> <span className="text-danger"><s>₹{product?.mrp}</s> </span>
                            <br />
                            <small>Size : {product?.size} </small> 
                        </div>
                </div>
            </Link>
    )
}
