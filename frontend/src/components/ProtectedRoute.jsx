import React from 'react'
import { Navigate } from 'react-router'
import { Outlet } from 'react-router'

function ProtectedRoute({ children }) {
    const isLoggedIn = !!localStorage.getItem('token')
    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default ProtectedRoute