import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-lv">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img
                                src="/logo-final.jpg"
                                alt="Murgdur"
                                style={{ width: '40px', height: '40px', objectFit: 'cover', objectPosition: 'center 35%' }}
                            />
                            <div className="footer-logo-text">MURGDUR</div>
                        </div>
                        <p className="footer-tagline">
                            Luxury fashion house founded in 2019. Crafted with a royal design language and unwavering commitment to excellence.
                        </p>
                        <p className="footer-dedication">In loving memory of Sri Sundershan Duraisamy</p>
                    </div>

                    <div className="footer-links">
                        <h4>Collections</h4>
                        <Link to="/collections?category=handbags">Handbags</Link>
                        <Link to="/collections?category=watches">Watches</Link>
                        <Link to="/collections?category=perfume">Fragrance</Link>
                        <Link to="/collections?category=belts">Leather Goods</Link>
                        <Link to="/collections">View All</Link>
                    </div>

                    <div className="footer-links">
                        <h4>About</h4>
                        <Link to="/heritage">Heritage</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/faq">FAQ</Link>
                    </div>

                    <div className="footer-links">
                        <h4>Client Services</h4>
                        <Link to="/shipping">Shipping</Link>
                        <Link to="/returns">Returns</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {currentYear} Murgdur. All rights reserved.</p>
                    <div className="footer-social">
                        <span>Follow us:</span>
                        <a href="#" aria-label="Instagram">Instagram</a>
                        <a href="#" aria-label="Facebook">Facebook</a>
                        <a href="#" aria-label="Twitter">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
