import React from 'react'
import { Link } from 'react-router'

function Landing() {
    return (
        <div className="flex items-center justify-center px-4">
            <div className="max-w-lg w-full bg-white p-10 rounded-2xl shadow-lg text-center">
                <h1 className="text-4xl font-bold text-indigo-600 mb-4">
                    Welcome to Student Planner
                </h1>
                <p className="text-gray-700 mb-6 max-w-[70%] mx-auto">
                    Organize your tasks, notes, and stay productive all in one place.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/login"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Landing