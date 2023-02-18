import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PortectedRoutes = () => {

    const { trainerName } = useSelector(state => state)

    if (trainerName) {
        return <Outlet />
    } else {
        return <Navigate to='/' />
    }

}

export default PortectedRoutes