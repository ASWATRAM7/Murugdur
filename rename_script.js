const fs = require('fs');
const path = require('path');

const files = [
    'src/pages/Home.js',
    'src/pages/Heritage.js',
    'src/pages/Contact.js',
    'src/pages/Login.js',
    'src/pages/Signup.js',
    'src/pages/Product.js',
    'src/components/Footer.js',
    'src/data/products.json',
    'README.md',
    'package.json',
    'package-lock.json'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        let original = content;

        // Replace Title Case
        content = content.replace(/Murugdur/g, 'Murgdur');

        // Replace UPPERCASE
        content = content.replace(/MURUGDUR/g, 'MURGDUR');

        // Replace lowercase (if any, typically in urls or package names)
        content = content.replace(/murugdur/g, 'murgdur');

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
        } else {
            console.log(`No changes needed in ${file}`);
        }
    } else {
        console.log(`File not found: ${file}`);
    }
});
