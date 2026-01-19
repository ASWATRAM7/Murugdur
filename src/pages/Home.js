import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import './Home.css';

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        // Load featured products
        const featured = productsData.featuredIds
            .map(id => productsData.products.find(p => p.id === id))
            .filter(Boolean)
            .slice(0, 4);
        setFeaturedProducts(featured);
    }, []);

    const formatPrice = (price, currency) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency || 'INR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <main className="home">
            {/* Full-Screen Hero */}
            <section className="hero-fullscreen">
                <img className="hero-fullscreen-bg" src="/assets/model-coat.webp" alt="" />
                <div className="hero-fullscreen-content">
                    <div className="hero-fullscreen-text">
                        <div className="kicker-light">Winter 2026 Collection</div>
                        <h1 className="hero-fullscreen-title">The Art of Presence</h1>
                        <p className="hero-fullscreen-subtitle">Discover the new season—where heritage meets modernity</p>
                        <div className="hero-actions-center">
                            <Link className="btn-large primary" to="/collections">Explore the Collection</Link>
                        </div>
                    </div>
                </div>
                <div className="hero-fullscreen-overlay"></div>
            </section>

            {/* Signature Collections */}
            <section className="section-spacious">
                <div className="container">
                    <div className="section-header-center">
                        <div className="kicker">Signature Collections</div>
                        <h2 className="section-title-large">Timeless Elegance</h2>
                        <p className="section-subtitle">Timeless pieces that define Murugdur's legacy</p>
                    </div>

                    <div className="dual-grid">
                        <Link className="editorial-card large" to="/collections?category=handbags">
                            <div className="editorial-card-media">
                                <img className="image-cover" src="/assets/hero-handbag.png" alt="Murugdur Handbags" />
                            </div>
                            <div className="editorial-card-content">
                                <div className="badge-luxury">Signature</div>
                                <h3 className="editorial-title">Handbags</h3>
                                <p className="editorial-desc">Structured silhouettes, refined hardware</p>
                                <span className="link-arrow">Discover →</span>
                            </div>
                        </Link>

                        <Link className="editorial-card large" to="/collections?category=wallets">
                            <div className="editorial-card-media">
                                <img className="image-cover" src="/assets/wallet-luxury.png" alt="Murugdur Wallets" />
                            </div>
                            <div className="editorial-card-content">
                                <div className="badge-luxury">Leather Goods</div>
                                <h3 className="editorial-title">Wallets</h3>
                                <p className="editorial-desc">Italian leather, refined craftsmanship</p>
                                <span className="link-arrow">Discover →</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Full-Width Editorial Banner */}
            <section className="editorial-banner">
                <img className="editorial-banner-bg" src="/assets/perfume-luxury.png" alt="" />
                <div className="editorial-banner-content">
                    <div className="editorial-banner-text">
                        <div className="kicker-light">Fragrance</div>
                        <h2 className="editorial-banner-title">Murugdur Oud Intense</h2>
                        <p className="editorial-banner-subtitle">A deep, warm accord of oud and amber—bold, clean, unforgettable</p>
                        <Link className="btn-large light" to="/collections?category=perfume">Explore Fragrance</Link>
                    </div>
                </div>
                <div className="editorial-banner-overlay"></div>
            </section>

            {/* Featured Products */}
            <section className="section-spacious bg-tinted">
                <div className="container">
                    <div className="section-header-center">
                        <div className="kicker">Featured Selection</div>
                        <h2 className="section-title-large">Curated for You</h2>
                    </div>

                    <div className="products-grid-luxury">
                        {featuredProducts.map(product => (
                            <Link key={product.id} className="product-card-luxury" to={`/product/${product.id}`}>
                                <div className="product-card-media">
                                    <img className="image-cover" src={product.image} alt={product.name} />
                                    {product.badge && <div className="product-badge-luxury">{product.badge}</div>}
                                </div>
                                <div className="product-card-info">
                                    <div className="product-category-small">{product.category}</div>
                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="product-price">{formatPrice(product.price, product.currency)}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leather Goods Showcase */}
            <section className="section-spacious">
                <div className="container">
                    <div className="section-header-center">
                        <div className="kicker">Leather Goods</div>
                        <h2 className="section-title-large">Crafted for Longevity</h2>
                        <p className="section-subtitle">Premium materials meet meticulous construction</p>
                    </div>

                    <div className="triple-grid">
                        <Link className="category-card" to="/collections?category=belts">
                            <div className="category-card-media">
                                <img className="image-cover" src="/assets/shoes-luxury.png" alt="Belts" />
                            </div>
                            <div className="category-card-content">
                                <h3>Belts</h3>
                                <p>Gold hardware & full-grain leather</p>
                            </div>
                        </Link>

                        <Link className="category-card" to="/collections?category=wallets">
                            <div className="category-card-media">
                                <img className="image-cover" src="/assets/wallet-luxury.png" alt="Wallets" />
                            </div>
                            <div className="category-card-content">
                                <h3>Wallets</h3>
                                <p>Italian leather, minimal profile</p>
                            </div>
                        </Link>

                        <Link className="category-card" to="/collections?category=handbags">
                            <div className="category-card-media">
                                <img className="image-cover" src="/assets/handbag-black.png" alt="Handbags" />
                            </div>
                            <div className="category-card-content">
                                <h3>Handbags</h3>
                                <p>Structured silhouettes, refined hardware</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Ready-to-Wear Editorial */}
            <section className="split-editorial">
                <div className="split-editorial-media">
                    <img className="image-cover" src="/assets/blazer-luxury.png" alt="Ready-to-Wear" />
                </div>
                <div className="split-editorial-content">
                    <div className="split-editorial-inner">
                        <div className="kicker">Ready-to-Wear</div>
                        <h2 className="split-editorial-title">Tailoring & Outerwear</h2>
                        <p className="split-editorial-text">
                            Clean construction, disciplined proportions, and a quiet signature—designed to feel finished from every
                            angle. From tailored trousers to royal overcoats, each piece embodies the Murugdur philosophy of restrained
                            luxury.
                        </p>
                        <ul className="split-editorial-features">
                            <li>Premium wool blends</li>
                            <li>Structured shoulders</li>
                            <li>Refined silhouettes</li>
                            <li>Timeless design</li>
                        </ul>
                        <Link className="btn-large primary" to="/collections?category=overcoats">Explore Outerwear</Link>
                    </div>
                </div>
            </section>

            {/* Accessories Carousel */}
            <section className="section-spacious">
                <div className="container">
                    <div className="section-header-center">
                        <div className="kicker">Accessories</div>
                        <h2 className="section-title-large">The Finishing Touch</h2>
                        <p className="section-subtitle">Complete your look with signature details</p>
                    </div>

                    <div className="quad-grid">
                        <Link className="accessory-card" to="/collections?category=tshirts">
                            <div className="accessory-card-media">
                                <img className="image-cover" src="/assets/tshirt-luxury.png" alt="T-Shirts" />
                                <div className="badge-overlay">New</div>
                            </div>
                            <div className="accessory-card-content">
                                <h4>T-Shirts</h4>
                                <p className="small">Premium heavyweight cotton</p>
                            </div>
                        </Link>

                        <Link className="accessory-card" to="/collections?category=belts">
                            <div className="accessory-card-media">
                                <img className="image-cover" src="/assets/shoes-luxury.png" alt="Footwear" />
                                <div className="badge-overlay">Signature</div>
                            </div>
                            <div className="accessory-card-content">
                                <h4>Footwear</h4>
                                <p className="small">Italian leather craftsmanship</p>
                            </div>
                        </Link>

                        <Link className="accessory-card" to="/collections?category=wallets">
                            <div className="accessory-card-media">
                                <img className="image-cover" src="/assets/wallet-luxury.png" alt="Wallets" />
                                <div className="badge-overlay">Classic</div>
                            </div>
                            <div className="accessory-card-content">
                                <h4>Wallets</h4>
                                <p className="small">Minimal profile, maximum refinement</p>
                            </div>
                        </Link>

                        <Link className="accessory-card" to="/collections?category=handbags">
                            <div className="accessory-card-media">
                                <img className="image-cover" src="/assets/hero-handbag.png" alt="Handbags" />
                                <div className="badge-overlay">Premium</div>
                            </div>
                            <div className="accessory-card-content">
                                <h4>Handbags</h4>
                                <p className="small">Signature MD monogram</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Heritage Story */}
            <section className="heritage-section">
                <div className="container">
                    <div className="heritage-content">
                        <div className="kicker">Our Story</div>
                        <h2 className="heritage-title">A Legacy of Excellence</h2>
                        <p className="heritage-text">
                            Founded in 2019 by the late Sri Sundershan Duraisamy, Murugdur represents more than a fashion house—it is
                            a testament to timeless craftsmanship and unwavering dedication to quality. Every piece we create honors his
                            vision of elegance that transcends trends.
                        </p>
                        <Link className="link-arrow-large" to="/heritage">Discover Our Heritage →</Link>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-spacious bg-tinted">
                <div className="container">
                    <div className="section-header-center">
                        <div className="kicker">Maison Services</div>
                        <h2 className="section-title-large">The Murugdur Experience</h2>
                    </div>

                    <div className="services-grid">
                        <div className="service-card">
                            <h4>Secure Checkout</h4>
                            <p>Protected payment processing with industry-leading security</p>
                        </div>

                        <div className="service-card">
                            <h4>Concierge Support</h4>
                            <p>Personalized assistance for all your luxury needs</p>
                        </div>

                        <div className="service-card">
                            <h4>Craft & Care</h4>
                            <p>Expert maintenance and restoration services</p>
                        </div>

                        <div className="service-card">
                            <h4>Complimentary Delivery</h4>
                            <p>White-glove delivery service worldwide</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter-section">
                <div className="container">
                    <div className="newsletter-content">
                        <div className="kicker-light">Stay Connected</div>
                        <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
                        <p className="newsletter-text">
                            Receive exclusive updates on new collections, special events, and artisan stories
                        </p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Enter your email" className="newsletter-input" />
                            <button type="submit" className="btn-large primary">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
