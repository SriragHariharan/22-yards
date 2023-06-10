import React from 'react'

function Tester() {
  return (
    <div className='mt-4'>
      <div className="col-12 col-md-10">
          <div className="card shadow" style={{backgroundColor:"#ececec",}}>
              <div className="row g-0 align-items-center">
                  <div className="col-md-4">
                      <img src="https://picsum.photos/10/15" className="card-img rounded-start" alt="Artist desk" />
                  </div>
                  <div className="col-md-8">
                      <div className="card-body">
                          <h3 className="h5">We partnered up with Google</h3>
                          <div className="d-flex mt-3">
                            <span className="btn btn-info me-1">View product</span> 
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Tester