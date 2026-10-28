# e-plantShopping

## Paradise Nursery Shopping Application

A simple React and Redux shopping cart application for Paradise Nursery, an online plant shop.

## Features

- Landing page with a plant background image, company details, and Get Started button.
- 18 unique houseplants in three categories: Leafy Houseplants, Flowering Houseplants, and Succulents (six per category).
- Each plant has an illustration thumbnail, name, description, price, and Add to Cart button.
- Added products have disabled buttons; removing a product enables its button again.
- Shared navigation links to Home, Plants, and Cart with a dynamic total-quantity badge.
- Redux Toolkit cart slice supports adding, deleting, and updating quantities.
- Cart displays unit prices, quantities, line totals, and the total cart amount.
- Increasing and decreasing quantities updates all totals; decreasing to zero removes the item.
- Checkout displays Coming Soon. Continue Shopping returns to the listing.
- Responsive layout for mobile and desktop.

## Run locally

Install a current Node.js LTS release, then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To build, run `npm run build`; to preview that build, run `npm run preview`.

## Assignment files

All required files are in the repository root: README.md, AboutUs.jsx, App.css, App.jsx, CartSlice.jsx, ProductList.jsx, and CartItem.jsx. main.jsx connects the Redux store and React application.

## Images and limitations

Product thumbnails are self-contained SVG plant illustrations. The landing-page background is served by Unsplash. This is a course demonstration: checkout is a placeholder, and the cart resets when the page reloads.
