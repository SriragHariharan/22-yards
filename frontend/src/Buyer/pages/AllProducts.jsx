import React from 'react'
import ListView from '../components/all-products/ListView'
import Filter from '../components/all-products/Filter'
import Pagination from '../components/all-products/Pagination'
import CardView from '../components/all-products/CardView'

//for=t 

export default function AllProducts() {
  return (
<>
    <section className="">
        <div className="container mt-5">
            <div className="row">
                <Filter/>
                <div className="col-lg-12">
                    <div className="row justify-content-center mb-3">
                        <ListView/>
                        <ListView/>
                        <CardView/>
                    </div>

                    <hr />
                    {/* <!-- Pagination --> */}
                        <Pagination/>
                </div>
            </div>
        </div>
    </section>


    {/* row alignment */}

















</>

  )
}
