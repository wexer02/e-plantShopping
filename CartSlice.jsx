import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, { payload: plant }) {
      const item = state.items.find(item => item.name === plant.name);
      if (item) item.quantity += 1;
      else state.items.push({ ...plant, cost: Number(plant.cost ?? plant.price), quantity: 1 });
    },
    removeItem(state, { payload: name }) {
      state.items = state.items.filter(item => item.name !== name && item.id !== name);
    },
    updateQuantity(state, { payload: { name, id, quantity } }) {
      const item = state.items.find(item => name !== undefined ? item.name === name : item.id === id);
      if (!item || !Number.isInteger(quantity)) return;
      if (quantity <= 0) state.items = state.items.filter(entry => entry.name !== item.name);
      else item.quantity = quantity;
    }
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const selectCartCount = state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = state => state.cart.items.reduce((sum, item) => sum + item.cost * item.quantity, 0);
export default cartSlice.reducer;
