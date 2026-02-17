import React from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {
    const navigate = useNavigate();
    
    const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : null
    const { email } = token;

    const logout = () => {
        localStorage.removeItem('token');
        
        navigate('/login');
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome , {email} </p>
            <button type="button" onClick={logout} className="bg-red-500 text-white p-2 rounded">Logout</button>
        </div>
    )
}