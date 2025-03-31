import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice"; 
import cartSlice from "./slices/cartSlice";
const store = configureStore({
  reducer: {
      cart : cartSlice.reducer,
  },
});

export { store };
