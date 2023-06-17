import React, { useEffect, useState } from 'react'
import ListView from '../components/all-products/ListView'
import Filter from '../components/all-products/Filter'
import Pagination from '../components/all-products/Pagination'
import CardView from '../components/all-products/CardView'
import BuyerProductInstance from '../axios/BuyerProductInstance'


// { value: 'random', label: 'Random' },
//     { value: 'latest', label: 'Latest' },
//     { value: 'oldest', label: 'Oldest' },
//     { value: 'priceLowest', label: 'price: low to high' },
//     { value: 'priceHighest', label: 'price: high to low' },
//     { value: 'discount', label: 'Discount' },


export default function AllProducts() {
const [products, setProducts] = useState(null);
const [error, setError] = useState(null)
const [listView, setListView] = useState(true)
const [filter, setFilter] = useState(null)


useEffect(() => {
    BuyerProductInstance.get('all-products')
    .then(resp => {
        if(resp.data.success === false) {
            setError(resp.data.message)
        }else{
            setProducts(resp.data.data.products)
        }
    })
    .catch(err => setError(err.message))
},[])

//fetching products based on filter selected by user

switch (filter?.value) {
    case 'random':
        BuyerProductInstance.get('all-products')
        .then(resp => {
            if(resp.data.success === false) {
                setError(resp.data.message)
            }else{
                setProducts(resp.data.data.products)
            }
        })
        break;

    case 'latest':
        BuyerProductInstance.get('sort-by-date/-1')
        .then(resp => {
            if(resp.data.success === false) {
                setError(resp.data.message)
            }else{
                setProducts(resp.data.data.products)
            }
        })
        break;

    case 'oldest':
        BuyerProductInstance.get('sort-by-date/1')
        .then(resp => {
            if(resp.data.success === false) {
                setError(resp.data.message)
            }else{
                setProducts(resp.data.data.products)
            }
        })
        break;

    case 'priceLowest':
        BuyerProductInstance.get('sort-by-price/1')
        .then(resp => {
            if(resp.data.success === false) {
                setError(resp.data.message)
            }else{
                setProducts(resp.data.data.products)
            }
        })
        break;

    case 'priceHighest':
        BuyerProductInstance.get('sort-by-price/-1')
        .then(resp => {
            if(resp.data.success === false) {
                setError(resp.data.message)
            }else{
                setProducts(resp.data.data.products)
            }
        })
        break;


    default:
        BuyerProductInstance.get('all-products')
        .then(resp => {
            if(resp.data.success === false) {
                setError(resp.data.message)
            }else{
                setProducts(resp.data.data.products)
            }
        })
        break;
}



return (
<>
    <section className="">
        <div className="container mt-5">
            <div className="row">
                <Filter listView={listView} setListView={setListView} productsNo={products?.length} setFilter={setFilter}/>
                <div className="col-lg-12">
                    { listView &&
                        <div className="row justify-content-center mb-3">
                            {
                                products?.map(product => (<ListView key={product._id} productName={product.productName} description={product.description} mrp={product.mrp} offerPrice={product.offerPrice} stock={product.stock} productID={product._id} />))
                            }
                        </div>
                    }

                    { !listView &&
                        <div className="row justify-content-center ">
                            {
                                products?.map(product => (<CardView key={product._id} productName={product.productName} mrp={product.mrp} offerPrice={product.offerPrice} stock={product.stock} productID={product._id} description={product.description} />))
                            }
                        </div>
                    }

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
