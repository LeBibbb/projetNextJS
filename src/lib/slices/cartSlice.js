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
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
