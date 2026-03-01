import React, { useState } from 'react';
import { Outlet, useNavigate, NavLink, Link } from 'react-router';
import { Menu, LayoutDashboard, Notebook, CheckSquare, Settings, LogOut, X, House } from 'lucide-react';

function DashboardLayout() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const token = localStorage.getItem('token');
    const {displayName} = token ? JSON.parse(token) : {};

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuLinks = [
        { link: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { link: '/dashboard/notes', label: 'Notes', icon: <Notebook size={20} /> },
        { link: '/dashboard/tasks', label: 'Tasks', icon: <CheckSquare size={20} /> },
        { link: '/dashboard/settings', label: 'Settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="dashboardMobile lg:dashboardLarge bg-slate-50 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 flex items-center justify-between [grid-area:header] z-30">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={toggleMenu}
                        className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <Menu size={24} />
                    </button>

                    <h1 className="text-lg font-medium text-gray-500">
                        Welcome back, <span className="text-indigo-600 font-bold">{displayName || 'User'}</span>
                    </h1>
                </div>

                <div className="hidden sm:block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={toggleMenu}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen w-62.5 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out z-50 [grid-area:sidebar] lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Logo Section */}
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                            F
                        </div>
                        <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors flex">
                            Flow<span className="text-indigo-600 group-hover:text-indigo-700">State</span>
                        </span>
                    </div>
                    <button onClick={toggleMenu} className="lg:hidden text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4">
                    <ul className="space-y-1">
                        {menuLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link.link}
                                    end={link.link === '/dashboard'}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive
                                            ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                        }`
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.icon}
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom Section / Logout */}
                <div className="p-4 border-t border-gray-100">
                    <Link to="/" className='flex items-center gap-3 w-full px-4 py-3 text-slate-500 font-medium hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all duration-200 cursor-pointer'>
                        <House size={20} />
                        Go to Home
                    </Link>
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 font-medium hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 cursor-pointer"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="[grid-area:main] overflow-y-auto overflow-x-hidden relative">
                <div className="p-4 lg:p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default DashboardLayout;