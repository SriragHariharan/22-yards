import React from 'react'

export default function Filter() {
  return (
    <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
        <strong className="d-block py-2">32 Items found </strong>
        <div className="ms-auto">
            <select className="form-select d-inline-block w-auto border pt-1  me-5">
                <option value="3">Randomly</option>
                <option value="3">Latest</option>
                <option value="3">Oldest</option>
                <option value="0">Price : High - Low</option>
                <option value="1">Price : Low-High</option>
                <option value="2">Discount</option>
            </select>
            <div className="btn-group shadow-0 border">
            <a className="btn btn-light active" title="List view">
                <i className="fa fa-bars fa-lg"></i>
            </a>
            <a className="btn btn-light" title="Grid view">
                <i className="fa fa-th fa-lg"></i>
            </a>
            </div>
        </div>
    </header>
  )
}
