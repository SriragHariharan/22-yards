import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <MDBFooter style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding:'10px' }} className='text-center text-lg-start text-muted'>
      

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                22 yards Pvt. Ltd
              </h6>
              <p>
                22 yards is a sporting company mainly focused on selling cricketing goods.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  cricket Bats
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Cricket Pads
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Cricket Gloves
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Wearables
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Shipping & Returns
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Refund policy
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  FAQ
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                2/717, Palakkad, KL, IND
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                info@22yards.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 91 987 6543 210
              </p>
              <p>
                <MDBIcon color='secondary' fab icon='whatsapp' className='me-3' /> + 91 9876 543 210
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {new Date().getFullYear()} Copyright : &nbsp;
        <Link className='text-reset fw-bold' to={'/'}>
          22yards.com
        </Link>
      </div>
    </MDBFooter>
  );
}

export default Footer