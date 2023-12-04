import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from "../pages/Cart"
import Product from "../pages/Product"
import SingleProduct from "../pages/SingleProduct"
import Error from './Error'


// import Loader from './loader/Loader'           // Logic for Loader
// import loadable from "@loadable/component"

// const Home = loadable(() => import("./pages/Home"), {
//   fallback: <Loader />
// });

// const Cart = loadable(() => import("./pages/Cart"), {
//   fallback: <Loader />
// })

// const AllProducts = loadable(() => import("./pages/AllProducts"), {
//   fallback: <Loader />,
// });
// const SingleProduct = loadable(() => import("./pages/SingleProduct"), {
//   fallback: <Loader />,
// });
// const Error = loadable(() => import("./loader/Error"), {
//   fallback: <Loader />,
// });

const PrivateRoutes = () => {
    return (
        <>
            <Routes >
                <Route path="/home" element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/singleproduct/:id" element={<SingleProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    )
}

export default PrivateRoutes