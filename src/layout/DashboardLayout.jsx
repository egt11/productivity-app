import React from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router'
import { useState } from 'react';
import { Menu } from 'lucide-react';

function DashboardLayout() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const token = JSON.parse(localStorage.getItem('token')) || null;
    const email = token ? token.email : '';

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }


    return (
        <div className='dashboardMobile lg:dashboardLarge'>
            {/* header */}
            <div className='bg-slate-100 border-b border-gray-200 p-4 flex items-center gap-4 [grid-area:header] shadow'>
                <button type='button' onClick={toggleMenu} className='lg:hidden'>
                    <Menu />
                </button>
                <h1>Hi, {email}!</h1>
            </div>

            {/* overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={toggleMenu}></div>
            )}

            {/* side bar mobile */}
            <aside
                className={`fixed top-0 left-0 h-screen w-62.5 bg-slate-100 border-r border-gray-200 p-4 transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
                    Logout
                </button>
            </aside>


            {/* side bar large screen above */}
            <aside className='[grid-area:sidebar] bg-slate-100 border-r border-gray-200 p-4 w-62.5 h-screen hidden lg:block'>
                <button type="button" onClick={logout} className='bg-red-500 text-white px-4 py-2 rounded'>
                    Logout
                </button>
            </aside>

            {/* main */}
            <main className='bg-[#f5f5f5] [grid-area:main] p-4'>
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout