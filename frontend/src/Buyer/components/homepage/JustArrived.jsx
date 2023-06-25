import React, { useState, useEffect } from 'react'
import '../../styles/homepage/Justarrived.css'
import BuyerProductInstance from '../../axios/BuyerProductInstance'
import { Link } from 'react-router-dom';


export default function JustArrived() {
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        BuyerProductInstance.get('sort-by-date/-1')
        .then(resp => {
            if(resp.data.success === true){
                setProducts(resp.data.data.products)
            }else{
                setError(resp.data.message)
            }
        }).catch(err => setError(err.message))
    }, [])

  return (
    <div className="container-fluid pt-5">
        <div className="text-center mb-4">
            <h2 className="section-title px-5"><span className="px-2">Just  Arrived</span></h2>
        </div>
        <div className="row px-xl-5 pb-3">
            
            { products?.slice(0,8).map(product => (
                <div className="col-lg-3 col-md-6 col-12 pb-1 text-center">
                    <Link className='link' to={'/view-product/'+product?._id}>
                        <div className="cat-item d-flex flex-column border mb-4" style={{padding: "30px"}}>
                            <p style={{textAlign:'right', color:'#A5A5A9', fontSize:'10px'}}>10 <sup>+</sup> &nbsp;  Products</p>
                            <a href="" className="cat-img position-relative overflow-hidden mb-3">
                                <img className="img-fluid" src={`http://localhost:4000/product-images/${product._id}-01.jpg`} alt="" />
                            </a>
                            <h5 className="text-center font-weight-semi-bold mb-3">{product.productName.slice(0,20)}.....</h5>
                            
                            <div>
                                <span className='text-dark'>₹ {product.offerPrice}</span>           &nbsp; 
                                <span className='text-danger'><s>₹{product.mrp}</s></span>   &nbsp;
                                <span className='text-success'>{Math.floor(((product.mrp - product.offerPrice)/product.offerPrice)*100)}% off</span>
                            </div>
                        </div>
                    </Link>
                </div>
            ))
            }

        </div>
    </div>
    )
}
