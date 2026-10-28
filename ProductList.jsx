import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';

// Self-contained plant illustration thumbnails work without an external image service.
function plantImage(name, index, flowering) {
  const green = ['#34754b', '#43845c', '#2c6543', '#648f43', '#397857', '#6f9950'][index % 6];
  const leaves = Array.from({ length: 6 }, (_, i) => `<ellipse cx="${100 + (i % 2 ? 1 : -1) * (20 + index % 4)}" cy="${55 + i * 11}" rx="${12 + index % 5}" ry="26" transform="rotate(${i % 2 ? 42 : -42} ${100 + (i % 2 ? 1 : -1) * (20 + index % 4)} ${55 + i * 11})" fill="${green}"/>`).join('');
  const bloom = flowering ? `<g fill="${['#d57786', '#a084bf', '#e7b85a', '#e5e5db', '#ed9a69', '#ce6a8f'][index % 6]}"><circle cx="100" cy="38" r="15"/><circle cx="85" cy="48" r="13"/><circle cx="115" cy="48" r="13"/><circle cx="100" cy="59" r="13"/></g><circle cx="100" cy="49" r="7" fill="#f4d379"/>` : '';
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 190"><rect width="200" height="190" fill="#edf3e9"/><path d="M100 135V40" stroke="#345d3e" stroke-width="4"/>${leaves}${bloom}<path d="M68 128h64l-9 48H77z" fill="#b77b58"/><rect x="64" y="124" width="72" height="12" rx="3" fill="#ca916d"/><ellipse cx="100" cy="179" rx="40" ry="3" fill="#dce5d8"/></svg>`);
}

const groups = [
  { category: 'Leafy Houseplants', plants: [
    ['Monstera', 25, 'Bold split leaves for a bright corner.'],
    ['Snake Plant', 18, 'Upright leaves and a striking silhouette.'],
    ['Golden Pothos', 15, 'Trailing vines with golden-green leaves.'],
    ['Spider Plant', 12, 'Arching striped leaves for shelves.'],
    ['Rubber Plant', 28, 'Glossy dark-green statement foliage.'],
    ['ZZ Plant', 22, 'Compact stems with shiny oval leaves.']
  ] },
  { category: 'Flowering Houseplants', plants: [
    ['Anthurium', 24, 'Colourful blooms and glossy foliage.'],
    ['African Violet', 14, 'Small purple flowers for a windowsill.'],
    ['Kalanchoe', 16, 'Clusters of cheerful little flowers.'],
    ['Peace Lily', 20, 'Elegant white blooms and deep-green leaves.'],
    ['Begonia', 18, 'Decorative foliage and delicate flowers.'],
    ['Christmas Cactus', 19, 'Trailing stems with seasonal colour.']
  ] },
  { category: 'Succulents', plants: [
    ['Aloe Vera', 14, 'Thick pointed leaves in a neat rosette.'],
    ['Jade Plant', 16, 'Rounded leaves on sturdy branching stems.'],
    ['Echeveria', 10, 'A compact, rose-shaped succulent.'],
    ['Zebra Haworthia', 12, 'Small pointed leaves with white stripes.'],
    ['Burro’s Tail', 17, 'Trailing stems of plump green leaves.'],
    ['String of Pearls', 18, 'Distinctive bead-like trailing foliage.']
  ] }
];
export const products = groups.map((group, groupIndex) => ({ ...group, plants: group.plants.map(([name, price, description], index) => ({ id: `${groupIndex}-${index}`, name, price, description, image: plantImage(name, groupIndex * 6 + index, groupIndex === 1) })) }));

export default function ProductList() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  return <main className="shop"><h1>Find your next green companion</h1><p className="intro">18 houseplants. Three collections. A little something for every home.</p>
    {products.map(group => <section className="category" key={group.category}>
      <h2>{group.category}</h2><div className="product-grid">
        {group.plants.map(plant => {
          const added = items.some(item => item.id === plant.id);
          return <article className="product-card" key={plant.id}>
            <img src={plant.image} alt={`${plant.name} illustration`} loading="lazy" width="200" height="190" />
            <div className="product-info"><h3>{plant.name}</h3><p>{plant.description}</p><strong>${plant.price.toFixed(2)}</strong>
              <button onClick={() => dispatch(addItem(plant))} disabled={added}>{added ? 'Added to Cart' : 'Add to Cart'}</button>
            </div>
          </article>;
        })}
      </div>
    </section>)}
  </main>;
}
