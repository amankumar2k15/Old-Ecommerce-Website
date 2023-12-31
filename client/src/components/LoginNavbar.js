import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginNavbar = () => {
    const [hide, setHide] = useState(true)

    return (
        <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 ">
            <div className="max-w-screen-xl flex flex-wrap  items-center justify-between mx-auto p-4">
                <div href="#" className="flex items-center gap-2">
                    <Link to="/home" className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SHOP<span className='text-[red] text-lg'>HUB</span></Link>
                </div>

                <div className='hidden lg:block textShopHubParent'>
                    <div className='textShopHubChild text-white text-xl tracking-widest'>Welcome to SHOP<span className='text-[red]'>HUB</span></div>
                </div>

                <button onClick={() => setHide(!hide)} data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                <div className={`${hide ? "hidden" : "visible"} w-full md:block md:w-auto`} id="navbar-solid-bg">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700 gap-2 md:gap-0">
                        <li onClick={() => setHide(!hide)}>
                            <Link to="/login" className="block rounded text-white bg-blue-600 hover:bg-blue-700 px-2 py-1" aria-current="page">Login</Link>
                        </li>
                        <li onClick={() => setHide(!hide)}>
                            <Link to="/register" className="block rounded  text-white bg-red-600 hover:bg-red-700 px-2 py-1">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default LoginNavbar