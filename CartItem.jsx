import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, selectCartCount, selectCartTotal } from './CartSlice.jsx';
import { Navbar } from './ProductList.jsx';

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const handleIncrement = item => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };
  const handleDecrement = item => {
    if (item.quantity === 1) dispatch(removeItem(item.name));
    else dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  };
  const handleRemove = item => {
    dispatch(removeItem(item.name));
  };
  const handleContinueShopping = () => {
    if (onContinueShopping) onContinueShopping();
    else window.location.hash = 'plants';
    window.scrollTo(0, 0);
  };
  return <><Navbar /><main className="cart-page">
    <h1>Your shopping cart</h1><p>{count} {count === 1 ? 'plant' : 'plants'} in your cart</p>
    <div className="cart-container">
      {items.length === 0 ? <div className="empty-cart"><span aria-hidden="true">🪴</span><h2>Your cart is empty</h2><p>Find a little greenery to brighten your home.</p></div> :
        items.map(item => <article className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} width="100" height="100" />
          <div className="cart-details"><h2>{item.name}</h2><p>Unit price: ${item.cost.toFixed(2)}</p>
            <div className="quantity-control">
              <button aria-label={`Decrease ${item.name} quantity`} onClick={() => handleDecrement(item)}>−</button>
              <span aria-label={`${item.name} quantity`} aria-live="polite">{item.quantity}</span>
              <button aria-label={`Increase ${item.name} quantity`} onClick={() => handleIncrement(item)}>+</button>
            </div>
          </div>
          <div className="item-total"><strong>Total: ${(item.cost * item.quantity).toFixed(2)}</strong><button className="cart-item-delete" aria-label={`Delete ${item.name}`} onClick={() => handleRemove(item)}>Delete</button></div>
        </article>)}
    </div>
    <section className="cart-summary">
      <h2 aria-live="polite">Total cart amount: ${total.toFixed(2)}</h2>
      <div className="cart-actions"><button className="button secondary" onClick={handleContinueShopping}>Continue Shopping</button><button disabled={!items.length} onClick={() => setCheckoutMessage('Coming Soon! Checkout will be available soon.')}>Checkout</button></div>
      <p role="status">{checkoutMessage}</p>
    </section>
  </main></>;
}
