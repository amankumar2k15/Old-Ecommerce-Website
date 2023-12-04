import React from 'react'
import PrivateRoutes from '../Routes/Routes'
import Navbar from '../components/Navbar'

const HomeWrapper = () => {
    return (
        <>
            <Navbar />
            <PrivateRoutes />
        </>
    )
}

export default HomeWrapper