import React from "react";
import { Link } from "react-router";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
                <Link
                    to="/"
                    className="text-lg md:text-2xl font-bold tracking-tight text-indigo-600 hover:text-indigo-700 transition"
                >
                    Student Planner
                </Link>

                <div className="flex items-center gap-2 md:gap-3">
                    <Link
                        to="/login"
                        className="px-4 py-2 text-sm md:text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-4 py-2 text-sm md:text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:scale-[0.97] transition transform"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
}
