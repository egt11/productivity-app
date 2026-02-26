import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { LayoutDashboard, Notebook, CheckSquare, Clock, ArrowRight } from 'lucide-react'

function Dashboard() {
    const [stats, setStats] = useState({
        notes: 0,
        tasks: 0,
        pendingTasks: 0
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchUserItems = async () => {
        const storedToken = JSON.parse(localStorage.getItem('token'))
        const token = storedToken?.token

        if (!token) {
            setError("No authentication token found.")
            setLoading(false)
            return
        }

        try {
            const response = await axios.get(
                'http://localhost:5000/api/user/dashboard',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setStats(response.data)
        } catch (err) {
            console.error(err)
            setError("Failed to load dashboard data.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserItems()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
                <p className="text-lg font-bold text-red-600">{error}</p>
                <button
                    onClick={fetchUserItems}
                    className="mt-4 text-sm font-bold text-red-700 hover:underline"
                >
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Page Header */}
            <div className="pb-6 border-b border-slate-200/60">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                    <LayoutDashboard className="text-indigo-600" size={32} />
                    Overview
                </h2>
                <p className="text-slate-500 text-sm mt-1">A quick summary of your productivity stats.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Total Notes Card */}
                <div className="group bg-white border border-slate-200 p-8 rounded-3xl hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                        <Notebook size={24} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total Notes</h3>
                    <p className="text-4xl font-black text-slate-900 mb-6">
                        {stats.notes}
                    </p>
                    <Link
                        to="/dashboard/notes"
                        className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all"
                    >
                        View Notes <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Total Tasks Card */}
                <div className="group bg-white border border-slate-200 p-8 rounded-3xl hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                        <CheckSquare size={24} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total Tasks</h3>
                    <p className="text-4xl font-black text-slate-900 mb-6">
                        {stats.tasks}
                    </p>
                    <Link
                        to="/dashboard/tasks"
                        className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm hover:gap-3 transition-all"
                    >
                        View Tasks <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Pending Tasks Card */}
                <div className="group bg-white border border-slate-200 p-8 rounded-3xl hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300">
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
                        <Clock size={24} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Pending</h3>
                    <p className="text-4xl font-black text-slate-900 mb-6">
                        {stats.pendingTasks}
                    </p>
                    <Link
                        to="/dashboard/tasks"
                        className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm hover:gap-3 transition-all"
                    >
                        Finish Them <ArrowRight size={16} />
                    </Link>
                </div>

            </div>

            {/* Empty State */}
            {stats.notes === 0 && stats.tasks === 0 && (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white/50 border-2 border-dashed border-slate-200 rounded-3xl">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-400">
                        <LayoutDashboard size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">No data yet</h3>
                    <p className="text-slate-500 max-w-xs mx-auto mt-2">
                        Start creating notes or tasks to see your productivity overview here.
                    </p>
                </div>
            )}

        </div>
    )
}

export default Dashboard