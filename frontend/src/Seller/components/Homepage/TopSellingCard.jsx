import React from 'react'
import Card from 'react-bootstrap/Card';


//   this card is a component of the homepage

export default function TopSellingCard() {
  return (
    <Card style={{ margin:'5px' }}>
      <Card.Img variant="top" src="http://localhost:4000/product-images/648083cf0480f37ae5a5ea65-02.jpg" className='w-50 text-center' />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
      </Card.Body>
    </Card>
  )
}

