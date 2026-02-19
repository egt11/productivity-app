import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

function PublicLayout() {
    return (
        <div className="min-h-dvh flex flex-col bg-slate-50 overflow-hidden">
            <Navbar />
            <main className="flex-1 relative flex flex-col items-center justify-center">
                <Outlet />
            </main>
        </div>
    )
}

export default PublicLayout