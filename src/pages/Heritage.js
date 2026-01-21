import React from 'react';
import './Heritage.css';

function Heritage() {
    return (
        <main className="heritage-page">
            {/* Hero Section */}
            <section className="heritage-hero">
                <div className="heritage-hero-content">
                    <div className="kicker-light">Our Story</div>
                    <h1>A Legacy of Excellence</h1>
                    <p>Founded in 2019, Murgdur represents the pinnacle of luxury craftsmanship</p>
                </div>
            </section>

            {/* Founder Story */}
            <section className="section-spacious">
                <div className="container">
                    <div className="heritage-content">
                        <div className="heritage-text-block">
                            <h2>In Memory of Sri Sundershan Duraisamy</h2>
                            <p>
                                Murgdur was founded in 2019 by the late Sri Sundershan Duraisamy, a visionary who believed that true
                                luxury lies not in ostentation, but in the quiet confidence of impeccable craftsmanship. His philosophy
                                was simple yet profound: create pieces that transcend trends and become treasured heirlooms.
                            </p>
                            <p>
                                Every product we create honors his legacy—a commitment to excellence, attention to detail, and an
                                unwavering dedication to quality that defines the Murgdur name.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section-spacious bg-tinted">
                <div className="container">
                    <div className="section-header-center">
                        <div className="kicker">Our Values</div>
                        <h2 className="section-title-large">What We Stand For</h2>
                    </div>

                    <div className="values-grid">
                        <div className="value-card">
                            <h3>Craftsmanship</h3>
                            <p>
                                Every piece is meticulously crafted by skilled artisans who have honed their craft over decades. We
                                believe in the marriage of traditional techniques with contemporary design.
                            </p>
                        </div>

                        <div className="value-card">
                            <h3>Quality</h3>
                            <p>
                                We source only the finest materials from around the world—Italian leather, Swiss movements, premium
                                fabrics—ensuring that every product meets our exacting standards.
                            </p>
                        </div>

                        <div className="value-card">
                            <h3>Timelessness</h3>
                            <p>
                                Our designs eschew fleeting trends in favor of enduring elegance. A Murgdur piece is an investment
                                that will remain relevant for generations.
                            </p>
                        </div>

                        <div className="value-card">
                            <h3>Sustainability</h3>
                            <p>
                                We are committed to responsible luxury—working with ethical suppliers, minimizing waste, and creating
                                products built to last, not to be discarded.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section-spacious">
                <div className="container">
                    <div className="section-header-center">
                        <div className="kicker">Our Journey</div>
                        <h2 className="section-title-large">Milestones</h2>
                    </div>

                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-year">2019</div>
                            <div className="timeline-content">
                                <h3>Foundation</h3>
                                <p>
                                    Murgdur is founded by Sri Sundershan Duraisamy with a vision to create luxury goods that honor
                                    traditional craftsmanship.
                                </p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-year">2020</div>
                            <div className="timeline-content">
                                <h3>First Collection</h3>
                                <p>
                                    Launch of our inaugural leather goods collection, featuring handcrafted handbags and wallets made
                                    from Italian leather.
                                </p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-year">2022</div>
                            <div className="timeline-content">
                                <h3>Expansion</h3>
                                <p>
                                    Introduction of our timepiece and fragrance lines, expanding our commitment to luxury across
                                    categories.
                                </p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-year">2024</div>
                            <div className="timeline-content">
                                <h3>Ready-to-Wear</h3>
                                <p>
                                    Launch of our ready-to-wear collection, bringing Murgdur's design philosophy to premium apparel.
                                </p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-year">2026</div>
                            <div className="timeline-content">
                                <h3>Global Presence</h3>
                                <p>
                                    Murgdur continues to grow, serving discerning clients worldwide while maintaining our commitment to
                                    excellence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Craftsmanship */}
            <section className="section-spacious bg-tinted">
                <div className="container">
                    <div className="heritage-content">
                        <div className="heritage-text-block">
                            <div className="kicker">Craftsmanship</div>
                            <h2>The Art of Making</h2>
                            <p>
                                At Murgdur, we believe that true luxury cannot be rushed. Each piece passes through the hands of
                                multiple artisans, each a master of their craft. From the initial sketch to the final stitch, every
                                step is executed with precision and care.
                            </p>
                            <p>
                                Our atelier combines time-honored techniques with modern innovation. Hand-stitching, edge-painting,
                                burnishing—these traditional methods ensure durability and beauty that machine production simply cannot
                                match.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Heritage;
