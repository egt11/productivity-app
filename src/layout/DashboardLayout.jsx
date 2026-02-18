import React from 'react'
import { Outlet, useNavigate } from 'react-router'

function DashboardLayout() {
    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : null
    const { email } = token;

    const logout = () => {
        localStorage.removeItem('token');

        navigate('/login');
    }


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <h1>Welcome, {email}</h1>
            <Outlet />
            <button type="button" onClick={logout} className="bg-red-500 text-white p-2 rounded">
                Logout
            </button>
        </div>
    )
}

export default DashboardLayout