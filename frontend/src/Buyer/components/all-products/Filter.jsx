import React from 'react'
import Select from 'react-select';

const options = [
    { value: 'random', label: 'Random' },
    { value: 'latest', label: 'Latest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'priceLowest', label: 'Price: low to high' },
    { value: 'priceHighest', label: 'Price: high to low' },
];

export default function Filter({ listView, setListView, productsNo, setFilter, showSort = true }) {
  return (
    <header className="buyer-catalog__toolbar">
        <strong className="buyer-catalog__count">
            {productsNo ?? 0} {productsNo === 1 ? 'item' : 'items'} found
        </strong>
        <div className="buyer-catalog__toolbar-actions">
            {showSort && (
                <div className="buyer-catalog__select">
                    <Select
                        classNamePrefix="buyer-select"
                        onChange={setFilter}
                        options={options}
                        placeholder="Sort by..."
                        isClearable
                    />
                </div>
            )}
            <div className="buyer-catalog__view-toggle" role="group" aria-label="View mode">
                <button
                    type="button"
                    onClick={() => setListView(true)}
                    className={`buyer-catalog__view-btn ${listView ? 'buyer-catalog__view-btn--active' : ''}`}
                    title="List view"
                    aria-pressed={listView}
                >
                    <i className="fa fa-bars" aria-hidden="true" />
                </button>
                <button
                    type="button"
                    onClick={() => setListView(false)}
                    className={`buyer-catalog__view-btn ${!listView ? 'buyer-catalog__view-btn--active' : ''}`}
                    title="Grid view"
                    aria-pressed={!listView}
                >
                    <i className="fa fa-th" aria-hidden="true" />
                </button>
            </div>
        </div>
    </header>
  )
}
