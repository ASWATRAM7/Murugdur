const fs = require('fs');
const path = require('path');

const productFile = path.join(__dirname, 'src/data/products.json');
const data = JSON.parse(fs.readFileSync(productFile, 'utf8'));

// Asset Mappings
const assets = {
    handbags: [
        { img: './assets/hero-handbag.png', color: 'Onyx & Gold', name: 'Monogram' },
        { img: './assets/handbag-black.png', color: 'Midnight', name: 'Trunk' },
        { img: './assets/bag-luxury-2.png', color: 'Emerald', name: 'Croco' },
        { img: './assets/gen_handbag_tan.png', color: 'Tan', name: 'Voyager' }
    ],
    watches: [
        { img: './assets/watch-luxury.png', color: 'Black/Gold', name: 'Regal' },
        { img: './assets/pdt-extra-02.png', color: 'Silver', name: 'Heritage' },
        { img: './assets/gen_watch_silver.png', color: 'Steel', name: 'Aeternitas' }
    ],
    perfume: [
        { img: './assets/perfume-luxury.png', color: 'Standard', name: 'Oud' },
        { img: './assets/pdt-extra-01.png', color: 'Standard', name: 'Noir' }
    ],
    belts: [
        { img: './assets/belt-luxury.png', color: 'Midnight', name: 'Crest' },
        { img: './assets/shoes-luxury.png', color: 'Tan', name: 'Signature' } // keeping mapping
    ],
    wallets: [
        { img: './assets/wallet-luxury.png', color: 'Onyx', name: 'Slim' },
        { img: './assets/pdt-extra-03.png', color: 'Navy', name: 'Bifold' }
    ],
    tshirts: [
        { img: './assets/tshirt-luxury.png', color: 'Ivory', name: 'Atelier' },
        { img: './assets/pdt-extra-04.png', color: 'Black', name: 'Crest' },
        { img: './assets/pdt-extra-07.png', color: 'Charcoal', name: 'Mercerized' }
    ],
    trousers: [
        { img: './assets/blazer-luxury.png', color: 'Charcoal', name: 'Tailored' },
        { img: './assets/pdt-extra-05.png', color: 'Khaki', name: 'Chino' },
        { img: './assets/gen_trousers_stack.png', color: 'Various', name: 'Essential' }
    ],
    overcoats: [
        { img: './assets/coat-luxury.png', color: 'Black', name: 'Royal' },
        { img: './assets/model-coat.webp', color: 'Camel', name: 'Classic' }
    ],
    oversized: [
        { img: './assets/pdt-extra-06.png', color: 'Stone', name: 'Hoodie' },
        { img: './assets/pdt-extra-07.png', color: 'Onyx', name: 'Box Tee' }
    ],
    caps: [
        { img: './assets/pdt-extra-08.png', color: 'Midnight', name: 'Crest' },
        { img: './assets/gen_cap_navy.png', color: 'Navy', name: 'Sport' }
    ],
    sweatshirts: [
        { img: './assets/blazer-luxury.png', color: 'Black', name: 'Crest' },
        { img: './assets/gen_sweat_grey.png', color: 'Grey', name: 'Luxe' }
    ]
};

// Vocabulary for generation
const adjectives = ['Grand', 'Royal', 'Heritage', 'Luxe', 'Modern', 'Classic', 'Signature', 'Urban', 'Elegant', 'Timeless', 'Artisan', 'Premium', 'Essential', 'Limited', 'Exclusive'];
const materials = ['Leather', 'Canvas', 'Silk', 'Wool', 'Cotton', 'Cashmere', 'Velvet', 'Suede', 'Linen', 'Denim'];

function generateProduct(category, index) {
    const assetPool = assets[category.key] || assets[category.key.replace(' ', '').toLowerCase()];
    if (!assetPool) return null;

    const variant = assetPool[index % assetPool.length];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

    let basePrice = 10000;
    if (category.key === 'handbags' || category.key === 'watches') basePrice = 120000;
    if (category.key === 'perfume') basePrice = 15000;

    const price = basePrice + (Math.floor(Math.random() * 50) * 1000);

    return {
        id: `mdr-${category.key.substring(0, 3)}-gen-${Date.now()}-${index}`,
        name: `${adjective} ${variant.name} ${category.name.replace('s', '')}`, // crude singularization
        category: category.key,
        price: price,
        currency: "INR",
        badge: Math.random() > 0.7 ? "New Arrival" : (Math.random() > 0.8 ? "Bestseller" : ""),
        sku: `MDR-${category.key.substring(0, 3).toUpperCase()}-GEN-${index}`,
        material: "Premium " + materials[Math.floor(Math.random() * materials.length)],
        color: variant.color,
        size: "Standard",
        description: `Experience the pinnacle of ${category.name.toLowerCase()} design. This ${variant.name} edition features our signature craftsmanship and premium materials.`,
        image: variant.img
    };
}

// Expand categories
data.categories.forEach(cat => {
    const currentCount = data.products.filter(p => p.category === cat.key).length;
    const targetCount = 18; // Aim for 18 items per category

    if (currentCount < targetCount) {
        const needed = targetCount - currentCount;
        for (let i = 0; i < needed; i++) {
            const newProd = generateProduct(cat, i + currentCount);
            if (newProd) data.products.push(newProd);
        }
    }
});

// Write back
fs.writeFileSync(productFile, JSON.stringify(data, null, 2));
console.log(`Expanded catalog to ${data.products.length} total products`);
