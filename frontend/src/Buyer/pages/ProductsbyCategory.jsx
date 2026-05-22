import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BuyerProductInstance from '../axios/BuyerProductInstance'
import Error from '../../Seller/components/general/Error'
import ListView from '../components/all-products/ListView'
import CardView from '../components/all-products/CardView'
import Filter from '../components/all-products/Filter'

const CATEGORY_NAMES = {
    'cricket-bat': 'Cricket Bats',
    'leg-guard': 'Leg Guards',
    'gloves': 'Gloves',
    'cricket-ball': 'Cricket Balls',
    'kit-bag': 'Kit Bags',
    'shoes': 'Shoes',
    'helmet': 'Helmets',
    'protection': 'Protection',
    'wearables': 'Wearables',
    'accessories': 'Accessories',
}

function formatSlug(slug) {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export default function ProductsbyCategory() {
    const { id } = useParams()
    const [products, setProducts] = useState(null)
    const [error, setError] = useState(null)
    const [listView, setListView] = useState(true)

    const categoryTitle = CATEGORY_NAMES[id] ?? formatSlug(id)

    useEffect(() => {
        setProducts(null)
        setError(null)

        BuyerProductInstance.get('category/' + id)
            .then(resp => {
                if (resp.data.success === false) {
                    setError(resp.data.message)
                    setProducts([])
                } else {
                    setProducts(resp.data.data.products)
                }
            })
            .catch(err => {
                setError(err.message)
                setProducts([])
            })
    }, [id])

    return (
        <section className="buyer-catalog buyer-section">
            <div className="buyer-container">
                <header className="buyer-section__header">
                    <h1 className="buyer-section-title">{categoryTitle}</h1>
                    <p className="buyer-section-subtitle">Shop gear in this category</p>
                </header>

                {error && <Error error={error} />}

                {!error && products === null && (
                    <div className="buyer-catalog__loading">
                        <div className="buyer-catalog__spinner" aria-hidden="true" />
                        <p className="buyer-empty-state__text">Loading products…</p>
                    </div>
                )}

                {!error && products !== null && products.length === 0 && (
                    <div className="buyer-empty-state">
                        <p className="buyer-empty-state__text">No products found in this category.</p>
                    </div>
                )}

                {!error && products?.length > 0 && (
                    <>
                        <Filter
                            listView={listView}
                            setListView={setListView}
                            productsNo={products.length}
                            setFilter={() => {}}
                            showSort={false}
                        />

                        {listView ? (
                            <div>
                                {products.map(product => (
                                    <ListView
                                        key={product._id}
                                        productName={product.productName}
                                        description={product.description}
                                        mrp={product.mrp}
                                        offerPrice={product.offerPrice}
                                        stock={product.stock}
                                        productID={product._id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="buyer-product-grid">
                                {products.map(product => (
                                    <CardView
                                        key={product._id}
                                        productName={product.productName}
                                        mrp={product.mrp}
                                        offerPrice={product.offerPrice}
                                        stock={product.stock}
                                        productID={product._id}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}
