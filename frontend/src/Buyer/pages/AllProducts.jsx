import React, { useEffect, useState } from 'react'
import ListView from '../components/all-products/ListView'
import Filter from '../components/all-products/Filter'
import Pagination from '../components/all-products/Pagination'
import CardView from '../components/all-products/CardView'
import BuyerProductInstance from '../axios/BuyerProductInstance'

const FILTER_ENDPOINTS = {
    random: 'all-products',
    latest: 'sort-by-date/-1',
    oldest: 'sort-by-date/1',
    priceLowest: 'sort-by-price/1',
    priceHighest: 'sort-by-price/-1',
}

export default function AllProducts() {
    const [products, setProducts] = useState(null)
    const [error, setError] = useState(null)
    const [listView, setListView] = useState(true)
    const [filter, setFilter] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

    const productsPerPage = 16
    const lastIndex = currentPage * productsPerPage
    const firstIndex = lastIndex - productsPerPage

    useEffect(() => {
        const endpoint = FILTER_ENDPOINTS[filter?.value] ?? 'all-products'
        setProducts(null)

        BuyerProductInstance.get(endpoint)
            .then(resp => {
                if (resp.data.success === false) {
                    setError(resp.data.message)
                    setProducts([])
                } else {
                    setError(null)
                    setProducts(resp.data.data.products)
                    setCurrentPage(1)
                }
            })
            .catch(err => {
                setError(err.message)
                setProducts([])
            })
    }, [filter])

    const pageProducts = products?.slice(firstIndex, lastIndex) ?? []

    return (
        <section className="buyer-catalog buyer-section">
            <div className="buyer-container">
                <header className="buyer-section__header">
                    <h1 className="buyer-section-title">All Products</h1>
                    <p className="buyer-section-subtitle">Browse our full cricket gear collection</p>
                </header>

                {error && (
                    <div className="buyer-empty-state">
                        <p className="buyer-empty-state__text text-danger">{error}</p>
                    </div>
                )}

                {!error && products === null && (
                    <div className="buyer-catalog__loading">
                        <div className="buyer-catalog__spinner" aria-hidden="true" />
                        <p className="buyer-empty-state__text">Loading products…</p>
                    </div>
                )}

                {!error && products !== null && products.length === 0 && (
                    <div className="buyer-empty-state">
                        <p className="buyer-empty-state__text">No products found.</p>
                    </div>
                )}

                {!error && products?.length > 0 && (
                    <>
                        <Filter
                            listView={listView}
                            setListView={setListView}
                            productsNo={products.length}
                            setFilter={setFilter}
                        />

                        {listView ? (
                            <div>
                                {pageProducts.map(product => (
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
                                {pageProducts.map(product => (
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

                        <Pagination
                            productsNo={products.length}
                            productsPerPage={productsPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </>
                )}
            </div>
        </section>
    )
}
