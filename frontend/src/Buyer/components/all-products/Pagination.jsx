import React from 'react'

function Pagination({ productsNo, productsPerPage, setCurrentPage, currentPage }) {
    const numberOfPages = Math.ceil(productsNo / productsPerPage) || 0

    const pagesArray = []
    for (let i = 1; i <= numberOfPages; i++) {
        pagesArray.push(i)
    }

    const visiblePages =
        currentPage === 0 || currentPage === 1 || currentPage === 2
            ? pagesArray.slice(0, currentPage + 4)
            : pagesArray.slice(currentPage - 3, currentPage + 3)

    if (numberOfPages <= 1) return null

    return (
        <nav aria-label="Product pagination" className="buyer-pagination">
            <ul className="buyer-pagination__list">
                {pagesArray[0] !== currentPage && (
                    <li
                        className="buyer-pagination__item"
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        <span className="buyer-pagination__link" aria-label="Previous">
                            &laquo;
                        </span>
                    </li>
                )}

                {visiblePages.map(page => (
                    <li
                        key={page}
                        className={`buyer-pagination__item ${currentPage === page ? 'buyer-pagination__item--active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                    >
                        <span className="buyer-pagination__link">{page}</span>
                    </li>
                ))}

                {pagesArray[pagesArray.length - 1] !== currentPage && (
                    <li
                        className="buyer-pagination__item"
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        <span className="buyer-pagination__link" aria-label="Next">
                            &raquo;
                        </span>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default React.memo(Pagination)
