import React from 'react'
import '../../styles/homepage/Best-selling.css'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
  } from 'mdb-react-ui-kit';


//this card is a reuseable component for listing top selling products in homepage
function BSCard({product_name, image}) {
  return (
    <MDBCard className='card'>
        <MDBCardImage className='card-image' src={image} position='top' alt='...' />
        <MDBCardBody className='card-body'>
            <MDBCardTitle>{product_name}</MDBCardTitle>
            <MDBCardText></MDBCardText>
        </MDBCardBody>
    </MDBCard>
  )
}

export default BSCard