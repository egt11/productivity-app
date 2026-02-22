import React from 'react'
import { Link } from 'react-router'
import { LayoutDashboard, Notebook, CheckSquare, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react';

function Landing() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem('token')) || null);
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center bg-slate-50 overflow-hidden">

            <div className="relative z-10 max-w-4xl w-full px-6 text-center mt-4 md:mt-0">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
                    <Sparkles size={14} />
                    <span>The ultimate student companion</span>
                </div>

                {/* Hero Content */}
                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
                    Increase productivity, <br />
                    Enter <span className="text-indigo-600 italic">Flow State.</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    A unified workspace to organize your <strong>tasks</strong>, secure your <strong>notes</strong>, and boost your daily productivity.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <Link
                        to="/register"
                        className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200 active:scale-95 transition-all"
                    >
                        Start Planning for Free
                    </Link>
                    {!token && (
                        <Link
                            to="/login"
                            className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 active:scale-95 transition-all"
                        >
                            Log In
                        </Link>
                    )}
                </div>

                {/* Feature Mini-Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="p-6 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                            <LayoutDashboard size={20} />
                        </div>
                        <h3 className="font-bold text-slate-800">Intuitive Dashboard</h3>
                        <p className="text-sm text-slate-500 mt-1">Everything you need, visible at a glance.</p>
                    </div>
                    <div className="p-6 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                            <Notebook size={20} />
                        </div>
                        <h3 className="font-bold text-slate-800">Secure Notes</h3>
                        <p className="text-sm text-slate-500 mt-1">Capture ideas and lectures instantly.</p>
                    </div>
                    <div className="p-6 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                            <CheckSquare size={20} />
                        </div>
                        <h3 className="font-bold text-slate-800">Task Tracking</h3>
                        <p className="text-sm text-slate-500 mt-1">Never miss a deadline again.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing