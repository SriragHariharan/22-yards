import React, {useEffect, useState} from 'react'

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import {  faPenToSquare,    } from "@fortawesome/free-solid-svg-icons";
library.add( faPenToSquare, );

// modals
import EditProductName from '../components/product-details/EditProductName';
import EditPriceModal from '../components/product-details/EditPriceModal';
import { useParams } from 'react-router-dom';
import useSellerProductInstance from '../axios/useSellerProductInstance';



export default function ProductDetailsSeller() {
    const [error, setError] = useState(null)
    const [product, setProduct] = useState({})
    const [sellerProductInstance] = useSellerProductInstance()
    const [image, setImage] = useState('01');
    const {id} = useParams()

    //fetch product details on page load
    useEffect(()=>{
        sellerProductInstance.get('/get-product/'+id)
        .then(resp => {
            if(resp.data.success === false){
                setError(resp.data.message)
            }else{
                console.log(resp.data.data.product)
                setProduct(resp.data.data.product)
            }
        }).catch(err => setError(err.message))
    },[])
///get-product/:id

    //edit product name modal
    const [productNameModal, setProductNameModal] = useState(false);
    const toggleProductNameModal = () => setProductNameModal(!productNameModal);

    //edit product price modal
    const [productPriceModal, setProductPriceModal] = useState(false);
    const toggleProductPriceModal = () => setProductPriceModal(!productPriceModal);

  return (
    <>

    <EditProductName productNameModal={productNameModal} setProductNameModal={setProductNameModal} toggleProductNameModal={toggleProductNameModal}  />
    <EditPriceModal  productPriceModal={productPriceModal} setProductPriceModal={setProductPriceModal} toggleProductPriceModal={toggleProductPriceModal}  />
    {/* modals ends here */}
    
    
    
    <section className="py-5">
    <div className="container">
        <div className="row gx-5">
        <aside className="col-lg-6">
            <div className="border rounded-4 mb-3 d-flex justify-content-center">
            <a onClick={() => setImage('01')} data-fslightbox="mygalley" className="rounded-4">
                <img style={{maxWidth:'100%', maxHeight:'100vh', margin:"auto"}} className="rounded-4 fit" src={`http://localhost:4000/product-images/${product._id}-${image}.jpg`} />
            </a>
            </div>
            <div className="d-flex justify-content-center mb-3">
            <a onClick={() => setImage('01')} data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb">
                <img width="90" height="90" className="rounded-2" src={`http://localhost:4000/product-images/${product._id}-01.jpg`} />
            </a>
            <a onClick={() => setImage('02')} data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb">
                <img width="90" height="90" className="rounded-2" src={`http://localhost:4000/product-images/${product._id}-02.jpg`}  />
            </a>
            <a onClick={() => setImage('03')} data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb" >
                <img width="90" height="90" className="rounded-2" src={`http://localhost:4000/product-images/${product._id}-03.jpg`}  />
            </a>
            </div>
        </aside>

        <main className="col-lg-6">
            <div className="ps-lg-3">
            <h4 className="title text-dark">
                {product.productName}  <FontAwesomeIcon icon={faPenToSquare} onClick={toggleProductNameModal} />
            </h4>
            <div className="mt-3 d-flex flex-row ">
                <div className='me-4'>
                    <span className="h4"><s> ₹ {product.mrp}</s></span>
                </div>
                <div  className='me-4'>
                    <span className="h4">₹ {product.offerPrice}</span>
                    &nbsp; &nbsp; <FontAwesomeIcon icon={faPenToSquare} onClick={toggleProductPriceModal} />
                </div>
                <div>
                    <span className="h4 text-success">₹ {product.mrp - product.offerPrice} off</span>
                </div>
            </div>


            <div className="d-flex flex-row my-3">               
                <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>{product.stock} orders</span>
                <span className="text-success ms-2">In stock</span>
            </div>

            <div className="d-flex flex-row my-3">               
                <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>15 items</span>
                <span className="text-success ms-2">Sold</span>
            </div>


            <p>
                {product.description}
            </p>

            <div className="row">
                <dt className="col-3">Category</dt>
                <dd className="col-9">{product.category}</dd>

                <dt className="col-3">Color</dt>
                <dd className="col-9">{product.productColor}</dd>

                <dt className="col-3">Material</dt>
                <dd className="col-9">{product.productMaterial}</dd>

                <dt className="col-3">Brand</dt>
                <dd className="col-9">{product.brand}</dd>
            </div>

            <hr />

            <a className="me-3 btn btn-danger"> Delete Product </a>
            </div>
        </main>
        </div>
    </div>
    </section>


    <section className="bg-light border-top py-4">
        <div className="container">
            <div className="row gx-4">
                <div className="col-lg-12 mb-4">
                    <div className="border rounded-2 px-3 py-2 bg-white">

                        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                            <li className="nav-item d-flex" role="presentation">
                                <a className="nav-link d-flex align-items-center justify-content-center w-100 active" id="ex1-tab-1" data-mdb-toggle="pill" href="#ex1-pills-1" role="tab" aria-controls="ex1-pills-1" aria-selected="true">Specification</a>
                            </li>
                        </ul>


                        <div className="tab-content" id="ex1-content">
                            <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                            <p>
                                {product.specification}
                            </p>
                            <div className="row mb-2 mt-5">
                                <div className="col-12 col-md-6">
                                <ul className="list-unstyled mb-0">
                                    <li><i className="fas fa-check text-success me-2"></i>{product.feature1}</li>
                                    <li><i className="fas fa-check text-success me-2"></i>{product.feature2}</li>
                                </ul>
                                </div>
                                <div className="col-12 col-md-6 mb-0">
                                <ul className="list-unstyled">
                                    <li><i className="fas fa-check text-success me-2"></i>{product.feature3}</li>
                                    <li><i className="fas fa-check text-success me-2"></i>{product.feature4}</li>
                                </ul>
                                </div>
                            </div>
                            <table className="table border mt-3 mb-2">
                                <tbody>
                                    <tr>
                                    <th className="py-2">Brand:</th>
                                    <td className="py-2">{product.brand}</td>
                                    </tr>
                                    <tr>
                                    <th className="py-2">Color:</th>
                                    <td className="py-2">{product.productColor}</td>
                                    </tr>
                                    <tr>
                                    <th className="py-2">Weight :</th>
                                    <td className="py-2">{product.weight}</td>
                                    </tr>
                                    <tr>
                                    <th className="py-2">Items in box :</th>
                                    <td className="py-2">{product.itemsInBox}</td>
                                    </tr>
                                    <tr>
                                    <th className="py-2">Warranty :</th>
                                    <td className="py-2">{product.warranty}</td>
                                    </tr>
                                    <tr>
                                    <th className="py-2">Delivery :</th>
                                    <td className="py-2">3 - 5 bussiness days</td>
                                    </tr>
                                </tbody>
                                
                            </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
    
    </>
  )
}
