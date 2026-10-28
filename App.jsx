import React, { useEffect, useState } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList, { Navbar } from './ProductList.jsx';
import CartItem from './CartItem.jsx';

const readPage = () => ['plants', 'cart'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home';

export default function App() {
  const [page, setPage] = useState(readPage);
  const [showProductList, setShowProductList] = useState(() => readPage() === 'plants');
  const handleGetStartedClick = () => {
    setShowProductList(true);
    setPage('plants');
    window.location.hash = 'plants';
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const changePage = () => {
      const nextPage = readPage();
      setPage(nextPage);
      setShowProductList(nextPage === 'plants');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', changePage);
    return () => window.removeEventListener('hashchange', changePage);
  }, []);
  return <div className="app-container">
    {page === 'cart' ? <CartItem onContinueShopping={handleGetStartedClick} /> :
      showProductList ? <ProductList /> : <>
        <Navbar />
        <main>
          <section className="landing-page background-image">
            <div className="landing-content">
              <p className="eyebrow">A LITTLE GREEN GOES A LONG WAY</p>
              <h1>Welcome To Paradise Nursery</h1>
              <p>Bring nature home.</p>
              <button className="button" onClick={handleGetStartedClick}>Get Started</button>
            </div>
          </section>
          <AboutUs />
        </main>
      </>}
    <footer>Paradise Nursery · Grow a greener home</footer>
  </div>;
}
