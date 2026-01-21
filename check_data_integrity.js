const fs = require('fs');
const path = require('path');

const productFile = path.join(__dirname, 'src/data/products.json');
const data = JSON.parse(fs.readFileSync(productFile, 'utf8'));

console.log("--- Checking for Mis-categorized Coats ---");
data.products.forEach(p => {
    const nameLower = p.name.toLowerCase();
    if (nameLower.includes('overcoat') || nameLower.includes('coat ')) {
        if (p.category !== 'overcoats') {
            console.log(`MISMATCH: Product [${p.name}] (ID: ${p.id}) is in category [${p.category}] but looks like a coat.`);
        }
    }

    if (p.category === 'perfume') {
        if (nameLower.includes('coat') || p.image.includes('coat')) {
            console.log(`PERFUME POLLUTION: Product [${p.name}] is a perfume but looks like a coat. Image: ${p.image}`);
        }
    }
});
console.log("--- Done ---");
