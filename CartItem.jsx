import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, selectCartCount, selectCartTotal } from './CartSlice.jsx';

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  return <main className="cart-page"><h1>Your shopping cart</h1><p>{count} {count === 1 ? 'plant' : 'plants'} in your cart</p>
    {items.length === 0 ? <div className="empty-cart"><span aria-hidden="true">🪴</span><h2>Your cart is empty</h2><p>Find a little greenery to brighten your home.</p></div> : <div className="cart-items">
      {items.map(item => <article className="cart-item" key={item.id}>
        <img src={item.image} alt={item.name} width="100" height="100" />
        <div className="cart-details"><h2>{item.name}</h2><p>Unit price: ${item.price.toFixed(2)}</p>
          <div className="quantity-control"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button><span aria-label={`${item.name} quantity`} aria-live="polite">{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button></div>
        </div>
        <div className="item-total"><strong>Total: ${(item.price * item.quantity).toFixed(2)}</strong><button className="delete-button" aria-label={`Delete ${item.name}`} onClick={() => dispatch(removeItem(item.id))}>Delete</button></div>
      </article>)}
    </div>}
    <section className="cart-summary"><h2 aria-live="polite">Total cart amount: ${total.toFixed(2)}</h2><div className="cart-actions"><a className="button secondary" href="#plants">Continue Shopping</a><button disabled={!items.length} onClick={() => setCheckoutMessage('Coming Soon! Checkout will be available soon.')}>Checkout</button></div><p role="status">{checkoutMessage}</p></section>
  </main>;
}
