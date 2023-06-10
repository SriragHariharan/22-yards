import React from 'react'
import '../styles/Homepage.css'
import { Container, Row, Col } from 'react-bootstrap';

import ProductShort from '../components/Homepage/ProductsShort.jsx';
import Footer from '../components/Footer';
import NewOrders from '../components/Homepage/NewOrders';
import TopSellingCard from '../components/Homepage/TopSellingCard';


export default function Homepage() {
  return (
    <>
        <Container>

            <Row className='mt-5'>
                <h3>TOP SELLING</h3>
                <Col xs={4} sm={4} md={4} lg={2}>
                    <TopSellingCard/>
                </Col>

                <Col xs={4} sm={4} md={4} lg={2}>

                </Col>

                <Col xs={4} sm={4} md={4} lg={2}>
                </Col>

                <Col xs={12} sm={12} md={12}  lg={6}>
                    <NewOrders/>
                </Col>

            </Row>

            <Row className='mt-5 p-3'>
                <h3 className='mb-0'>PRODUCTS SOLD</h3>
                
                <Col xs={6} sm={6} md={6}>
                    <ProductShort/>
                </Col>
                <Col xs={6} sm={6} md={6}>
                </Col>
                <Col xs={6} sm={6} md={6}>
                </Col>
                <Col xs={6} sm={6} md={6}>
                </Col>
                <Col xs={6} sm={6} md={6}>
                </Col>
                <Col xs={6} sm={6} md={6}>
                </Col>
            </Row>

            <Row>
                <Col className='text-center mt-5' xs={12} >
                    <div className="btn btn-info p-3">
                        View All Products
                    </div>
                </Col>
            </Row>
        </Container>

        <Footer/>
    </>
  )
}
