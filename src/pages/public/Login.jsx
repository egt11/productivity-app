import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        if (email && password) {
            localStorage.setItem('token', JSON.stringify({ email }));
            navigate('/dashboard');
        } else return
    }

    return (
        <div className="flex items-center justify-center px-4 py-12 min-h-[calc(100vh-80px)]">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Welcome <span className="text-indigo-600">Back</span>
                    </h1>
                    <p className="text-slate-500 mt-2">Log in to manage your planning.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email Address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="name@example.com"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5 ml-1">
                            <label className="text-sm font-semibold text-slate-700">Password</label>
                            <Link to="/forgot-password" size="sm" className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all mt-2"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-slate-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
                            Join for free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login
