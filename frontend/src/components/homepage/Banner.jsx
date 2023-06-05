import React from 'react'
import image from '../../assets/Banner.jpg'
import '../../styles/homepage/Banner.css'
import { Container, Row, Col } from 'react-bootstrap';

function Banner() {
  return (
    <div className='hero-section'>
        <Container>
            <Row>
                <Col xs={12} sm={6} md={6}>
                    <div className="banner-content">
                        <h1>Believe. Become.</h1>
                        <h3>One Stop shop for all your cricketing needs</h3>
                        <p>A stop shop from where you could buy all cricketing goods at a cheaper and more competative price which will help you to nurture your game
                        </p>
                    </div>
                </Col>
                <Col xs={12} sm={6} md={6}>
                    <div className="banner-img">
                        <img width='100%' src={image} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Banner