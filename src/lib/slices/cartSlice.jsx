import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        isCartVisible: false,
    },
    reducers: {
        toggleView(state) {
            state.isCartVisible = !state.isCartVisible;
        },
        activateCart(state) {
            state.isCartVisible = true;
        },
        deactivateCart(state) {
            state.isCartVisible = false;
        },
        addItem(state, action) {
            const newProduct = action.payload;
            const exist = state.items.find((item) => item.id === newProduct.id);

            if (!exist) {
                state.items.push({
                    id: newProduct.id,
                    title: newProduct.title,
                    thumbnail: newProduct.thumbnail,
                    price: newProduct.price,
                    quantity: 1,
                });
            } else {
                exist.quantity++;
            }
        },
        removeItem(state, action) {
            const itemId = action.payload;
            const exist = state.items.find((item) => item.id === itemId);

            if (exist) {
                if (exist.quantity > 1) {
                    exist.quantity--;
                } else {
                    state.items = state.items.filter((item) => item.id !== itemId);
                }
            }
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
