import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import productsData from '../data/products.json';
import BackButton from '../components/BackButton';
import './Collections.css';

function Collections() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');

    useEffect(() => {
        setProducts(productsData.products);

        // Check for category in URL
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    useEffect(() => {
        let result = [...products];

        // Filter by category
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'featured':
            default:
                // Keep original order for featured
                break;
        }

        setFilteredProducts(result);
    }, [products, selectedCategory, searchQuery, sortBy]);

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

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === 'all') {
            setSearchParams({});
        } else {
            setSearchParams({ category });
        }
    };


    return (
        <main className="collections-page">
            <div className="container">
                <div style={{ paddingTop: '24px', paddingBottom: '8px' }}>
                    <BackButton label="Back" />
                </div>
                <div className="page-title">
                    <h1>{selectedCategory === 'all' ? 'All Collections' : getCategoryName(selectedCategory)}</h1>
                    <p>
                        {selectedCategory === 'all'
                            ? 'Explore our complete range of luxury products'
                            : `Discover our ${getCategoryName(selectedCategory).toLowerCase()} collection`
                        }
                    </p>
                </div>
            </div>

            <div className="container">
                <div className="panel">
                    <div className="toolbar">
                        <div className="left">
                            <div className="pills">
                                <button
                                    className={`pill ${selectedCategory === 'all' ? 'active' : ''}`}
                                    onClick={() => handleCategoryClick('all')}
                                >
                                    All
                                </button>
                                {productsData.categories.map(cat => (
                                    <button
                                        key={cat.key}
                                        className={`pill ${selectedCategory === cat.key ? 'active' : ''}`}
                                        onClick={() => handleCategoryClick(cat.key)}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="right">
                            <div className="text-sm">{filteredProducts.length} products</div>
                        </div>
                    </div>

                    <div className="toolbar" style={{ borderBottom: 'none' }}>
                        <div className="left" style={{ flex: 1 }}>
                            <input
                                className="input"
                                placeholder="Search products"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%', maxWidth: '400px' }}
                            />
                        </div>
                        <div className="right">
                            <select
                                className="input"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{ width: '190px' }}
                            >
                                <option value="featured">Featured</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name">Name</option>
                            </select>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="container" style={{ padding: 'var(--spacing-lg) 0 var(--spacing-xl)' }}>
                        {filteredProducts.length > 0 ? (
                            <div className="products-grid">
                                {filteredProducts.map(product => (
                                    <Link
                                        key={product.id}
                                        className="product-card"
                                        to={`/product/${product.id}`}
                                    >
                                        <div className="product-card-image">
                                            <img className="image-cover" src={product.image} alt={product.name} />
                                            {product.badge && <div className="product-badge">{product.badge}</div>}
                                        </div>
                                        <div className="product-card-content">
                                            <div className="product-card-category">{getCategoryName(product.category)}</div>
                                            <h3 className="product-card-title">{product.name}</h3>
                                            <div className="product-card-price">{formatPrice(product.price, product.currency)}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="no-results">
                                <h3>No products found</h3>
                                <p>Try adjusting your search or filters</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="spacer-md"></div>

                <div style={{
                    textAlign: 'center',
                    padding: 'var(--spacing-md)',
                    background: 'var(--lv-cream)',
                    fontSize: '13px',
                    color: 'var(--lv-gray)'
                }}>
                    Add items to your cart and proceed to secure checkout.
                </div>
            </div>
        </main>
    );
}

export default Collections;
