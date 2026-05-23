import React from 'react'
import { getProductImageUrl } from '../../../utils/productImage'

function formatPrice(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '0'
}

export default function CheckoutProductCard({ item }) {
  return (
    <div className="buyer-checkout-item">
      <div className="buyer-checkout-item__image-wrap">
        <span className="buyer-checkout-item__qty">{item?.quantity}</span>
        <img
          src={getProductImageUrl(item?.productID)}
          alt={item?.productName}
          className="buyer-checkout-item__image"
        />
      </div>
      <div>
        <div className="buyer-checkout-item__name">{item?.productName}</div>
        <div className="buyer-checkout-item__price">₹ {formatPrice(item?.offerPrice)} each</div>
      </div>
    </div>
  )
}
