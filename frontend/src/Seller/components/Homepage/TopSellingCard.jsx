import React from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardImage,
    MDBRipple
  } from 'mdb-react-ui-kit';


//   this card is a component of the homepage

export default function TopSellingCard() {
  return (
    <MDBCard className='mb-5'>
        <MDBRipple rippleColor='warning' rippleTag='div' className='bg-image hover-overlay'>
            <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
        </MDBRipple>
                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
            <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
            </MDBCardBody>
    </MDBCard>
  )
}
