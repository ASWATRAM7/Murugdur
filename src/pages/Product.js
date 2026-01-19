import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import productsData from '../data/products.json';
import './Product.css';

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        // Find the product
        const foundProduct = productsData.products.find(p => p.id === id);
        setProduct(foundProduct);

        // Get recommended products from same category
        if (foundProduct) {
            const sameCategory = productsData.products
                .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
                .slice(0, 4);
            setRecommended(sameCategory);
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }, [id]);

    const formatPrice = (price, currency) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency || 'INR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const getCategoryName = (key) => {
        const category = productsData.categories.find(c => c.key === key);
        return category ? category.name : key;
    };

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                currency: product.currency,
                image: product.image,
                quantity: quantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Dispatch event for cart update
        window.dispatchEvent(new Event('cartUpdated'));

        // Show toast notification
        alert(`Added ${quantity} ${product.name} to cart!`);
    };

    if (!product) {
        return (
            <main className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--lv-brown)' }}>Product not found</h1>
                <Link to="/collections" className="btn-lv btn-lv-primary" style={{ marginTop: '20px', display: 'inline-flex' }}>
                    Back to Collections
                </Link>
            </main>
        );
    }

    return (
        <main className="product-page">
            <div className="container">
                <div className="product-layout">
                    <div className="product-image-section">
                        <div className="panel">
                            <div className="product-image-wrapper">
                                <img src={product.image} alt={product.name} className="image-cover" />
                            </div>
                            <div className="toolbar" style={{ borderBottom: 'none' }}>
                                <div className="left">
                                    <span className="product-meta-text">Royal Finish · Premium Materials</span>
                                </div>
                                <div className="right">
                                    <Link to="/collections" className="btn-lv btn-lv-outline btn-sm">
                                        Back to Collections
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="product-details-section">
                        <div className="panel padded">
                            <div className="product-kicker">Murugdur Atelier</div>
                            <h1 className="product-title">{product.name}</h1>
                            <div className="product-price-large">{formatPrice(product.price, product.currency)}</div>
                            <p className="product-description">{product.description}</p>

                            <div className="divider"></div>

                            <div className="product-actions">
                                <div className="quantity-selector">
                                    <label htmlFor="quantity">Quantity</label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="input"
                                        style={{ width: '80px' }}
                                    />
                                </div>
                                <div style={{ marginTop: '18px' }}>
                                    <button onClick={addToCart} className="btn-lv btn-lv-primary">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <table className="product-details-table">
                                <tbody>
                                    <tr>
                                        <td>SKU</td>
                                        <td>{product.sku}</td>
                                    </tr>
                                    <tr>
                                        <td>Category</td>
                                        <td>{getCategoryName(product.category)}</td>
                                    </tr>
                                    <tr>
                                        <td>Material</td>
                                        <td>{product.material}</td>
                                    </tr>
                                    <tr>
                                        <td>Color</td>
                                        <td>{product.color}</td>
                                    </tr>
                                    <tr>
                                        <td>Size</td>
                                        <td>{product.size}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="product-note">
                                Complimentary luxury packaging. Proceed to secure checkout from your cart.
                            </div>
                        </div>
                    </div>
                </div>

                {recommended.length > 0 && (
                    <div className="recommended-section">
                        <div className="section-header-center">
                            <h2 className="section-title-large">You May Also Like</h2>
                            <p className="section-subtitle">From the same collection</p>
                        </div>
                        <div className="products-grid">
                            {recommended.map(rec => (
                                <Link
                                    key={rec.id}
                                    className="product-card"
                                    to={`/product/${rec.id}`}
                                >
                                    <div className="product-card-image">
                                        <img className="image-cover" src={rec.image} alt={rec.name} />
                                        {rec.badge && <div className="product-badge">{rec.badge}</div>}
                                    </div>
                                    <div className="product-card-content">
                                        <div className="product-card-category">{getCategoryName(rec.category)}</div>
                                        <h3 className="product-card-title">{rec.name}</h3>
                                        <div className="product-card-price">{formatPrice(rec.price, rec.currency)}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Product;
