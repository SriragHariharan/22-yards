import React from 'react'
import '../../styles/homepage/Justarrived.css'


export default function JustArrived() {
  return (
    <div className="container-fluid pt-5">
        <div className="text-center mb-4">
            <h2 className="section-title px-5"><span className="px-2">Just  Arrived</span></h2>
        </div>
        <div className="row px-xl-5 pb-3">
            
            <div className="col-lg-4 col-md-6 col-6 pb-1">
                <div className="cat-item d-flex flex-column border mb-4" style={{padding: "30px"}}>
                    <p style={{textAlign:'right', color:'#A5A5A9', fontSize:'10px'}}>10 <sup>+</sup> &nbsp;  Products</p>
                    <a href="" className="cat-img position-relative overflow-hidden mb-3">
                        <img className="img-fluid" src="https://gmcricket.in/media/catalog/product/cache/757ea7d2b7282843694bdb6de7a23598/d/i/diamond-808-english-willow-cricket-bat_1.jpg" alt="" />
                    </a>
                    <h5 className="text-center font-weight-semi-bold m-0">Cricket bats</h5>
                </div>
            </div>
        </div>
    </div>
    )
}
