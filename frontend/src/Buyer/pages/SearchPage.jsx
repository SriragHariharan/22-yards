import React, { useEffect, useState } from 'react'
import ListView from '../components/all-products/ListView';
import BuyerProductInstance from '../axios/BuyerProductInstance';

export default function SearchPage() {
    const [filter, setFilter] = useState('');
    const [products, setProducts] = useState(null)

    const searchProducts = (e) => {
        e.preventDefault()
        setFilter(e.target.value)
    }

    useEffect(() =>{
        BuyerProductInstance.get('all-products')
        .then(resp => {
            if(resp.data.success === false) {
                setError(resp.data.message)
            }else{
                setProducts(resp.data.data.products)
            }
        })
    },[])
  return (
<>
    <section className="">
        <div className="container">
            <div className="row">
                <div className="text-center h3 mt-4">SEARCH FOR PRODUCTS</div>
                <div>
                    <form className='card mt-3 mb-5 col-12'>
                        <input type="text" value={filter} style={{height:'50px'}} className='border border-3' placeholder=' Search here for products' onChange={searchProducts} />
                    </form>

                    <div className="col-lg-12">
                            <div className="row justify-content-center mb-3">
                                {
                                    products?.
                                        filter((product) => {
                                           return filter.toLowerCase() === '' ? product :product.productName.toLowerCase().includes(filter)
                                        })
                                        .map(product => (<ListView key={product._id} productName={product.productName} description={product.description} mrp={product.mrp} offerPrice={product.offerPrice} stock={product.stock} productID={product._id} />))
                                }
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
