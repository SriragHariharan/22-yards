import React, { useState, useEffect } from 'react'
import SimilarItemsCard from './SimilarItemsCard'
import BuyerProductInstance from '../../axios/BuyerProductInstance';

export default function SimilarItemsSection({category}) {
    const [products, setProducts] = useState(null);
    console.log(category);
    useEffect(() => {
        BuyerProductInstance.get('category/'+category)
        .then(resp => {
            if(resp.data.success === true){
                console.log(resp.data.data.products);
                setProducts(resp.data.data.products)
            }
        })
    },[])
  return (
        <div className="col-lg-4">
            <div className="px-0 border rounded-2 shadow-0">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Similar items</h5>
                        <>
                        {
                            products?.slice(0,3).map(product => (<SimilarItemsCard product={product}/>))
                        }
                        </>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
