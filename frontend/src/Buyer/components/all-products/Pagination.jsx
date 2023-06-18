import React from 'react'

 function Pagination({productsNo, productsPerPage, setCurrentPage, currentPage}) {

    let numberOfPages = Math.ceil(productsNo / productsPerPage);

    let pagesArray = [];
    for(let i=1; i<=numberOfPages; i++){
        pagesArray.push(i)
    }


    return (
        <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-3">
            <ul className="pagination">
                
                {
                    pagesArray[0] === currentPage ? null :
                    <li className="page-item disabled" onClick={() => setCurrentPage(currentPage-1)}>
                        <a className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li> 
                }
                
                <>
                    {
                        currentPage === 0 || currentPage ===1 || currentPage === 2?

                        pagesArray?.slice(0,currentPage+4).map(page => (<li key={page} 
                                                                                        className={`page-item ${currentPage === page ? "active" : null }`}
                                                                                        onClick={() => setCurrentPage(page)} 
                                                                                        style={{cursor:'pointer'}} 
                                                                                    >
                                                                                            
                                                                                        <a className="page-link">{page}</a>
                                                                                    </li>))
                        
                        :

                        pagesArray?.slice(currentPage-3,currentPage+3).map(page => (<li key={page} 
                                                                                        className={`page-item ${currentPage === page ? "active" : null }`}
                                                                                        onClick={() => setCurrentPage(page)} 
                                                                                        style={{cursor:'pointer'}} 
                                                                                    >
                                                                                            
                                                                                        <a className="page-link">{page}</a>
                                                                                    </li>))
                    }
                </>
                
                
                {
                    pagesArray[pagesArray?.length-1] === currentPage ? null:
                    <li className="page-item disabled" onClick={() => setCurrentPage(currentPage+1)}>
                        <a className="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                }

            </ul>
        </nav>
    )
}

export default React.memo(Pagination)
