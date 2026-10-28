import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice.jsx';
import App from './App.jsx';
import './App.css';

const store = configureStore({ reducer: { cart: cartReducer } });
createRoot(document.getElementById('root')).render(<Provider store={store}><App /></Provider>);
