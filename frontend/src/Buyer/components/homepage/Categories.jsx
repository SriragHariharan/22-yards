import React from 'react'
import '../../styles/homepage/Categories.css'


import image1 from '../../../assets/best-selling/megalite.jpg'
import image2 from '../../../assets/best-selling/IMG_7218-copy-1-scaled.jpg'
import image3 from '../../../assets/best-selling/RP-Lite-2-1-scaled.jpg'
import image6 from '../../../assets/best-selling/shoes.jpg'
import image7 from '../../../assets/best-selling/ball.jpg'
import image8 from '../../../assets/best-selling/kit-bag.jpg'

export default function Categories() {
  return (
    <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
            <div className="text-center mb-4">
                <h2 className="section-title px-5"><span className="px-2">Categories</span></h2>
            </div>

            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <div className="cat-item d-flex flex-column border mb-4" style={{padding: "30px"}}>
                    <p style={{textAlign:'right', color:'#A5A5A9', fontSize:'10px'}}>10 <sup>+</sup> &nbsp;  Products</p>
                    <a className="cat-img position-relative overflow-hidden mb-3">
                        <img className="img-fluid" src={image2} alt="" />
                    </a>
                    <h5 className="text-center font-weight-semi-bold m-0">Bats</h5>
                </div>
            </div>
            
            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <div className="cat-item d-flex flex-column border mb-4" style={{padding: "30px"}}>
                    <p style={{textAlign:'right', color:'#A5A5A9', fontSize:'10px'}}>10 <sup>+</sup> &nbsp;  Products</p>
                    <a className="cat-img position-relative overflow-hidden mb-3">
                        <img className="img-fluid" src={image1} alt="" />
                    </a>
                    <h5 className="text-center font-weight-semi-bold m-0">Legguards</h5>
                </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <div className="cat-item d-flex flex-column border mb-4" style={{padding: "30px"}}>
                    <p style={{textAlign:'right', color:'#A5A5A9', fontSize:'10px'}}>10 <sup>+</sup> &nbsp;  Products</p>
                    <a className="cat-img position-relative overflow-hidden mb-3">
                        <img className="img-fluid" src={image3} alt="" />
                    </a>
                    <h5 className="text-center font-weight-semi-bold m-0">Gloves</h5>
                </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <div className="cat-item d-flex flex-column border mb-4" style={{padding: "30px"}}>
                    <p style={{textAlign:'right', color:'#A5A5A9', fontSize:'10px'}}>10 <sup>+</sup> &nbsp;  Products</p>
                    <a className="cat-img position-relative overflow-hidden mb-3">
                        <img className="img-fluid" src={image7} alt="" />
                    </a>
                    <h5 className="text-center font-weight-semi-bold m-0">Balls</h5>
                </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <div className="cat-item d-flex flex-column border mb-4" style={{padding: "30px"}}>
                    <p style={{textAlign:'right', color:'#A5A5A9', fontSize:'10px'}}>10 <sup>+</sup> &nbsp;  Products</p>
                    <a className="cat-img position-relative overflow-hidden mb-3">
                        <img className="img-fluid" src={image8} alt="" />
                    </a>
                    <h5 className="text-center font-weight-semi-bold m-0">Kits</h5>
                </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <div className="cat-item d-flex flex-column border mb-4" style={{padding: "30px"}}>
                    <p style={{textAlign:'right', color:'#A5A5A9', fontSize:'10px'}}>10 <sup>+</sup> &nbsp;  Products</p>
                    <a className="cat-img position-relative overflow-hidden mb-3">
                        <img className="img-fluid" src={image6} alt="" />
                    </a>
                    <h5 className="text-center font-weight-semi-bold m-0">Accessories</h5>
                </div>
            </div>
        </div>
    </div>
    )
}
