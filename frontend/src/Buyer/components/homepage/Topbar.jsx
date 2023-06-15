import React from 'react'
import {
    MDBInputGroup,
    MDBIcon
  } from 'mdb-react-ui-kit';


export default function Topbar() {
  return (
    // <!-- Jumbotron -->
    <div className="mt-3 mb-3 text-center bg-white">
      <div className="container">
        <div className="row gy-3">
          
          {/* <!-- Left elements --> */}
          <div className="col-lg-2 col-sm-4 col-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-196UvngLppQ7fGE1-TQfG75ZKli2l6IdAkNCgK83g&s" height="75" /> 
              <br/> <h4>22Yards</h4>
          </div>
          {/* <!-- Left elements --> */}
  
          {/* <!-- Center elements --> */}
          <div className="order-lg-last col-lg-4 col-sm-8 col-8 mt-5">
            <div className="d-flex float-end">
              <a className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-user-alt m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Sign in</p> </a>
              {/* <a className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-heart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Wishlist</p> </a> */}
              <a className="border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-shopping-cart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">My cart</p> </a>
            </div>
          </div>
          {/* <!-- Center elements --> */}
  
          {/* <!-- Right elements --> */}
          <div className="col-lg-6 col-md-12 col-12 mt-5">
            <MDBInputGroup className='mb-3' noBorder >
                <input className='form-control border-3 p-3' type='text' placeholder='Search'  />
                <MDBIcon fas icon='search' style={{backgroundColor:'black', padding:'8px', color:'white', paddingLeft:'20px', paddingRight:"20px", cursor:'pointer'}} />
            </MDBInputGroup>
          </div>
          {/* <!-- Right elements --> */}
        </div>
      </div>
    </div>
  )
}