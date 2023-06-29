import React, {useState} from 'react'
import '../styles/Welcomepage.css'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBBtn,

    MDBCollapse,
  } from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { AdminLogout } from '../../redux-tk/reducers/AdminReducer';
import { NavLink } from 'react-router-dom';


export default function Header() {
    const [showBasic, setShowBasic] = useState(false);
    const dispatch = useDispatch()
    //handle logout
    const handleLogout = () => {
        localStorage.setItem('22YardsAdmin', null);
        dispatch(AdminLogout(null))
    }

    const seller = useSelector(state => state?.Admin.seller?.seller)

  return (
    <div style={{backgroundColor:'lavenderblush'}}>
        <div className="header">
            <div className="brand-name">
                <img width='60px' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-196UvngLppQ7fGE1-TQfG75ZKli2l6IdAkNCgK83g&s" alt="" />
                <p> <b>22Yards</b>  <br /> Seller Hub</p>
            </div>
            <div className="auth">
                <MDBBtn className='me-2 btn' color='tertiary'>
                    <div>Hi {seller?.sellerName} !</div>
                </MDBBtn>
                <MDBBtn className='me-5 p-3 btn' color='info' onClick={handleLogout}>
                    <div>Logout</div>
                </MDBBtn>
            </div> 
        </div>
        {/* nav2 */}
        <MDBNavbar expand='md' light className='header-2 p-4'>
            <MDBContainer fluid>
                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowBasic(!showBasic)}
                >
                <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar show={showBasic}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 d-flex justify-content-center'>
                            <NavLink to={'/seller/home'} className='NavLink'>                         Home             </NavLink>
                            <NavLink to={'/seller/home/view-all-products'} className='NavLink'>       All Products     </NavLink>
                            <NavLink to={'/seller/home/orders'} className='NavLink'>                  Orders           </NavLink>
                            <NavLink to={'/seller/home/add-new-product'} className='NavLink'>         Add new Product  </NavLink>
                            <NavLink to={'/seller/home/faq'} className='NavLink'>                     FAQ              </NavLink>
                        </MDBNavbarNav>
                    </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    </div>

  )
}
