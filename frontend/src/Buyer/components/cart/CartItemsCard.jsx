import React, { useMemo, useState, useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import {ChangeProductQuantity, RemoveCartItem, SetCartTotal } from '../../../redux-tk/reducers/CartReducer';
import { ToastContainer, toast } from 'react-toastify';
import BuyerProductInstance from '../../axios/BuyerProductInstance';

export default function CartItemsCard({item, setBillAmount}) {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart);  //here we get the cart items in this variable
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        BuyerProductInstance.get('get-single-product/'+item?.productID)
        .then(resp => {
            if(resp.data.success === false){
                setError(resp.data.message);
                return false;
            }else{
                setProduct(resp.data.data.product);
                return resp.data.data.product.category;
            }
        }).catch(err => setError(err.message))
    },[])

    // product?.stock

    //toast message
    const showToastMessage = () => {
        toast('Product removed from cart', {
            position: toast.POSITION.TOP_CENTER
        });
    };

    //change quantity
    const handleQuantity = (productID, quantity) => {
        dispatch(ChangeProductQuantity({productID, quantity}))
    }

    //delete product from cart
    const handleRemoveCartItem = (productID) => {
        var response = confirm("Are you sure you want to delete this item ?");  
    if (response == true) {  
        dispatch(RemoveCartItem(productID))
        showToastMessage()
        } else {  
            return  
        }  
    }

    //calculate bill amount
    useMemo(() =>{
        let cartTotal = cart.map(product =>product.totalPrice).reduce((accu, curr) => accu+curr, 0)
        setBillAmount(cartTotal);
        dispatch(SetCartTotal(cartTotal))
    },[cart])


  return (
    <div>
        <ToastContainer />
            <div className="row gy-3 mb-4">
                <div className="col-lg-5">
                        <div className="me-lg-5">
                            <div className="d-flex">
                                <img src={`${import.meta.env.VITE_SERVER_IMG}/product-images/${item?.productID}-01.jpg`} className=" rounded me-3" style={{width: "96px", height: "96px"}} />
                            <div>
                            <a className="nav-link">{item.productName}</a>
                            <p className="text-muted">Size : {item.size}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                        <div className='me-5'>
                            <div>
                                <span className="btn btn-warning" onClick={() => item.quantity >1 && handleQuantity(item.productID, -1)}>-</span>
                                <span>&nbsp; &nbsp; {item.quantity} &nbsp; &nbsp;</span>
                                {
                                    (product?.stock !== item.quantity) ?
                                    <span className="btn btn-success" onClick={() => item.quantity <5 && handleQuantity(item.productID, +1)}>+</span>
                                    :
                                    <div className="small text-danger">Only {product?.stock} items are avilable in stock</div>
                                }
                            </div>
                        </div>
                        <div>
                            <div className="text">₹ {item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div> <br />
                            <div className="text-muted text-nowrap"> ₹ {item.offerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / per item </div>
                        </div>
                    </div>
                    <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                        <div onClick={() => handleRemoveCartItem(item?.productID)} className="float-md-end">
                            <div className="btn btn-light border text-danger icon-hover-danger">
                                <i className="fa fa-trash" aria-hidden="true"></i> &nbsp; &nbsp;
                                Remove
                            </div>
                        </div>
                </div>
            </div>
            <hr />
    </div>
  )
}
