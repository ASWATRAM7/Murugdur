import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // Load cart count from localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));

        // Listen for cart updates
        const handleCartUpdate = () => {
            const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0));
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    return (
        <header className="topbar">
            <div className="container">
                <nav className="nav">
                    <Link className="brand" to="/" aria-label="Murugdur Home">
                        <div className="logo">
                            <img src="/logo.svg" alt="" aria-hidden="true" />
                        </div>
                        <div>
                            <div className="brand-title">MURUGDUR</div>
                            <div className="brand-sub">Luxury Fashion House · Est. 2019</div>
                        </div>
                    </Link>
                    <div className="menu" aria-label="Primary">
                        <Link to="/collections">Collections</Link>
                        <Link to="/heritage">Heritage</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/cart">
                            Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
