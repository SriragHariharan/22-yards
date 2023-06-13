import React, {useState} from 'react'
import '../styles/Welcomepage.css'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarLink,
    MDBBtn,

    MDBCollapse,
  } from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { AdminLogout } from '../../redux-tk/reducers/AdminReducer';


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
    <>
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
                            <MDBNavbarLink> Home             </MDBNavbarLink>
                            <MDBNavbarLink> All Products     </MDBNavbarLink>
                            <MDBNavbarLink> Orders           </MDBNavbarLink>
                            <MDBNavbarLink> Add new Product  </MDBNavbarLink>
                            <MDBNavbarLink> FAQ     </MDBNavbarLink>
                        </MDBNavbarNav>
                    </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    </>

  )
}
