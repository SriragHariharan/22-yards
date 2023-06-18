import React from 'react'
import '../../styles/homepage/Categories.css'


import image1 from '../../../assets/categories/megalite.jpg'
import image2 from '../../../assets/categories/IMG_7218-copy-1-scaled.jpg'
import image3 from '../../../assets/categories/RP-Lite-2-1-scaled.jpg'
import image4 from '../../../assets/categories/helmet.jpg'
import image5 from '../../../assets/categories/protection.jpg'
import image6 from '../../../assets/categories/shoes.jpg'
import image7 from '../../../assets/categories/ball.jpg'
import image8 from '../../../assets/categories/kit-bag.jpg'
import image9 from '../../../assets/categories/wearable.jpg'
import image10 from '../../../assets/categories/grips.jpg'
import { Link } from 'react-router-dom'

const CategoriesCard = ({categoryName, imageNo}) => {
    return (
            
                <div className="cat-item d-flex flex-column border mb-4" style={{padding: "30px"}}>
                    <p style={{textAlign:'right', color:'#A5A5A9', fontSize:'10px'}}>10 <sup>+</sup> &nbsp;  Products</p>
                    <a className="cat-img position-relative overflow-hidden mb-3">
                        <img className="img-fluid" src={imageNo} alt="" />
                    </a>
                    <h5 className="text-center font-weight-semi-bold m-0">{categoryName}</h5>
                </div>
    )
}


export default function Categories() {
  return (
    <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
            <div className="text-center mb-4">
                <h2 className="section-title px-5"><span className="px-2">Categories</span></h2>
            </div>

            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <Link className='link' to={'/category/cricket-bat/'}>
                    <CategoriesCard categoryName={'cricket bat'} imageNo ={image2} />
                </Link> 
            </div>

            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <Link className='link' to={'/category/leg-guard/'}>
                    <CategoriesCard categoryName={'leg guard'} imageNo ={image1} />
                </Link> 
            </div>


            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <Link className='link' to={'/category/gloves/'}>
                    <CategoriesCard categoryName={'Gloves'} imageNo ={image3} />
                </Link> 
            </div>

            
            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <Link className='link' to={'/category/cricket-ball/'}>
                    <CategoriesCard categoryName={'Cricket Balls'} imageNo ={image7} />
                </Link> 
            </div>

            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <Link className='link' to={'/category/kit-bag'}>
                    <CategoriesCard categoryName={'Kit bags'} imageNo ={image8} />
                </Link> 
            </div>

            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <Link className='link' to={'/category/shoes/'}>
                    <CategoriesCard categoryName={'Shoes'} imageNo ={image6} />
                </Link> 
            </div>

            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <Link className='link' to={'/category/helmet/'}>
                    <CategoriesCard categoryName={'helmet'} imageNo ={image4} />
                </Link> 
            </div>

            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <Link className='link' to={'/category/protection/'}>
                    <CategoriesCard categoryName={'Protection'} imageNo ={image5} />
                </Link> 
            </div>

            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <Link className='link' to={'/category/wearables/'}>
                    <CategoriesCard categoryName={'Wearables'} imageNo ={image9} />
                </Link> 
            </div>

            <div className="col-lg-2 col-md-6 col-6 pb-1">
                <Link className='link' to={'/category/accessories/'}>
                    <CategoriesCard categoryName={'Accessories'} imageNo ={image10} />
                </Link> 
            </div>

            

        </div>
    </div>
    )
}
