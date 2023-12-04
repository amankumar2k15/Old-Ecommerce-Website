import React, { useState } from 'react'
import Allproducts from '../components/AllProducts'


const Product = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className='bg-[#edf0f5]'>
            <div className='px-4 pt-4 flex flex-col sm:flex-row justify-between py-1 gap-5 '>
                <div>
                    <h1 className='font-bold text-lg '>Welcome to the Shop-hub Store</h1>
                    <h2 className='font-semibold'>Products</h2>
                </div>

                <div>
                    <div className="flex items-center space-x-4 ">
                        <div className="relative md:block ">
                            <input
                                type="search"
                                className="pl-10 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex flex-row flex-wrap gap-4 flex-shrink-0 justify-center pt-8 pb-12'>
                <Allproducts searchTerm={searchTerm} />
            </div>
        </div>
    )
}

export default Product