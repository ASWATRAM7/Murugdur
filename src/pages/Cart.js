import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import './Cart.css';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadCart();

        const handleCartUpdate = () => {
            loadCart();
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    const loadCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart);

        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotal(totalAmount);
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            window.dispatchEvent(new Event('cartUpdated'));
            loadCart();
        }
    };

    const removeItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const filtered = cart.filter(i => i.id !== id);
        localStorage.setItem('cart', JSON.stringify(filtered));
        window.dispatchEvent(new Event('cartUpdated'));
        loadCart();
    };

    const formatPrice = (price, currency) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency || 'INR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleCheckout = () => {
        alert('Checkout functionality will be integrated with Stripe payment gateway');
    };

    const subtotal = total;
    const shipping = 0;
    const tax = Math.round(total * 0.18); // 18% GST
    const finalTotal = subtotal + shipping + tax;

    return (
        <main className="cart-page">
            <div className="container">
                <div className="cart-header">
                    <BackButton label="Back" />
                    <div className="cart-breadcrumb">
                        <Link to="/">Home</Link>
                        <span className="separator">/</span>
                        <span>Shopping Cart</span>
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <div className="empty-cart-icon">
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                        </div>
                        <h2>Your Shopping Cart is Empty</h2>
                        <p>Discover our exquisite collection of luxury products</p>
                        <Link to="/collections" className="btn-cart-cta">
                            Explore Collections
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="cart-title-section">
                            <h1>Shopping Cart</h1>
                            <p className="cart-item-count">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</p>
                        </div>

                        <div className="cart-layout">
                            {/* Cart Items */}
                            <div className="cart-items-section">
                                {cartItems.map(item => (
                                    <div key={item.id} className="cart-item-card">
                                        <Link to={`/product/${item.productId || item.id.split('-')[0]}`} className="item-image-wrapper">
                                            <img src={item.image} alt={item.name} className="item-image" />
                                        </Link>

                                        <div className="item-details">
                                            <Link
                                                to={`/product/${item.productId || item.id.split('-')[0]}`}
                                                className="item-name"
                                            >
                                                {item.name}
                                            </Link>

                                            {item.size && (
                                                <div className="item-size">
                                                    <span className="size-label">Size:</span>
                                                    <span className="size-value">{item.size}</span>
                                                </div>
                                            )}

                                            <div className="item-price-mobile">
                                                {formatPrice(item.price, item.currency)}
                                            </div>
                                        </div>

                                        <div className="item-quantity-section">
                                            <label>Quantity</label>
                                            <div className="quantity-controls">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="qty-btn"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    −
                                                </button>
                                                <span className="qty-display">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="qty-btn"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="item-price-desktop">
                                            {formatPrice(item.price, item.currency)}
                                        </div>

                                        <div className="item-subtotal">
                                            <span className="subtotal-label">Subtotal</span>
                                            <span className="subtotal-amount">
                                                {formatPrice(item.price * item.quantity, item.currency)}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="item-remove-btn"
                                            aria-label="Remove item"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 6L6 18M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}

                                {/* Continue Shopping */}
                                <div className="continue-shopping">
                                    <Link to="/collections" className="continue-shopping-link">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19 12H5M12 19l-7-7 7-7" />
                                        </svg>
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="cart-summary-section">
                                <div className="summary-card">
                                    <h3 className="summary-title">Order Summary</h3>

                                    <div className="summary-details">
                                        <div className="summary-row">
                                            <span>Subtotal ({cartItems.length} items)</span>
                                            <span>{formatPrice(subtotal, 'INR')}</span>
                                        </div>

                                        <div className="summary-row">
                                            <span>Shipping</span>
                                            <span className="free-shipping">Free</span>
                                        </div>

                                        <div className="summary-row">
                                            <span>Estimated Tax (GST 18%)</span>
                                            <span>{formatPrice(tax, 'INR')}</span>
                                        </div>

                                        <div className="summary-divider"></div>

                                        <div className="summary-row summary-total">
                                            <span>Total</span>
                                            <span className="total-amount">{formatPrice(finalTotal, 'INR')}</span>
                                        </div>
                                    </div>

                                    <button onClick={handleCheckout} className="checkout-btn">
                                        <span>Proceed to Checkout</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    <div className="payment-icons">
                                        <span className="secure-text">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                                            </svg>
                                            Secure Checkout
                                        </span>
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div className="benefits-card">
                                    <h4 className="benefits-title">Complimentary Services</h4>
                                    <ul className="benefits-list">
                                        <li>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            <span>Free worldwide shipping</span>
                                        </li>
                                        <li>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            <span>Luxury gift packaging</span>
                                        </li>
                                        <li>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            <span>30-day easy returns</span>
                                        </li>
                                        <li>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            <span>Lifetime care support</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

export default Cart;
