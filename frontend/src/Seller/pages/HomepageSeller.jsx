import React, { useEffect, useState } from 'react'
import '../styles/Homepage.css'
import { Container, Row, Col } from 'react-bootstrap';

import ProductShort from '../components/Homepage/ProductsShort.jsx';
import NewOrders from '../components/Homepage/NewOrders';
import TopSellingCard from '../components/Homepage/TopSellingCard';
import { Link } from 'react-router-dom';
import useSellerProductInstance from '../axios/useSellerProductInstance';
import Error from '../components/general/Error';


export default function HomepageSeller() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [sellerProductInstance] = useSellerProductInstance()

    //fetch all products based on seller
    useEffect(() => {
        sellerProductInstance.get('/')
        .then(resp => {
            if(resp.data.success === false){
                setError(resp.data.message)
            }else{
                setProducts(resp.data.data.products)
            }
        }).catch(err => setError(err.message))
    }, [])

    //top selling
    let topSelling = products.filter(product => (((product.mrp - product.offerPrice)/product.offerPrice)*100)> 50)

    return (
    <>
        {error && <Error error={error} />}
        {!error && 
        <>
        <Container>
            <Row className='mt-5'>
                <h3>TOP VIEWED</h3>
                {
                    topSelling.slice(0,3).map(product => (
                    <Col xs={6} sm={6} md={4} lg={3} key={product._id}>
                        <TopSellingCard productID={product._id} productName={product.productName}/>
                    </Col>

                    ))
                }

                <Col xs={6} sm={6} md={6} lg={3}>
                    <NewOrders/>
                </Col>

            </Row>
        </Container>
        <Container>
            <Row className='mt-5'>
                <h3 className='mb-4'>PRODUCTS</h3>
                
                    {
                        products.slice(0,4).map(product => (
                            <Col xs={6} sm={6} md={6} className='mb-4'  key={product._id}>
                                    <ProductShort productName={product.productName} mrp={product.mrp} offerPrice={product.offerPrice} productID={product._id} />
                            </Col>
                        ))
                    }                    
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
    }
    </>
  )
}
