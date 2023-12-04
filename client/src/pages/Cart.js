import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"
import { clear, decrementQuantity, incrementQuantity, remove } from '../store/cartSlice'
import { Link } from 'react-router-dom'

const Cart = () => {
    const dispatch = useDispatch()
    const { items: storeProducts, subtotal, total, tax } = useSelector((state) => state.cart)

    console.log(storeProducts)

    const handleRemove = (productId) => {
        dispatch(remove(productId))
    }

    const handleIncrement = (productId) => {
        dispatch(incrementQuantity(productId));
    };

    const handleDecrement = (productId) => {
        dispatch(decrementQuantity(productId));
    };

    return (
        <div className="bg-gray-100  py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">

                            {storeProducts && storeProducts.length < 1 ? (
                                <p className="text-center font-semibold">No items in cart</p>

                            ) : (

                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-semibold">Product</th>
                                            <th className="text-left font-semibold hidden sm:table-cell">Price</th>
                                            <th className="text-left font-semibold hidden sm:table-cell">Quantity</th>
                                            <th className="text-left font-semibold">Total</th>
                                            <th className="text-left font-semibold">Action</th>
                                        </tr>
                                    </thead>

                                    {/* Store Products Start */}
                                    {storeProducts?.map((product, index) => {
                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td className="py-4">
                                                        <div className="flex items-center">
                                                            <img className="h-16 w-16 mr-4" src={product.image} alt="Product image"
                                                            />
                                                            <span className="font-semibold">{product.title.split(" ").slice(0, 3).join(" ")}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 hidden sm:table-cell">&#8377;{`${product.price}`}</td>
                                                    <td className="py-4 hidden sm:table-cell">
                                                        <div className="flex items-center gap-1">
                                                            <AiFillMinusCircle size={20} onClick={() => handleDecrement(product.id)} />
                                                            <span className="text-center w-4">{product.quantity}</span>
                                                            <AiFillPlusCircle size={20} onClick={() => handleIncrement(product.id)} />
                                                        </div>
                                                    </td>
                                                    <td className="py-4 ">&#8377;{+(product.price * product.quantity).toFixed(2)}</td>
                                                    <td>
                                                        <button onClick={() => { handleRemove(product.id) }} className="bg-red-500 text-white p-2 text-sm rounded-lg w-full" >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}

                                    {/* Store Products End */}

                                </table>
                            )}
                        </div>
                        <Link to="/product" className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-lg mt-4 w-fit">
                            Continue Shopping
                        </Link>
                    </div>
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>&#8377;{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Taxes</span>
                                <span>{tax}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">&#8377;{total.toFixed(2)}</span>
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mt-4 w-full"
                            >
                                Checkout
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg mt-4 w-full"
                                onClick={() => dispatch(clear())}>
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart


