import React from 'react'

function NewOrders() {
  return (
    <div>
  <div className="col-12 col-md-10 ">
       <div className="card shadow" style={{backgroundColor:"pink", padding:"25px" }}>
          <div className="row g-0 align-items-center">
              <div className="col-md-12">
                  <div className="card-body">
                      <h3 className="h5">Hey you have <span style={{fontSize:'30px', margin:'10px'}}>999</span> new Orders</h3>
                      <div className="d-flex mt-3">
                        <span className="btn btn-secondary me-1">View Orders</span> 
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
  )
}

export default NewOrders