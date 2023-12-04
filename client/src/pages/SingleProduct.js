import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { add } from '../store/cartSlice'
import { selectProduct } from '../store/productSlice'


const SingleProduct = () => {
    const dispatch = useDispatch()
    const reduxProduct = useSelector((state) => state.product.selectedProduct)

    const handleAdd = (product) => {
        dispatch(add(product))
    }

    return (
        <div className="antialiased ">
            <div className="mt-20 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <div className="flex flex-col md:flex-row -mx-4 gap-10 md:gap-0">
                        <div className="md:flex-1 px-4 ">
                            <img src={reduxProduct.image} className='bg-black w-[400px] h-[400px] ' />
                        </div>
                        <div className="md:flex-1 px-4 justify-center">
                            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                                {reduxProduct.title}
                            </h2>
                            <p className="text-gray-500 text-sm">
                                By{" "}
                                <a href="#" className="text-indigo-600 hover:underline">
                                    {reduxProduct.category}
                                </a>
                            </p>
                            <div className="flex items-center space-x-4 my-4">
                                <div>
                                    <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                        <span className="text-indigo-400 mr-1 mt-1">&#8377;</span>
                                        <span className="font-bold text-indigo-600 text-3xl">{reduxProduct.price}</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-green-500 text-xl font-semibold">Save {`${Math.ceil(Math.random() * 15)}`}%</p>
                                    <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                                </div>
                            </div>
                            <p className="text-gray-500">
                                {reduxProduct.description.slice(0, 500)}
                            </p>
                            <div className="flex py-4 space-x-4">
                                <Link to='/cart' className="h-12 px-4 py-1  pt-2.5 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                    onClick={() => handleAdd(reduxProduct)}
                                >
                                    Add to Cart
                                </Link>
                                <Link to="/product" className="h-12 px-4 py-1 pt-2.5 font-semibold rounded-xl bg-green-600 hover:bg-green-500 text-white"
                                >
                                    Go Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SingleProduct