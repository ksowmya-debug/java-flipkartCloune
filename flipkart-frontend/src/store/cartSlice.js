import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';

// Thunks
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axiosClient.get('/cart');
  return response.data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async (product) => {
  const cartItem = {
    productId: product.id,
    title: product.title,
    image: product.image,
    price: product.price,
    originalPrice: product.originalPrice
  };
  const response = await axiosClient.post('/cart/add', cartItem);
  return response.data;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (id) => {
  await axiosClient.delete(`/cart/remove/${id}`);
  return id;
});

export const decreaseQuantity = createAsyncThunk('cart/decreaseQuantity', async (id) => {
  const response = await axiosClient.put(`/cart/decrease/${id}`);
  return { id, data: response.data };
});

const initialState = {
  items: [],
  status: 'idle'
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        if (!action.payload.data) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else {
          const index = state.items.findIndex(item => item.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload.data;
          }
        }
      });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
