import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SignUpImg from "../../assets/SignUp.jpg"
import { HiOutlineUser } from "react-icons/hi"
import { FiMail } from "react-icons/fi"
import { RiLockPasswordFill } from "react-icons/ri"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { SERVER_URL } from '../../constants'
import axios from 'axios'
import Toast from "../../common/Toast"



const Register = () => {
    const [hide, setHide] = useState(true)
    const [initialData, setInitialData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()


    const handleInput = (event) => {
        const { value, id } = event.target;
        setInitialData((preVal) => ({ ...preVal, [id]: value }))
    }

    const validation = () => {
        // let validationEmail = /[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/
        // let validationPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@]).{8,}/

        if (initialData.firstname.length === 0) return { isError: false, message: "First-name is missing" }
        else if (initialData.lastname.length === 0) return { isError: false, message: "Last-name is missing" }
        else if (initialData.email.length === 0) return { isError: false, message: "Email is missing" }
        // else if (initialData.email.match(validationEmail)) return { isError: false, message: "Email doesn't match" }
        else if (initialData.password.length === 0) return { isError: false, message: "Password is missing" }
        // else if (initialData.password.match(validationPassword)) return { isError: false, message: "Password doesn't match" }
        else {
            return {
                isError: true
            }
        }
    }


    const handleRegister = async () => {
        if (validation().isError) {

            try {
                let res = await axios.post(`${SERVER_URL}/user/create-user`, initialData)
                console.log(res)
                Toast(false, "Sign up successfully")
                navigate("/login")

            } catch (error) {
                console.log(error)
            }
        } else {
            Toast(true, validation().message)
        }
    }


    return (
        <>
            <section className="registerForm">
                <div className=' bg-gray-600 '>
                    <div className=" border border-t-2 border-x-0 border-b-0 border-white dark:bg-gray-800 flex items-center justify-center px-5 py-5">
                        <div
                            className="max-w-[1000px] bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
                        >
                            <div className="md:flex w-full">
                                <div className='hidden md:block object-left sm:w-[500px] sm:h-[500px]'>
                                    <img className='' src={SignUpImg} alt='register' />
                                </div>

                                <div className="w-full md:w-1/2 py-5 px-5 md:px-10">
                                    <div className="text-center mb-10">
                                        <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                                        <p>Enter your information to register</p>
                                    </div>
                                    <div>
                                        <div className="flex -mx-3">
                                            <div className="w-1/2 px-3 mb-5">
                                                <label htmlFor="" className="text-xs font-semibold px-1"> First name</label>
                                                <div className="flex">
                                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                        <HiOutlineUser />
                                                    </div>
                                                    <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="John"
                                                        id='firstname'
                                                        value={initialData.firstname}
                                                        onInput={handleInput} />
                                                </div>
                                            </div>
                                            <div className="w-1/2 px-3 mb-5">
                                                <label htmlFor="" className="text-xs font-semibold px-1">Last name</label>
                                                <div className="flex">
                                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                        <HiOutlineUser />
                                                    </div>
                                                    <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="Smith"
                                                        id='lastname'
                                                        value={initialData.lastname}
                                                        onInput={handleInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex -mx-3">
                                            <div className="w-full px-3 mb-5">
                                                <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                                                <div className="flex">
                                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                        <FiMail />
                                                    </div>
                                                    <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="johnsmith@example.com"
                                                        id='email'
                                                        value={initialData.email}
                                                        onInput={handleInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex -mx-3">
                                            <div className="w-full px-3 mb-12">
                                                <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                                                <div className="flex">
                                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                        <RiLockPasswordFill />
                                                    </div>
                                                    <input type={`${hide ? "password" : "text"}`} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-s-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="************"
                                                        id='password'
                                                        value={initialData.password}
                                                        onInput={handleInput} />

                                                    <div onClick={() => setHide(!hide)} className='w-10 h-11 flex justify-center items-center bg-gray-400 rounded-e-lg'>
                                                        {hide ?
                                                            <AiFillEyeInvisible className='text-black ' size={20} />
                                                            :
                                                            <AiFillEye className='text-black ' size={20} />
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex -mx-3">
                                            <div className="w-full px-3 mb-5">
                                                <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                                                    onClick={handleRegister}>
                                                    REGISTER NOW
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-black text-center">Already have an account? <br />
                                            <NavLink to="/login" className='text-blue-500 cursor-pointer hover:text-blue-700' >Login now</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register