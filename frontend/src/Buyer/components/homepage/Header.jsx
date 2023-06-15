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
                    <MDBNavbarLink> Home             </MDBNavbarLink>
                    <MDBNavbarLink> All Products     </MDBNavbarLink>
                    <MDBNavbarLink> Best selling     </MDBNavbarLink>

                    <MDBDropdown>
                        <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                        Products
                        </MDBDropdownToggle>
                        <MDBDropdownMenu style={{ margin: 0 }}>
                        <MDBDropdownItem link>English willow bats                   </MDBDropdownItem>
                        <MDBDropdownItem link>Kashmir willow bats                   </MDBDropdownItem>
                        <MDBDropdownItem link>Batting Pads                          </MDBDropdownItem>
                        <MDBDropdownItem link>Helmets                               </MDBDropdownItem>
                        <MDBDropdownItem link>Leather balls                         </MDBDropdownItem>
                        <MDBDropdownItem link>Elbow guards                          </MDBDropdownItem>
                        <MDBDropdownItem link>Batting gloves                        </MDBDropdownItem>
                        <MDBDropdownItem link>Chest Guards                          </MDBDropdownItem>
                        <MDBDropdownItem link>Abdomen Guards                        </MDBDropdownItem>
                        <MDBDropdownItem link>Thigh Guards                          </MDBDropdownItem>
                        <MDBDropdownItem link>Cricket shoes                         </MDBDropdownItem>
                        <MDBDropdownItem link>Wicket keeping pads                   </MDBDropdownItem>
                        <MDBDropdownItem link>Wicket keeping gloves                 </MDBDropdownItem>
                        <MDBDropdownItem link>Fielding Pads                         </MDBDropdownItem>
                        <MDBDropdownItem link>Tennis Balls                          </MDBDropdownItem>
                        {/* <MDBDropdownItem link>                  </MDBDropdownItem>
                        <MDBDropdownItem link>                  </MDBDropdownItem>
                        <MDBDropdownItem link>                  </MDBDropdownItem>
                        <MDBDropdownItem link>                  </MDBDropdownItem> */}
                        </MDBDropdownMenu>
                    </MDBDropdown>

                    <MDBDropdown>
                        <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                        Categories
                        </MDBDropdownToggle>
                        <MDBDropdownMenu style={{ margin: 0 }}>
                        <MDBDropdownItem link>Batting               </MDBDropdownItem>
                        <MDBDropdownItem link>Bowling               </MDBDropdownItem>
                        <MDBDropdownItem link>Wicket Keeping        </MDBDropdownItem>
                        <MDBDropdownItem link>Fielding              </MDBDropdownItem>
                        <MDBDropdownItem link>Umpire Acessories     </MDBDropdownItem>
                        <MDBDropdownItem link>Coach Acessories      </MDBDropdownItem>
                        <MDBDropdownItem link>Others                </MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>

                     <MDBNavbarLink> FAQ     </MDBNavbarLink>
                </MDBNavbarNav>

                {/* <form className='d-flex input-group w-auto'>
                    <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
                    <MDBBtn color='primary'>Search</MDBBtn>
                </form> */}
                </MDBCollapse>
            </MDBContainer>
            </MDBNavbar>
        </div>
    </div>
  );
}

export default Header