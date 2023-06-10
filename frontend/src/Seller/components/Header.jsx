import React, {useState} from 'react'
import '../styles/Welcomepage.css'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
  } from 'mdb-react-ui-kit';
export default function Header() {
    const [showBasic, setShowBasic] = useState(false);
  return (
    <>
        <div className="header">
            <div className="brand-name">
                <img width='60px' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-196UvngLppQ7fGE1-TQfG75ZKli2l6IdAkNCgK83g&s" alt="" />
                <p> <b>22Yards</b>  <br /> Seller Hub</p>
            </div>
            <div className="auth">
                {/* <MDBBtn className='me-5 p-3 btn' color='tertiary'>
                    <div><b> Hi Srirag</b></div>
                </MDBBtn> */}
                <MDBBtn className='me-5 p-3 btn' color='info'>
                    <div>Logout</div>
                </MDBBtn>
            </div> 
        </div>
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
