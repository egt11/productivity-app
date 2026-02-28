import React from 'react'
import { Navigate } from 'react-router'
import { Outlet } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'

function ProtectedRoute() {
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    useEffect(() => {
        const checkUser = async () => {
            const storedToken = JSON.parse(localStorage.getItem('token'))
            const token = storedToken?.token

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/auth/validate-user`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                setIsLoggedIn(response.data.isLoggedIn)
            } catch (error) {
                setIsLoggedIn(false)
            }
        }

        checkUser()
    }, [])

    if (isLoggedIn === null) {
        return <div>Loading...</div>
    }

    return isLoggedIn
        ? <Outlet />
        : <Navigate to="/login" replace />
}

export default ProtectedRoute