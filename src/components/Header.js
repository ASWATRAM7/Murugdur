import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [cartCount, setCartCount] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
        };

        updateCartCount();
        window.addEventListener('cartUpdated', updateCartCount);
        return () => window.removeEventListener('cartUpdated', updateCartCount);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <header className="topbar">
                <div className="nav">
                    {/* Left Section */}
                    <div className="nav-left">
                        <button className="menu-button" onClick={toggleMenu}>Menu</button>
                        <button className="search-button">Search</button>
                    </div>

                    {/* Center - Brand */}
                    <Link className="brand" to="/" aria-label="Murgdur Home">
                        <div className="brand-title">MURGDUR</div>
                    </Link>

                    {/* Right Section */}
                    <div className="nav-right">
                        <Link to="/contact" className="icon-link">Call Us</Link>
                        <Link to="/login" className="icon-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </Link>
                        <Link to="/cart" className="icon-link cart-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Menu Overlay Backdrop */}
            <div
                className={`menu-overlay-backdrop ${menuOpen ? 'open' : ''}`}
                onClick={closeMenu}
            />

            {/* Menu Overlay */}
            <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
                <div className="menu-header">
                    <div className="brand-title">MURGDUR</div>
                    <button className="menu-close" onClick={closeMenu}>×</button>
                </div>

                <div className="menu-content">
                    {/* Collections */}
                    <div className="menu-section">
                        <div className="menu-section-title">Collections</div>
                        <div className="menu-links">
                            <Link to="/collections" className="menu-link" onClick={closeMenu}>All Collections</Link>
                            <Link to="/collections?category=handbags" className="menu-link" onClick={closeMenu}>Handbags</Link>
                            <Link to="/collections?category=watches" className="menu-link" onClick={closeMenu}>Watches</Link>
                            <Link to="/collections?category=perfume" className="menu-link" onClick={closeMenu}>Perfume</Link>
                            <Link to="/collections?category=belts" className="menu-link" onClick={closeMenu}>Belts</Link>
                            <Link to="/collections?category=wallets" className="menu-link" onClick={closeMenu}>Wallets</Link>
                            <Link to="/collections?category=tshirts" className="menu-link" onClick={closeMenu}>T-Shirts</Link>
                            <Link to="/collections?category=trousers" className="menu-link" onClick={closeMenu}>Trousers</Link>
                            <Link to="/collections?category=overcoats" className="menu-link" onClick={closeMenu}>Overcoats</Link>
                            <Link to="/collections?category=oversized" className="menu-link" onClick={closeMenu}>Oversized</Link>
                            <Link to="/collections?category=caps" className="menu-link" onClick={closeMenu}>Caps</Link>
                            <Link to="/collections?category=sweatshirts" className="menu-link" onClick={closeMenu}>Sweatshirts</Link>
                        </div>
                    </div>

                    {/* About */}
                    <div className="menu-section">
                        <div className="menu-section-title">About</div>
                        <div className="menu-links">
                            <Link to="/heritage" className="menu-link" onClick={closeMenu}>Heritage</Link>
                            <Link to="/contact" className="menu-link" onClick={closeMenu}>Contact</Link>
                        </div>
                    </div>

                    {/* Account */}
                    <div className="menu-section">
                        <div className="menu-section-title">Account</div>
                        <div className="menu-links">
                            <Link to="/login" className="menu-link" onClick={closeMenu}>Login</Link>
                            <Link to="/signup" className="menu-link" onClick={closeMenu}>Sign Up</Link>
                            <Link to="/cart" className="menu-link" onClick={closeMenu}>Cart</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
