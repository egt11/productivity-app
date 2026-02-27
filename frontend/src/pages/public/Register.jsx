import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import Error from '../../components/Error'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState([])
    const [success, setSuccess] = useState(null)

    const registerUser = async () => {
        setSuccess(false);
        setError([]);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                {
                    fullName: name,
                    email,
                    password,
                    confirmPassword
                }
            );
            setSuccess(response.data.message);

            setName('');
            setEmail('');
        } catch (error) {
            setSuccess(null);
            setError(prev => [
                ...prev,
                error.response?.data?.message || 'An error occurred'
            ]);
        }
        setPassword('');
        setConfirmPassword('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser();
    }

    return (
        <div className="flex items-center justify-center px-4 py-12 min-h-[calc(100vh-80px)]">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Create an <span className="text-indigo-600">Account</span>
                    </h1>
                    <p className="text-slate-500 mt-2">Join us to start planning your success.</p>
                </div>
                {error && (
                    error.map((err, index) => (
                        <Error key={index} message={err} />
                    ))
                )}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4 text-center">
                        {success}
                    </div>
                )}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Full Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="e.g. John Doe"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                    </div>

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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Confirm</label>
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all mt-2"
                    >
                        Register
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-slate-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register