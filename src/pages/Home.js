import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    const videoRef = useRef(null);

    useEffect(() => {
        // Ensure video plays
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log('Video autoplay failed:', error);
            });
        }
    }, []);

    return (
        <main className="home">
            {/* Full-Screen Hero with Video */}
            <section className="hero-fullscreen">
                <video
                    ref={videoRef}
                    className="hero-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/assets/hero-model-walking.png"
                >
                    <source src="/assets/hero-video.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
                <div className="hero-fullscreen-overlay"></div>
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
            </section>

            {/* Signature Collections */}
            <section className="section-spacious">
                <div className="container">
                    <div className="section-header-center">
                        <div className="kicker">Signature Collections</div>
                        <h2 className="section-title-large">Timeless Elegance</h2>
                        <p className="section-subtitle">Timeless pieces that define Murgdur's legacy</p>
                    </div>

                    <div className="dual-grid">
                        <Link className="editorial-card large" to="/collections?category=handbags">
                            <div className="editorial-card-media">
                                <img className="image-cover" src="/assets/hero-handbag.png" alt="Murgdur Handbags" />
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
                                <img className="image-cover" src="/assets/wallet-luxury.png" alt="Murgdur Wallets" />
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
                        <h2 className="editorial-banner-title">Murgdur Oud Intense</h2>
                        <p className="editorial-banner-subtitle">A deep, warm accord of oud and amber—bold, clean, unforgettable</p>
                        <Link className="btn-large light" to="/collections?category=perfume">Explore Fragrance</Link>
                    </div>
                </div>
                <div className="editorial-banner-overlay"></div>
            </section>

            {/* Featured Products - Split Screen Showcases */}
            <section className="product-showcase">
                <div className="showcase-item">
                    <div className="showcase-content">
                        <div className="showcase-text">
                            <div className="kicker">Signature Collection</div>
                            <h2 className="showcase-title">Royale Monogram Handbag</h2>
                            <p className="showcase-description">
                                A structured silhouette with refined hardware and a royal finish — built for evening arrivals and everyday prestige. Crafted from premium coated canvas with leather trim, this handbag embodies timeless elegance.
                            </p>
                            <ul className="showcase-features">
                                <li>Premium coated canvas with leather trim</li>
                                <li>Onyx & Gold color palette</li>
                                <li>34cm structured design</li>
                                <li>Refined hardware details</li>
                            </ul>
                            <div className="showcase-price">₹1,89,000</div>
                            <Link className="btn-large primary" to="/product/mdr-bag-royale-01">View Details</Link>
                        </div>
                    </div>
                    <div className="showcase-image">
                        <img src="/assets/mens-bag1.png" alt="Royale Monogram Handbag" />
                    </div>
                </div>
            </section>

            <section className="product-showcase reverse">
                <div className="showcase-item">
                    <div className="showcase-image">
                        <img src="/assets/watch1.png" alt="Regal Chronograph" />
                    </div>
                    <div className="showcase-content">
                        <div className="showcase-text">
                            <div className="kicker">Timepiece Excellence</div>
                            <h2 className="showcase-title">Regal Chronograph</h2>
                            <p className="showcase-description">
                                Precision timekeeping with a royal palette — for a statement that never shouts. Featuring stainless steel construction and sapphire crystal, this chronograph represents the pinnacle of luxury watchmaking.
                            </p>
                            <ul className="showcase-features">
                                <li>Stainless steel with sapphire crystal</li>
                                <li>Black & Gold finish</li>
                                <li>42mm case diameter</li>
                                <li>Swiss-inspired precision movement</li>
                            </ul>
                            <div className="showcase-price">₹1,49,000</div>
                            <Link className="btn-large primary" to="/product/mdr-watch-regal-01">View Details</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="product-showcase">
                <div className="showcase-item">
                    <div className="showcase-content">
                        <div className="showcase-text">
                            <div className="kicker">Fragrance</div>
                            <h2 className="showcase-title">Murgdur Oud Intense</h2>
                            <p className="showcase-description">
                                A deep, warm accord of oud and amber with a refined floral lift — bold, clean, and unforgettable. This signature fragrance captures the essence of luxury in every note, designed for those who appreciate the finer things.
                            </p>
                            <ul className="showcase-features">
                                <li>Eau de Parfum concentration</li>
                                <li>100ml premium bottle</li>
                                <li>Oud and amber base notes</li>
                                <li>Long-lasting signature scent</li>
                            </ul>
                            <div className="showcase-price">₹16,500</div>
                            <Link className="btn-large primary" to="/product/mdr-perfume-oud-01">View Details</Link>
                        </div>
                    </div>
                    <div className="showcase-image">
                        <img src="/assets/womens-perfume1.png" alt="Murgdur Oud Intense" />
                    </div>
                </div>
            </section>

            <section className="product-showcase reverse">
                <div className="showcase-item">
                    <div className="showcase-image">
                        <img src="/assets/coat1.png" alt="Royal Overcoat" />
                    </div>
                    <div className="showcase-content">
                        <div className="showcase-text">
                            <div className="kicker">Winter Collection</div>
                            <h2 className="showcase-title">Royal Overcoat</h2>
                            <p className="showcase-description">
                                A commanding long-line overcoat with a clean collar and premium finish — for cold-weather elegance. Crafted from the finest wool blend, this overcoat provides both warmth and sophistication.
                            </p>
                            <ul className="showcase-features">
                                <li>Premium wool blend fabric</li>
                                <li>Classic black finish</li>
                                <li>Available in S–XXL</li>
                                <li>Long-line silhouette</li>
                            </ul>
                            <div className="showcase-price">₹34,900</div>
                            <Link className="btn-large primary" to="/product/mdr-overcoat-royal-01">View Details</Link>
                        </div>
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
                            angle. From tailored trousers to royal overcoats, each piece embodies the Murgdur philosophy of restrained
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
                            Founded in 2019 by the late Sri Sundershan Duraisamy, Murgdur represents more than a fashion house—it is
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
                        <h2 className="section-title-large">The Murgdur Experience</h2>
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
