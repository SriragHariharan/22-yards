import React from 'react'
import '../../styles/homepage/Best-selling.css'

import { Container, Row, Col } from 'react-bootstrap';
//images import
import image1 from '../../assets/best-selling/sg test.jpg'
import image2 from '../../assets/best-selling/IMG_7218-copy-1-scaled.jpg'
import image3 from '../../assets/best-selling/RP-Lite-2-1-scaled.jpg'
import image4 from '../../assets/best-selling/helmet.jpg'
import image5 from '../../assets/best-selling/mrf.jpg'
import image6 from '../../assets/best-selling/shoes.jpg'
import image7 from '../../assets/best-selling/megalite.jpg'
import image8 from '../../assets/best-selling/kit-bag.jpg'
import BSCard from './BSCard';



function BestSelling() {
  return (
    <div className='best-selling'>
        <div className="title text-center">
            BEST SELLING
        </div>
        {/* cards starts here */}
        <div className="cards">
            <Container>
                <Row className="d-flex justify-content-center align-items-center">

                    <Col xs={6} sm={6} md={3}>
                        <BSCard product_name={'SG Test batting Pads'} image={image1} />
                    </Col>
                    
                    <Col xs={6} sm={6} md={3}>
                        <BSCard product_name={'SG Scorer EW crickt bat'} image={image2} />
                    </Col>

                    <Col xs={6} sm={6} md={3}>
                        <BSCard product_name={'SG RP lite batting gloves RH'} image={image3} />
                    </Col>

                    <Col xs={6} sm={6} md={3}>
                        <BSCard product_name={'Shrey air titanium helmet'} image={image4} />
                    </Col>

                    <Col xs={6} sm={6} md={3}>
                        <BSCard product_name={'Genuis MRF EW cricket bat SH'} image={image5} />
                    </Col>

                    <Col xs={6} sm={6} md={3}>
                        <BSCard product_name={'Puma VK18 cricket shoes'} image={image6} />
                    </Col>

                    <Col xs={6} sm={6} md={3}>
                        <BSCard product_name={'SG megalite Wicket Keeping Pads'} image={image7} />
                    </Col>

                    <Col xs={6} sm={6} md={3}>
                        <BSCard product_name={'SG Savage cricket kit bag'} image={image8} />
                    </Col>


                </Row>
            </Container>
        </div>
        
    </div>
  )
}

{/* <MDBCard className='card'>
            <MDBCardImage className='card-image' src='https://shop.teamsg.in/wp-content/uploads/2022/02/1-15-e1680851666312-400x400.jpg' position='top' alt='...' />
            <MDBCardBody className='card-body'>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                </MDBCardText>
            </MDBCardBody>
        </MDBCard> */}
export default BestSelling