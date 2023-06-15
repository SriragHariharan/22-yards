import React from 'react'

export default function Pagination() {
  return (
        <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-3">
            <ul className="pagination">
                <li className="page-item disabled">
                    <a className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li className="page-item active"><a className="page-link">1</a></li>
                <li className="page-item"><a className="page-link">2</a></li>
                <li className="page-item"><a className="page-link">3</a></li>
                <li className="page-item"><a className="page-link">4</a></li>
                <li className="page-item"><a className="page-link">5</a></li>
                <li className="page-item">
                <a className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
    )
}
