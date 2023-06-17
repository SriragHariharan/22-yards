import React from 'react'

//react selwect to change state on change
import Select from 'react-select';
const options = [
    { value: 'random', label: 'Random' },
    { value: 'latest', label: 'Latest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'priceLowest', label: 'price: low to high' },
    { value: 'priceHighest', label: 'price: high to low' },
  ];


export default function Filter({listView, setListView, productsNo, setFilter}) {
  return (
    <header className="d-sm-flex align-items-center border-bottom mb-4 p-3">
        <strong className="d-block py-2">{productsNo} Items found </strong>
            <div className="ms-auto">
                <Select className="d-inline-block w-auto pt-1  me-5"
                onChange={setFilter}
                options={options}
            />
            <div className="btn-group shadow-0 border">
            <a onClick={() => setListView(true)}  className={`btn btn-${listView ? "success" : "light" }`} title="List view">
                <i  className="fa fa-bars fa-lg"></i>
            </a>
            <a onClick={() => setListView(false)} className={`btn btn-${!listView ? "success" : "light" }`} title="Grid view">
                <i className="fa fa-th fa-lg"></i>
            </a>
            {/* <div className={`s-${this.props.showBulkActions ? 'is-shown' : 'is-hidden'}`}> */}
            </div>
        </div>
    </header>
  )
}
