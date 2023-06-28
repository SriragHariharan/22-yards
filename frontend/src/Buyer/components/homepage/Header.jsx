import React, { useState } from 'react';
import '../../styles/homepage/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { MDBBadge } from 'mdb-react-ui-kit';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

library.add(faCartShopping, faUser);

//functional component for header || Navbar
function Header() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <div>
        {/* nav2 start */}
        <div className="header-2">
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
                    <MDBNavbarLink> <Link to={'/'} className='link' > Home            </Link> </MDBNavbarLink>
                    <MDBNavbarLink> <Link to={'/all-products'} className='link' >All Products     </Link> </MDBNavbarLink>
                    <MDBDropdown>
                        <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                        Products
                        </MDBDropdownToggle>
                        <MDBDropdownMenu style={{ margin: 0 }}>

                        <MDBDropdownItem link>   <Link className='link' to={'/category/cricket-bat'}>     Cricket bats      </Link></MDBDropdownItem>
                        <MDBDropdownItem link>   <Link className='link' to={'/category/leg-guard'}>       Leg guards        </Link></MDBDropdownItem>
                        <MDBDropdownItem link>   <Link className='link' to={'/category/gloves'}>          Gloves            </Link></MDBDropdownItem>
                        <MDBDropdownItem link>   <Link className='link' to={'/category/cricket-ball'}>    Cricket balls     </Link></MDBDropdownItem>
                        <MDBDropdownItem link>   <Link className='link' to={'/category/kit-bag'}>         Kit bags          </Link></MDBDropdownItem>
                        <MDBDropdownItem link>   <Link className='link' to={'/category/shoes'}>           Shoes             </Link></MDBDropdownItem>
                        <MDBDropdownItem link>   <Link className='link' to={'/category/helmet'}>          Helmets           </Link></MDBDropdownItem>
                        <MDBDropdownItem link>   <Link className='link' to={'/category/protection'}>      Protection        </Link></MDBDropdownItem>
                        <MDBDropdownItem link>   <Link className='link' to={'/category/wearables'}>       Wearables         </Link></MDBDropdownItem>
                        <MDBDropdownItem link>   <Link className='link' to={'/category/accessories'}>     Accessories       </Link></MDBDropdownItem>
                        
                        </MDBDropdownMenu>
                    </MDBDropdown>

                    <MDBNavbarLink> <Link to={'/faq'} className='link' >      FAQ    </Link> </MDBNavbarLink>
                    <MDBNavbarLink> <Link to={'/contact'} className='link' >  Contact us    </Link> </MDBNavbarLink>
                </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
            </MDBNavbar>
        </div>
    </div>
  );
}

export default Header