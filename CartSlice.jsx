import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, { payload: plant }) {
      const item = state.items.find(item => item.id === plant.id);
      if (item) item.quantity += 1;
      else state.items.push({ ...plant, quantity: 1 });
    },
    removeItem(state, { payload: id }) {
      state.items = state.items.filter(item => item.id !== id);
    },
    updateQuantity(state, { payload: { id, quantity } }) {
      const item = state.items.find(item => item.id === id);
      if (!item || !Number.isInteger(quantity)) return;
      if (quantity <= 0) state.items = state.items.filter(item => item.id !== id);
      else item.quantity = quantity;
    }
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const selectCartCount = state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = state => state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export default cartSlice.reducer;
