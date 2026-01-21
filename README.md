# Murgdur - Luxury Fashion House

A premium e-commerce React application for Murgdur luxury fashion brand, inspired by Louis Vuitton's design aesthetic.

## 🎨 Design Features

- **Louis Vuitton Color Scheme**: Brown (#6b4423), tan, cream, and gold accents
- **Premium Typography**: Playfair Display (serif) and Montserrat (sans-serif)
- **Responsive Design**: Mobile-first approach with breakpoints at 640px, 768px, 1024px
- **Smooth Animations**: Ken Burns effects, hover states, and transitions
- **Luxury Aesthetic**: Minimal, clean, and sophisticated

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser to:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
murgdur/
├── public/
│   ├── assets/           # Product images
│   ├── logo.svg
│   ├── favicon.svg
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js     # Navigation header
│   │   └── Footer.js     # Site footer
│   ├── pages/
│   │   ├── Home.js       # Homepage with hero, collections, products
│   │   ├── Collections.js # Product listing with filters
│   │   ├── Product.js    # Product detail page
│   │   ├── Cart.js       # Shopping cart
│   │   ├── Heritage.js   # Brand story
│   │   └── Contact.js    # Contact form
│   ├── data/
│   │   └── products.json # Product catalog (21 products)
│   ├── App.js            # Main app component
│   ├── App.css           # Global styles
│   └── index.js          # Entry point
└── package.json
```

## 🛍️ Features

### Homepage
- Full-screen hero with Ken Burns animation
- Signature collections grid
- Editorial banner
- Featured products showcase
- Leather goods section
- Ready-to-wear editorial
- Accessories carousel
- Heritage story
- Services grid
- Newsletter signup

### Collections Page
- 21 luxury products across 11 categories
- Category filtering with pills
- Real-time search
- Sort by: Featured, Price (Low/High), Name
- Responsive product grid

### Product Detail Page
- Large product imagery
- Full specifications
- Add to cart functionality
- Quantity selector
- "You May Also Like" recommendations

### Shopping Cart
- View all cart items
- Update quantities
- Remove items
- Order summary with total
- Complimentary shipping
- Checkout integration ready

### Additional Pages
- **Heritage**: Founder story, values, timeline, craftsmanship
- **Contact**: Contact form with business information

## 🎨 Color Palette

```css
--lv-brown: #6b4423      /* Primary brand color */
--lv-tan: #c19a6b        /* Accent color */
--lv-gold: #d4af37       /* Luxury accent */
--lv-cream: #f5f1e8      /* Background tint */
--lv-white: #ffffff      /* Base background */
--lv-black: #1a1a1a      /* Text and contrast */
--lv-gray: #757575       /* Secondary text */
--lv-light-gray: #f8f8f8 /* Light backgrounds */
```

## 📦 Product Categories

1. Handbags
2. Belts
3. Perfume
4. Watches
5. Wallets
6. T-Shirts
7. Trousers
8. Overcoats
9. Oversized
10. Caps
11. Sweat Shirts

## 🛠️ Technologies Used

- **React** 18.2.0
- **React Router** 6.20.0
- **LocalStorage** for cart management
- **Google Fonts** (Playfair Display, Montserrat)
- **CSS3** with custom properties
- **ES6+** JavaScript

## 💳 Payment Integration

The checkout button is ready for Stripe integration. To enable payments:

1. Add Stripe to dependencies:
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

2. Configure Stripe in your environment variables
3. Implement checkout session creation

## 🎯 Brand Story

Founded in 2019 by the late Sri Sundershan Duraisamy, Murgdur represents the pinnacle of luxury craftsmanship. Every piece honors his vision of timeless elegance and uncompromising quality.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 📄 License

© 2026 Murgdur. All rights reserved.

## 🙏 Acknowledgments

Design inspired by Louis Vuitton's premium aesthetic and user experience.

---

**Murgdur** - Luxury Fashion House · Est. 2019
