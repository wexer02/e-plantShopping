import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import { selectCartCount } from './CartSlice.jsx';

const readPage = () => ['plants', 'cart'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home';

export default function App() {
  const [page, setPage] = useState(readPage);
  const count = useSelector(selectCartCount);
  useEffect(() => {
    const changePage = () => { setPage(readPage()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', changePage);
    return () => window.removeEventListener('hashchange', changePage);
  }, []);
  return <>
    <header className="navbar">
      <a className="brand" href="#home"><span aria-hidden="true">🌿</span> Paradise Nursery</a>
      <nav aria-label="Main navigation">
        <a href="#home" aria-current={page === 'home' ? 'page' : undefined}>Home</a>
        <a href="#plants" aria-current={page === 'plants' ? 'page' : undefined}>Plants</a>
        <a href="#cart" className="cart-link" aria-current={page === 'cart' ? 'page' : undefined} aria-label={`Cart, ${count} items`}><span aria-hidden="true">🛒</span> Cart <span className="badge" aria-live="polite">{count}</span></a>
      </nav>
    </header>
    {page === 'home' ? <main>
      <section className="landing-page">
        <div className="landing-content"><p className="eyebrow">A LITTLE GREEN GOES A LONG WAY</p><h1>Paradise Nursery</h1><p>Bring nature home.</p><a className="button" href="#plants">Get Started</a></div>
      </section>
      <AboutUs />
    </main> : page === 'plants' ? <ProductList /> : <CartItem />}
    <footer>Paradise Nursery · Grow a greener home</footer>
  </>;
}
