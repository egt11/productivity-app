import React from "react";
import { Link } from "react-router";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
            <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
                {/* Logo Section */}
                <Link
                    to="/"
                    className="flex items-center gap-2.5 group"
                >
                    <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-200">
                        P
                    </div>
                    <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors flex md:flex-row flex-col">
                        Student<span className="text-indigo-600 group-hover:text-indigo-700">Planner</span>
                    </span>
                </Link>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 md:gap-3">
                    <Link
                        to="/login"
                        className="px-4 py-2 text-sm md:text-base font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-all"
                    >
                        Log in
                    </Link>
                    <Link
                        to="/register"
                        className="px-5 py-2 md:px-6 md:py-2.5 text-sm md:text-base font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-100 active:scale-95 transition-all"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </nav>
    );
}