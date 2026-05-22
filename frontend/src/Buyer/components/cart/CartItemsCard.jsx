import React, { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { ChangeProductQuantity, RemoveCartItem, SetCartTotal } from '../../../redux-tk/reducers/CartReducer';
import BuyerProductInstance from '../../axios/BuyerProductInstance';

function formatPrice(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '0'
}

export default function CartItemsCard({ item, setBillAmount, onRemove }) {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        BuyerProductInstance.get('get-single-product/' + item?.productID)
            .then(resp => {
                if (resp.data.success !== false) {
                    setProduct(resp.data.data.product);
                }
            })
            .catch(() => {})
    }, [item?.productID])

    const handleQuantity = (productID, delta) => {
        dispatch(ChangeProductQuantity({ productID, quantity: delta }))
    }

    const handleRemoveCartItem = (productID) => {
        if (window.confirm('Remove this item from your cart?')) {
            dispatch(RemoveCartItem(productID))
            onRemove?.()
        }
    }

    useMemo(() => {
        const cartTotal = cart.map(p => p.totalPrice).reduce((accu, curr) => accu + curr, 0)
        setBillAmount(cartTotal);
        dispatch(SetCartTotal(cartTotal))
    }, [cart, dispatch, setBillAmount])

    const canIncrease = product?.stock != null && item.quantity < product.stock && item.quantity < 5

    return (
        <article className="buyer-cart-item">
            <img
                src={`${import.meta.env.VITE_SERVER_IMG}/product-images/${item.productID}-01.jpg`}
                alt={item.productName}
                className="buyer-cart-item__image"
            />

            <div>
                <Link to={`/view-product/${item.productID}`} className="buyer-cart-item__name">
                    {item.productName}
                </Link>
                <p className="buyer-cart-item__meta">Size: {item.size}</p>
            </div>

            <div className="buyer-cart-item__qty">
                <button
                    type="button"
                    className="buyer-cart-item__qty-btn"
                    disabled={item.quantity <= 1}
                    onClick={() => item.quantity > 1 && handleQuantity(item.productID, -1)}
                    aria-label="Decrease quantity"
                >
                    −
                </button>
                <span className="buyer-cart-item__qty-value">{item.quantity}</span>
                {canIncrease ? (
                    <button
                        type="button"
                        className="buyer-cart-item__qty-btn"
                        onClick={() => handleQuantity(item.productID, +1)}
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                ) : (
                    <span className="buyer-cart-item__stock-warn">
                        {product?.stock != null
                            ? `Only ${product.stock} available`
                            : 'Max quantity reached'}
                    </span>
                )}
            </div>

            <div className="buyer-cart-item__price-col">
                <p className="buyer-cart-item__line-total">₹ {formatPrice(item.totalPrice)}</p>
                <p className="buyer-cart-item__unit-price">₹ {formatPrice(item.offerPrice)} each</p>
                <div className="buyer-cart-item__remove-wrap" style={{ marginTop: '0.75rem' }}>
                    <button
                        type="button"
                        className="buyer-cart-item__remove"
                        onClick={() => handleRemoveCartItem(item.productID)}
                    >
                        <i className="fa fa-trash" aria-hidden="true" /> Remove
                    </button>
                </div>
            </div>
        </article>
    )
}
