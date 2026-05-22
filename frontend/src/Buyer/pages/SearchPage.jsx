import React, { useEffect, useState, useMemo } from 'react'
import ListView from '../components/all-products/ListView'
import CardView from '../components/all-products/CardView'
import Filter from '../components/all-products/Filter'
import BuyerProductInstance from '../axios/BuyerProductInstance'

export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [products, setProducts] = useState(null)
    const [error, setError] = useState(null)
    const [listView, setListView] = useState(true)

    useEffect(() => {
        BuyerProductInstance.get('all-products')
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
    }, [])

    const filteredProducts = useMemo(() => {
        if (!products || !query.trim()) return []
        const q = query.trim().toLowerCase()
        return products.filter(p =>
            p.productName.toLowerCase().includes(q)
        )
    }, [products, query])

    return (
        <section className="buyer-catalog buyer-section">
            <div className="buyer-container">
                <header className="buyer-section__header">
                    <h1 className="buyer-section-title">Search Products</h1>
                    <p className="buyer-section-subtitle">Find bats, pads, gloves, and more</p>
                </header>

                <div className="buyer-search__form">
                    <i className="fa fa-search buyer-search__icon" aria-hidden="true" />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="buyer-search__input"
                        placeholder="Search by product name…"
                        aria-label="Search products"
                    />
                </div>

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

                {!error && products !== null && !query.trim() && (
                    <p className="buyer-search__hint">
                        Start typing to search our cricket gear catalogue.
                    </p>
                )}

                {!error && products !== null && query.trim() && filteredProducts.length === 0 && (
                    <div className="buyer-empty-state">
                        <p className="buyer-empty-state__text">
                            No products match &ldquo;{query}&rdquo;. Try a different search term.
                        </p>
                    </div>
                )}

                {!error && filteredProducts.length > 0 && (
                    <>
                        <Filter
                            listView={listView}
                            setListView={setListView}
                            productsNo={filteredProducts.length}
                            setFilter={() => {}}
                            showSort={false}
                        />

                        {listView ? (
                            <div>
                                {filteredProducts.map(product => (
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
                                {filteredProducts.map(product => (
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
