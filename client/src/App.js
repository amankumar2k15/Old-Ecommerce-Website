import React, { useEffect } from 'react'
import LoginWrapper from './layouts/LoginWrapper'
import HomeWrapper from './layouts/HomeWrapper'
import { useLocation, useNavigate } from 'react-router-dom'
// Toaster css 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const App = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === "" || location.pathname === "/") {
      navigate("/login")
    }
    // else if(!localStorage.getItem("isValid")){
    //   navigate("/login")
    // }
  }, [])

  return (
    <>
      <ToastContainer position='top-right' newestOnTop={true} autoClose={1500} />
      {
        location.pathname === "" || location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/forgetPassword"
          ?
          <LoginWrapper />
          :
          <HomeWrapper />
      }
    </>
  )
}

export default App