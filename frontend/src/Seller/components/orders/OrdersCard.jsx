import useSellerProductInstance from '../../axios/useSellerProductInstance';
import { getProductImageUrl } from '../../../utils/productImage';

const STATUS_CLASS = {
    'order placed': 'order-card__status-badge--placed',
    'order confirmed': 'order-card__status-badge--confirmed',
    'order packed': 'order-card__status-badge--packed',
    'order shipped': 'order-card__status-badge--shipped',
    'order delivered': 'order-card__status-badge--delivered',
};

const NEXT_ACTION = {
    'order placed': { label: 'Confirm order', next: 'order confirmed', icon: 'fa-check' },
    'order confirmed': { label: 'Mark as packed', next: 'order packed', icon: 'fa-box' },
    'order packed': { label: 'Mark as shipped', next: 'order shipped', icon: 'fa-truck' },
    'order shipped': { label: 'Mark as delivered', next: 'order delivered', icon: 'fa-circle-check' },
};

export default function OrdersCard({ product, onStatusChange }) {
    const [sellerProductInstance] = useSellerProductInstance();

    const time = new Date(product?.createdAt).toTimeString().split(' ')[0];
    const date = new Date(product?.createdAt).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const orderID = product._id;
    const status = product?.cart?.orderStatus ?? '';
    const statusClass = STATUS_CLASS[status] ?? 'order-card__status-badge--placed';
    const action = NEXT_ACTION[status];

    const confirmOrder = (productID, nextStatus) => {
        sellerProductInstance.post('/update-order-status', { orderID, productID, status: nextStatus })
            .then(() => onStatusChange?.())
            .catch(err => onStatusChange?.(err.message, true));
    };

    return (
        <article className="order-card">
            <div className="order-card__grid">
                <div className="order-card__product">
                    <img
                        src={getProductImageUrl(product?.cart?.productID)}
                        className="order-card__image"
                        alt=""
                    />
                    <div>
                        <p className="order-card__product-name">{product?.cart?.productName}</p>
                        <p className="order-card__detail">Size: {product?.cart?.size}</p>
                        <p className="order-card__detail">Quantity: {product?.cart?.quantity}</p>
                        <p className="order-card__detail">Bill: ₹ {product?.cart?.totalPrice}</p>
                        <p className="order-card__detail">₹ {product?.cart?.offerPrice} / item</p>
                    </div>
                </div>

                <div>
                    <p className="order-card__address-title">Shipping address</p>
                    <address className="order-card__address">
                        {product?.fullName}<br />
                        {product?.address}, {product?.city}<br />
                        {product?.state} — Pin {product?.pincode}<br />
                        Landmark: {product?.landmark}<br />
                        {product?.mobile} · {product?.email}
                    </address>
                </div>

                <div className="order-card__status-block">
                    <p className="order-card__date">Placed {date}, {time}</p>
                    <p className="order-card__payment order-card__payment--success">
                        Payment successful
                    </p>
                    <span className={`order-card__status-badge ${statusClass}`}>
                        {status}
                    </span>
                    {action && (
                        <button
                            type="button"
                            className="seller-btn seller-btn--primary order-card__action-btn"
                            onClick={() => confirmOrder(product?.cart?.productID, action.next)}
                        >
                            <i className={`fas ${action.icon}`} /> {action.label}
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}
