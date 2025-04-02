import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import themeReducer from './slices/themeSlice';
const store = configureStore({
  reducer: {
      cart : cartSlice.reducer,
      theme: themeReducer,
  },
});

export { store };
