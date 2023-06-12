import React from 'react'
import '../styles/Homepage.css'
import { Container, Row, Col } from 'react-bootstrap';

import ProductShort from '../components/Homepage/ProductsShort.jsx';
import NewOrders from '../components/Homepage/NewOrders';
import TopSellingCard from '../components/Homepage/TopSellingCard';
import { Link } from 'react-router-dom';


export default function HomepageSeller() {
  return (
    <>
        <Container>
            <Row className='mt-5'>
                <h3>TOP SELLING</h3>
                <Col xs={6} sm={6} md={4} lg={3}>
                    <TopSellingCard/>
                </Col>

                <Col xs={6} sm={6} md={4} lg={3}>
                    <TopSellingCard/>
                </Col>

                <Col xs={6} sm={6} md={4} lg={3}>
                    <TopSellingCard/>
                </Col>

                <Col xs={6} sm={6} md={6} lg={3}>
                    <NewOrders/>
                </Col>

            </Row>
        </Container>
        <Container>
            <Row className='mt-5'>
                <h3 className='mb-4'>PRODUCTS SOLD</h3>
                
                <Col xs={6} sm={6} md={6}>
                    <ProductShort/>
                </Col>
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
            </Row>

            <Row>
                <Col className='text-center mt-5' xs={12} >
                    <Link to={'view-all-products'} className="btn btn-info p-3">
                        View All Products
                    </Link>
                </Col>
            </Row>
        </Container>

    </>
  )
}
