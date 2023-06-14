import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

//   this card is a component of the homepage

export default function TopSellingCard({productID, productName}) {
  return (
    <Card style={{ margin:'5px' }}>
      <Link to={'/seller/home/view-product/'+productID} className='NavLink'>
          <Card.Img variant="top" width='20px' height='200px' src={`http://localhost:4000/product-images/${productID}-02.jpg`} className=' text-center' />
          <Card.Body>
            <Card.Title>{productName.slice(0,15)}...</Card.Title>
          </Card.Body>
      </Link>
    </Card>
  )
}

