import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BuyerProductInstance from '../axios/BuyerProductInstance'
import Error from '../../Seller/components/general/Error';
import ListView from '../components/all-products/ListView';


export default function ProductsbyCategory() {
    const {id} = useParams()
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        BuyerProductInstance.get('category/'+id)
        .then(resp => {
            if(resp.data.success === false){
                setError(resp.data.message)
            }else{
                console.log(resp.data.data.products)
                setProducts(resp.data.data.products)
            }
        })
        .catch(err => setError(err.message))
    },[id])
  

    return (
    <div className='container mt-5'>
        <div className="row justify-content-center mb-3">
        {error && <Error error={error} />}
        {!error && 
            <>
            {
                products?.map(product => (<ListView key={product._id} productName={product.productName} description={product.description} mrp={product.mrp} offerPrice={product.offerPrice} stock={product.stock} productID={product._id} />))
            }
            </>
        }

        {(products===null || products.length === 0) && <h3 className="text-center p-5 m-5">No products found</h3> }
        </div>
    </div>
    )
}
