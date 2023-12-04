import { createSlice } from "@reduxjs/toolkit";

const initialCartState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

const cartSlice = createSlice({
    name: "cart",
    // initialState: [],
    initialState: {
        items: initialCartState,
        subtotal: 0,
        total: 0,
        tax: 1.99 // This is just a fixed tax value for illustration purposes.
    },
    reducers: {
        add(state, action) {
            const existingProductIndex = state.items.findIndex(item => item.id === action.payload.id);

            if (existingProductIndex !== -1) {
                // Product exists in cart. Increment its quantity.
                state.items[existingProductIndex].quantity += 1;
            } else {
                // Product doesn't exist in cart. Add it.
                state.items.push({ ...action.payload, quantity: 1 });
            }

            state.subtotal += action.payload.price;
            state.total = state.subtotal + state.tax;
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        remove(state, action) {
            const productToRemove = state.items.find(item => item.id === action.payload);
            if (productToRemove) {
                state.subtotal -= productToRemove.price * productToRemove.quantity;
                state.total = state.subtotal + state.tax;
            }

            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        incrementQuantity(state, action) {
            const product = state.items.find(item => item.id === action.payload);
            if (product) {
                product.quantity += 1;
                state.subtotal += product.price;
                state.total = state.subtotal + state.tax;
            }
        },
        decrementQuantity(state, action) {
            const product = state.items.find(item => item.id === action.payload);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
                state.subtotal -= product.price;
                state.total = state.subtotal + state.tax;
            }
        },
        clear(state) {
            state.items = [];
            state.subtotal = 0;
            state.total = 0;
            localStorage.removeItem("cart");
        }

    }
})

export const { add, remove, incrementQuantity, decrementQuantity, clear } = cartSlice.actions;
export default cartSlice.reducer;
