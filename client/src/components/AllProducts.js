// import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { STATUSES, fetchProducts, selectProduct } from '../store/productSlice'
import Loader from '../common/Loader'
import Error from '../Routes/Error'
import { Link } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa'
import { add } from '../store/cartSlice'

const AllProducts = ({ searchTerm }) => {
    // const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const { data: products, status } = useSelector((state) => state.product);

    useEffect(() => {
        if (STATUSES.IDLE) {
            dispatch(fetchProducts())
        }
    }, [dispatch]);

    if (status === STATUSES.LOADING) {
        return <Loader />
    }
    if (status === STATUSES.ERROR) {
        return <Error />
    }

    const handleAdd = (product) => {
        dispatch(add(product))
    }


    return (
        <>
            {
                products &&
                products?.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((product, index) => {
                        return (
                            <div key={index} className="w-[250px] card_hover flex flex-col items-center max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-white-700" >
                                <Link to={`/singleproduct/${product._id}`} onClick={() => dispatch(selectProduct(product))}>

                                    <div className='w-[250px] h-[230px]'>
                                        <img className="p-8 block m-auto rounded-t-lg w-[250px] h-[230px] object-contain"
                                            src={product.image}
                                            alt="productImage"
                                        />
                                    </div>

                                    <div className="px-5 pb-5 ">
                                        <h5 className="text-md font-semibold h-10 tracking-tight text-center text-gray-900 dark:text-black">
                                            {product.title?.slice(0, 45)}
                                        </h5>
                                    </div>

                                </Link>
                                <div className="flex flex-row w-full justify-between px-4 m-4">
                                    <span className="text-md font-bold text-gray-900 dark:text-black">&#8377;{`${product.price}`}</span>
                                    <FaCartPlus size={25} className='text-[#00838d] cursor-pointer transition-all hover:scale-75 ease-in-out' onClick={() => handleAdd(product)} />
                                </div>

                            </div>
                        )
                    })
            }
        </>
    )
}

export default AllProducts