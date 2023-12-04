import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading"
})


// const data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
const selectedProduct = localStorage.getItem("selectedProduct") ? JSON.parse(localStorage.getItem("selectedProduct")) : null

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        // data: data,
        status: STATUSES.IDLE,
        // selectedProduct: null, 
        selectedProduct: selectedProduct,
    },
    // ------------------------------------------------------------------------------------------->
    // reducers: {
    //     // setProducts(state, action) {
    //     //     state.data = action.payload
    //     // },
    //     // setStatus(state, action) {
    //     //     state.status = action.payload
    //     // },
    // },
    // ------------------------------------------------------------------------------------------->
    reducers: {
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload;
            // localStorage.setItem("data", JSON.stringify(state.data));
            localStorage.setItem("selectedProduct", JSON.stringify(action.payload));
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = STATUSES.LOADING
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = STATUSES.IDLE
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR
            });
    },
});

// ------------------------------------------------------------------------------------------->
// export const { setProducts, setStatus } = productSlice.actions;           // when extraReducers is used then this line is not used
// ------------------------------------------------------------------------------------------->

export const { selectProduct } = productSlice.actions;
export default productSlice.reducer;


//Thunks (MIDDLEWARE)
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await axios.get("https://fakestoreapiserver.reactbd.com/products");
    const data = await res.data
    return data
})

// OR

// ------------------------------------------------------------------------------------------->
// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING))
//         try {
//             const res = await axios.get("https://fakestoreapi.com/products");
//             const data = await res.data
//             dispatch(setProducts(data))
//             dispatch(setStatus(STATUSES.IDLE))
//         } catch (err) {
//             console.log(err)
//             dispatch(setStatus(STATUSES.ERROR))
//         };
//     };
// };
// ------------------------------------------------------------------------------------------->

