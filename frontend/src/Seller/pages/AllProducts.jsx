import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import ProductsCard from '../components/all-products/ProductsCard';


export default function AllProducts() {
  return (
    <div>
        <Container>
            <h4 className="text-center mt-5">All products you sell are listed here</h4>
            <Row className='mt-5 p-3'>                    
                    <Col xs={12} sm={12} md={12}>
                        <ProductsCard/>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                        <ProductsCard/>
                    </Col>
                    
                    <Col xs={6} sm={6} md={6}>
                    </Col>
                    <Col xs={6} sm={6} md={6}>
                    </Col>
                    <Col xs={6} sm={6} md={6}>
                    </Col>
            </Row>
        </Container>
    </div>
  )
}
