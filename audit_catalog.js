const fs = require('fs');
const path = require('path');

const productFile = path.join(__dirname, 'src/data/products.json');
const data = JSON.parse(fs.readFileSync(productFile, 'utf8'));

const coatImages = [
    './assets/coat-luxury.png',
    './assets/model-coat.webp',
    './assets/gen_coat_grey.png',
    './assets/gen_coat_navy.png',
    './assets/gen_coat_check.png',
    './assets/blazer-luxury.png'
];

console.log("--- Auditing for Overcoat leaking ---");
data.products.forEach(p => {
    if (p.category !== 'overcoats') {
        if (coatImages.includes(p.image)) {
            console.log(`MISMATCH: Product [${p.id}] in category [${p.category}] uses coat image: ${p.image}`);
        }
    }
});

console.log("--- Auditing for Name/Image Duplicates ---");
const seen = new Set();
data.products.forEach(p => {
    const key = `${p.category}-${p.name}-${p.image}`;
    if (seen.has(key)) {
        console.log(`DUPLICATE: ${key}`);
    }
    seen.add(key);
});
