import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import './Heritage.css';

function Heritage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="heritage-page">
            {/* Hero Section with Parallax */}
            <section className="heritage-hero">
                <div className="heritage-hero-bg">
                    <img src="/assets/heritage_hero.png" alt="Murgdur Heritage" className="parallax-image" />
                    <div className="heritage-hero-overlay"></div>
                </div>
                <div className="heritage-hero-content">
                    <div className="container">
                        <BackButton label="Back" className="dark" />
                        <div className="heritage-hero-text">
                            <span className="hero-kicker fade-in-up">Since 2019</span>
                            <h1 className="hero-title fade-in-up delay-1">A Legacy of Excellence</h1>
                            <p className="hero-subtitle fade-in-up delay-2">
                                Where timeless craftsmanship meets modern elegance
                            </p>
                        </div>
                    </div>
                </div>
                <div className="scroll-indicator">
                    <div className="scroll-arrow"></div>
                </div>
            </section>

            {/* Founder Story Section */}
            <section className="founder-section">
                <div className="container">
                    <div className="founder-grid">
                        <div className="founder-image-wrapper">
                            <div className="founder-image-frame">
                                <img src="/assets/founder_portrait.png" alt="Sri Sundershan Duraisamy" className="founder-image" />
                                <div className="image-decoration"></div>
                            </div>
                            <div className="founder-quote">
                                <svg className="quote-icon" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                                </svg>
                                <p>"Excellence is not a destination, it's a journey of continuous refinement."</p>
                            </div>
                        </div>
                        <div className="founder-content">
                            <span className="section-kicker">Our Founder</span>
                            <h2 className="section-title">In Memory of Sri Sundershan Duraisamy</h2>
                            <div className="founder-years">1960 - 2019</div>
                            <div className="founder-story">
                                <p className="lead-text">
                                    Founded in 2019 by the late Sri Sundershan Duraisamy, Murgdur represents more than a fashion house—it is a testament to timeless craftsmanship and unwavering dedication to quality.
                                </p>
                                <p>
                                    With a vision rooted in excellence and a passion for creating pieces that transcend trends, he established Murgdur as a symbol of refined luxury. Every piece we create honors his legacy, embodying the principles of meticulous attention to detail and uncompromising quality that he held dear.
                                </p>
                                <p>
                                    His philosophy was simple yet profound: true luxury lies not in ostentation, but in the quiet confidence of impeccable craftsmanship. This guiding principle continues to inspire every stitch, every cut, and every creation that bears the Murgdur name.
                                </p>
                            </div>
                            <div className="founder-signature">
                                <div className="signature-line"></div>
                                <span>Forever in our hearts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="container">
                    <div className="section-header-center">
                        <span className="section-kicker">Our Philosophy</span>
                        <h2 className="section-title-large">What We Stand For</h2>
                        <p className="section-subtitle">
                            The principles that guide every creation
                        </p>
                    </div>

                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <h3>Craftsmanship</h3>
                            <p>
                                Every piece is meticulously crafted by skilled artisans who have honed their craft over decades, ensuring unparalleled quality in every stitch.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                            </div>
                            <h3>Timelessness</h3>
                            <p>
                                We create pieces that transcend fleeting trends, designed to remain elegant and relevant for generations to come.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <h3>Heritage</h3>
                            <p>
                                Rooted in tradition yet embracing innovation, we honor the legacy of our founder while evolving with modern sensibilities.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                                </svg>
                            </div>
                            <h3>Quality</h3>
                            <p>
                                We source only the finest materials from around the world, ensuring each creation meets our exacting standards of excellence.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                    <line x1="12" y1="22.08" x2="12" y2="12" />
                                </svg>
                            </div>
                            <h3>Sustainability</h3>
                            <p>
                                Committed to responsible practices, we ensure our creations are made with respect for both people and planet.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <h3>Integrity</h3>
                            <p>
                                Transparency and honesty guide every decision we make, building lasting relationships with our clients and partners.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Craftsmanship Showcase */}
            <section className="craftsmanship-showcase">
                <div className="showcase-split">
                    <div className="showcase-image">
                        <img src="/assets/craftsmanship_detail.png" alt="Artisan Craftsmanship" />
                        <div className="showcase-badge">
                            <span>Handcrafted Excellence</span>
                        </div>
                    </div>
                    <div className="showcase-content">
                        <div className="showcase-inner">
                            <span className="section-kicker">The Art of Making</span>
                            <h2 className="section-title">Artisan Craftsmanship</h2>
                            <p className="lead-text">
                                Each Murgdur piece is a masterwork of precision and passion, created by artisans who have dedicated their lives to perfecting their craft.
                            </p>
                            <div className="craftsmanship-stats">
                                <div className="stat-item">
                                    <div className="stat-number">50+</div>
                                    <div className="stat-label">Hours per piece</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">100%</div>
                                    <div className="stat-label">Handcrafted</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">25+</div>
                                    <div className="stat-label">Master artisans</div>
                                </div>
                            </div>
                            <ul className="feature-list">
                                <li>Premium Italian and French leathers</li>
                                <li>Hand-stitched with precision</li>
                                <li>Traditional techniques passed down through generations</li>
                                <li>Rigorous quality control at every stage</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="timeline-section">
                <div className="container">
                    <div className="section-header-center">
                        <span className="section-kicker">Our Journey</span>
                        <h2 className="section-title-large">Milestones</h2>
                    </div>

                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-year">2019</div>
                            <div className="timeline-content">
                                <h3>The Beginning</h3>
                                <p>Sri Sundershan Duraisamy founded Murgdur with a vision to create timeless luxury pieces that honor traditional craftsmanship.</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-year">2020</div>
                            <div className="timeline-content">
                                <h3>First Collection</h3>
                                <p>Launch of our signature handbag collection, featuring the iconic Royale Monogram design that became an instant classic.</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-year">2022</div>
                            <div className="timeline-content">
                                <h3>Expansion</h3>
                                <p>Introduced watches, perfumes, and leather accessories, expanding our commitment to excellence across multiple categories.</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-year">2024</div>
                            <div className="timeline-content">
                                <h3>Global Recognition</h3>
                                <p>Murgdur pieces worn by discerning clients worldwide, cementing our reputation for uncompromising quality.</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-year">2026</div>
                            <div className="timeline-content">
                                <h3>Legacy Continues</h3>
                                <p>Honoring our founder's vision while embracing innovation, we continue to create pieces that transcend time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="heritage-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Experience the Legacy</h2>
                        <p>Discover our collections and become part of the Murgdur story</p>
                        <Link to="/collections" className="btn-large primary">
                            Explore Collections
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Heritage;
