const fs = require('fs');
const path = require('path');

const productFile = path.join(__dirname, 'src/data/products.json');
let data = JSON.parse(fs.readFileSync(productFile, 'utf8'));

// 1. Clean up previous generated items
data.products = data.products.filter(p => !p.id.includes('-gen-'));

// 1.5 Fix static items that have bad images
data.products.forEach(p => {
    if (p.image === './assets/blazer-luxury.png') {
        if (p.category === 'trousers') p.image = './assets/pdt-extra-05.png'; // Reassign to Chinos
        if (p.category === 'sweatshirts') p.image = './assets/gen_sweat_grey.png'; // Reassign to Grey Sweat
    }
});

// 2. Define richer asset mappings with ALL available assets
const assets = {
    handbags: [
        { img: './assets/hero-handbag.png', color: 'Onyx/Gold', name: 'Monogram Tote' },
        { img: './assets/handbag-black.png', color: 'Midnight', name: 'Trunk Bag' },
        { img: './assets/bag-luxury-2.png', color: 'Emerald', name: 'Croco Handbag' },
        { img: './assets/gen_handbag_tan.png', color: 'Tan', name: 'Voyager Tote' }
    ],
    watches: [
        { img: './assets/watch-luxury.png', color: 'Black/Gold', name: 'Regal Chrono' },
        { img: './assets/pdt-extra-02.png', color: 'Silver', name: 'Heritage' },
        { img: './assets/gen_watch_silver.png', color: 'Steel', name: 'Aeternitas' }
    ],
    perfume: [
        { img: './assets/perfume-luxury.png', color: 'Gold', name: 'Oud Intense' },
        { img: './assets/pdt-extra-01.png', color: 'Noir', name: 'Night Parfum' },
        { img: './assets/perfume-luxury.png', color: 'Rose', name: 'Rose Absolu' }
    ],
    belts: [
        { img: './assets/belt-luxury.png', color: 'Black', name: 'Crest Belt' },
        { img: './assets/shoes-luxury.png', color: 'Tan', name: 'Signature Belt' }
    ],
    wallets: [
        { img: './assets/wallet-luxury.png', color: 'Black', name: 'Slim Wallet' },
        { img: './assets/pdt-extra-03.png', color: 'Navy', name: 'Bifold' }
    ],
    tshirts: [
        { img: './assets/tshirt-luxury.png', color: 'Ivory', name: 'Atelier Tee' },
        { img: './assets/pdt-extra-04.png', color: 'Black', name: 'Crest Tee' },
        { img: './assets/pdt-extra-07.png', color: 'Charcoal', name: 'Mercerized Tee' },
        { img: './assets/gen_tee_olive.png', color: 'Olive', name: 'Essential Tee' },
        { img: './assets/gen_tee_striped.png', color: 'Navy/White', name: 'Breton Tee' }
    ],
    trousers: [
        { img: './assets/pdt-extra-05.png', color: 'Khaki', name: 'Chino' },
        { img: './assets/gen_trousers_stack.png', color: 'Various', name: 'Trouser Collection' }
    ],
    overcoats: [
        { img: './assets/coat-luxury.png', color: 'Black', name: 'Royal Overcoat' },
        { img: './assets/model-coat.webp', color: 'Camel', name: 'Classic Coat' },
        { img: './assets/gen_coat_grey.png', color: 'Charcoal', name: 'Wool Overcoat' },
        { img: './assets/gen_coat_navy.png', color: 'Navy', name: 'Trench Coat' },
        { img: './assets/gen_coat_check.png', color: 'Beige/Check', name: 'Houndstooth Coat' }
    ],
    oversized: [
        { img: './assets/pdt-extra-06.png', color: 'Stone', name: 'Boxy Hoodie' },
        { img: './assets/pdt-extra-07.png', color: 'Onyx', name: 'Oversized Tee' },
        { img: './assets/gen_hoodie_black.png', color: 'Black', name: 'Street Hoodie' },
        { img: './assets/gen_hoodie_beige.png', color: 'Oatmeal', name: 'Artisan Hoodie' }
    ],
    caps: [
        { img: './assets/pdt-extra-08.png', color: 'Midnight', name: 'Crest Cap' },
        { img: './assets/gen_cap_navy.png', color: 'Navy', name: 'Tech Cap' }
    ],
    sweatshirts: [
        { img: './assets/gen_sweat_grey.png', color: 'Grey', name: 'Luxe Pullover' }
    ]
};

const adjectives = ['Grand', 'Royal', 'Heritage', 'Modern', 'Classic', 'Signature', 'Urban', 'Elegant', 'Timeless', 'Artisan', 'Premium', 'Essential', 'Limited', 'Exclusive', 'Sartorial'];

function generateProduct(category, index) {
    const key = category.key.toLowerCase().replace(' ', '');
    const assetPool = assets[key] || assets[category.key];

    if (!assetPool || assetPool.length === 0) {
        console.log(`No assets for ${key}`);
        return null;
    }

    const variant = assetPool[index % assetPool.length];
    const adjective = adjectives[(index + category.key.length) % adjectives.length];

    let basePrice = 8000;
    if (['handbags', 'watches', 'overcoats'].includes(key)) basePrice = 25000;

    const price = basePrice + (Math.floor(Math.random() * 40) * 500);

    return {
        id: `mdr-${key.substring(0, 3)}-gen-${Date.now()}-${index}`,
        name: `${adjective} ${variant.name}`,
        category: category.key,
        price: price,
        currency: "INR",
        badge: index % 3 === 0 ? "New Arrival" : (index % 5 === 0 ? "Bestseller" : ""),
        sku: `MDR-${key.substring(0, 3).toUpperCase()}-GEN-${index}`,
        material: "Premium " + (index % 2 === 0 ? "Cotton" : "Blend"),
        color: variant.color,
        size: "Standard",
        description: `Experience the pinnacle of ${category.name.toLowerCase()} design. This ${variant.name} features our signature craftsmanship.`,
        image: variant.img
    };
}

// 3. Generate new items
data.categories.forEach(cat => {
    const existingCount = data.products.filter(p => p.category === cat.key).length;
    const targetCount = 15;

    if (existingCount < targetCount) {
        const needed = targetCount - existingCount;
        for (let i = 0; i < needed; i++) {
            const newProd = generateProduct(cat, i);
            if (newProd) data.products.push(newProd);
        }
    }
});

fs.writeFileSync(productFile, JSON.stringify(data, null, 2));
console.log(`Cleaned, Fixed, and Regenerated catalog. Total products: ${data.products.length}`);
