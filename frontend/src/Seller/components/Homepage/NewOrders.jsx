import React from 'react'
import Card from 'react-bootstrap/Card';

function NewOrders() {
  return (
    <div>
      <Card style={{ width: '20vmax', margin:'3px', backgroundColor:'pink', padding:'1px' }}>
        <Card.Body>
          <Card.Title>Hi Seller <br /> <br /> You have <span style={{fontSize:'29px'}}> 999 </span>new Orders !</Card.Title>
          <h5 className="btn btn-secondary mt-5">View Orders</h5>
        </Card.Body>
      </Card>
</div>
  )
}

export default NewOrders