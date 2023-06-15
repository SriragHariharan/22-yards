import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import ProductsCard from '../components/all-products/ProductsCard';
import useSellerProductInstance from '../axios/useSellerProductInstance';
import Error from '../components/general/Error';


export default function AllProductsSeller() {
  const [sellerProductInstance] = useSellerProductInstance()
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(()=> {
    sellerProductInstance.get('/')
    .then(resp => {
      if(resp.data.success === false){
        setError(resp.data.message)
      }else{
        setProducts(resp.data.data.products)
        setError(null)
      }
    })
    .catch(err => setError(err.message))
  }, [])

  return (
    <>
      {error && <Error error={error}/>}
      {!error &&
        <div>
            <Container fluid={true}>
                <h4 className="text-center mt-5">All products you sell are listed here</h4>
                <h5 className="text-center m-4">You sell {products.length} products on 22yards</h5>
                <Row className='mt-5 p-3'>                    
                  <Col xs={12} sm={12} md={12}>
                    {
                      products.map(product => (<ProductsCard key={product._id} productName={product.productName} stock={product.stock} mrp={product.mrp} offerPrice ={product.offerPrice} productID={product._id} description={product.description}  />) )
                    }
                  </Col>
                </Row>
            </Container>
        </div>
      }
    </>
  )
}
