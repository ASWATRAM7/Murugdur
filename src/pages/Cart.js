import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

    return (
        <main className="cart-page">
            <div className="container">
                <div className="page-title">
                    <h1>Shopping Cart</h1>
                    <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <h2>Your cart is empty</h2>
                        <p>Discover our luxury collections and add items to your cart</p>
                        <Link to="/collections" className="btn-lv btn-lv-primary">
                            Browse Collections
                        </Link>
                    </div>
                ) : (
                    <div className="cart-layout">
                        <div className="cart-items-section">
                            <div className="panel">
                                {cartItems.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <Link to={`/product/${item.id}`} className="cart-item-image">
                                            <img src={item.image} alt={item.name} />
                                        </Link>
                                        <div className="cart-item-details">
                                            <Link to={`/product/${item.id}`} className="cart-item-name">
                                                {item.name}
                                            </Link>
                                            <div className="cart-item-price">
                                                {formatPrice(item.price, item.currency)}
                                            </div>
                                        </div>
                                        <div className="cart-item-quantity">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="qty-btn"
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                className="qty-input"
                                                min="1"
                                            />
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="qty-btn"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="cart-item-subtotal">
                                            {formatPrice(item.price * item.quantity, item.currency)}
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="cart-item-remove"
                                            aria-label="Remove item"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="cart-summary-section">
                            <div className="panel padded">
                                <h3 className="summary-title">Order Summary</h3>

                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(total, 'INR')}</span>
                                </div>

                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span className="text-green">Complimentary</span>
                                </div>

                                <div className="divider"></div>

                                <div className="summary-row summary-total">
                                    <span>Total</span>
                                    <span>{formatPrice(total, 'INR')}</span>
                                </div>

                                <button onClick={handleCheckout} className="btn-lv btn-lv-primary btn-full">
                                    Proceed to Checkout
                                </button>

                                <div className="cart-note">
                                    Secure payment processing with Stripe. All transactions are encrypted and protected.
                                </div>
                            </div>

                            <div className="panel padded" style={{ marginTop: 'var(--spacing-md)' }}>
                                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', marginBottom: '12px', color: 'var(--lv-brown)' }}>
                                    Complimentary Services
                                </h4>
                                <ul className="services-list">
                                    <li>White-glove delivery worldwide</li>
                                    <li>Luxury gift packaging</li>
                                    <li>30-day returns</li>
                                    <li>Lifetime care support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Cart;
