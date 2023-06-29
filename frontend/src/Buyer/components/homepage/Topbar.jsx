import React from 'react'
import {
    MDBInputGroup,
    MDBIcon
  } from 'mdb-react-ui-kit';

import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';


export default function Topbar() {
  const cart = useSelector(state => state.cart.cart);
  const user = useSelector(state => state.User.user)
  return (
    // <!-- Jumbotron -->
    <div className="mt-3 mb-3 text-center bg-white">
      <div className="container">
        <div className="row gy-3">
          
          {/* <!-- Left elements --> */}
          <Link to={'/'} className="link col-lg-2 col-md-1 col-3 mt-2">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-196UvngLppQ7fGE1-TQfG75ZKli2l6IdAkNCgK83g&s" height="55" /> 
              <br/> <p className=' mt-0 text-dark'>22Yards</p>
          </Link>
          {/* <!-- Left elements --> */}
  
          {/* <!-- Right elements --> */}
          <div className=" col-lg-10 col-md-11 col-8 mt-3">
            <div className="d-flex float-end">
              
              <Link to={'/user/login'} className="me-1 border rounded py-2 px-2 nav-link d-flex align-items-center"> 
                <i className="fas fa-user-alt m-1 me-md-2"></i>
              </Link>

              <Link to={'/search'} className="me-1 border rounded py-2 px-2 nav-link d-flex align-items-center"> 
                <i className="fa-solid fa-lg fa-magnifying-glass m-1 me-md-2"></i>
              </Link>
                            
              <Link to={'cart'} className="border rounded py-2 px-2 nav-link d-flex align-items-center"> 
                  <i className="fas fa-shopping-cart"></i> &nbsp; &nbsp; <span className='h5'><sup><b>{cart?.length}</b></sup></span>
              </Link>

            </div>
          </div>
          {/* <!-- Right elements --> */}
  
        </div>
      </div>
    </div>
  )
}
