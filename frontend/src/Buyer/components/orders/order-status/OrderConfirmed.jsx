import React from 'react'

export default function OrderConfirmed() {
  return (
      <div class="d-flex justify-content-between mt-2">
        <div class="text-center">
            <i class="fas fa-circle text-success"></i>
            <p style={{fontSize:'0.8rem'}} class="text-success">placed</p>
        </div>

        <div class="text-center">
            <i class="fas fa-circle text-success"></i>
            <p style={{fontSize:'0.8rem'}} class="text-success">confirmed</p>
        </div>

        <div class="text-center">
            <i class="fas fa-circle text-warning"></i>
            <p style={{fontSize:'0.8rem'}} class="text-warning">packed</p>
        </div>
        
        <div class="text-center">
            <i class="fas fa-circle text-warning"></i>
            <p style={{fontSize:'0.8rem'}} class="text-warning">shipped</p>
        </div>

        <div class="text-center">
            <i class="fas fa-circle text-warning" ></i>
            <p style={{color: "tomato", fontSize:'0.8rem'}}>Delivered</p>
        </div>
      </div>
  )
}
