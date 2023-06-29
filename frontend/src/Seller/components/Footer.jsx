import React from 'react'
import {
    MDBInputGroup,
    MDBInput,
    MDBFooter,
    MDBIcon,
    MDBContainer,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div>
        {/* footer starts here */}
        <MDBFooter style={{backgroundColor:'lavenderblush'}} className='text-center text-lg-start text-muted pt-2 mt-5'>
            <section>
                <MDBContainer className='text-center text-md-start mt-5'>
                <MDBRow className='mt-3'>
                    <MDBCol md='3' lg='4' xl='5' className='mx-auto mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>
                        <MDBIcon color='secondary' icon='gem' className='me-3' />
                        22Yards
                    </h6>
                    <p>
                        Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit
                        amet, consectetur adipisicing elit.Here you can use rows and columns to organize your footer 
                        content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                    </MDBCol>


                    <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                    <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                    <p>
                        <MDBIcon color='secondary' icon='home' className='me-2' />
                        New York, NY 10012, US
                    </p>
                    <p>
                        <MDBIcon color='secondary' icon='envelope' className='me-3' />
                        info@example.com
                    </p>
                    <p>
                        <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
                    </p>
                    <p>
                        <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
                    </p>
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Copyright : 
                <Link className='text-reset fw-bold' to={'/'}>
                22Yards.com
                </Link>
            </div>
        </MDBFooter>
    </div>
  )
}

export default Footer