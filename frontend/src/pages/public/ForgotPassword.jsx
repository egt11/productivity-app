import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Error from '../../components/Error'
import { Mail, KeyRound, ArrowLeft, Send, CheckCircle2, Lock } from 'lucide-react'
import { Link } from 'react-router'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSent, setIsSent] = useState(false)
    const [code, setCode] = useState('')
    const [isMatched, setIsMatched] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState([])
    const [passwordChanged, setPasswordChanged] = useState(false)

    const sendCode = async () => {
        setSuccess(null)
        setError([])
        if (!email) {
            setError(prev => [...prev, "Email field must not be empty"])
            return
        }
        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
                { email: email }
            )
            setIsSent(true)
            setSuccess(response.data.message)
        } catch (error) {
            setError(prev => [...prev, error.response.data.message])
        }
    }

    const matchCode = async () => {
        setSuccess(null)
        setError([])
        if (!code) {
            setError(prev => [...prev, "Enter the code sent in your email"])
            return
        }
        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/auth/check-code`,
                { email: email, code: code }
            )
            setSuccess(response.data.message)
            setIsMatched(true)
        } catch (error) {
            console.log(error)
        }
    }

    const resetPassword = async () => {
        setSuccess(null)
        setError([])
        if (!password || !confirmPassword) {
            setError(prev => [...prev, "All fields are required"])
            return
        }

        if (password.length < 8) {
            setError(prev => [...prev, "Password length must be 8 characters or more"])
            return
        }

        if (password !== confirmPassword) {
            setError(prev => [...prev, "Passwords do not match"])
            return
        }

        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
                { email: email, password: password }
            )
            setSuccess(response.data.message)
            setPasswordChanged(true)
            setPassword('')
            setConfirmPassword('')
        } catch (error) {
            console.log(error)
        }
    }

    const handleSendCode = e => {
        e.preventDefault()
        sendCode()
    }

    const handleMatchCode = e => {
        e.preventDefault()
        matchCode()
    }

    const handleResetPassword = e => {
        e.preventDefault()
        resetPassword()
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">

            {/* Step 1 & 2: Email and Code Entry */}
            {!isMatched ? (
                <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 animate-in fade-in duration-500">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl text-indigo-600 mb-4">
                            {isSent ? <KeyRound size={32} /> : <Mail size={32} />}
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            {isSent ? 'Verify Code' : 'Forgot Password'}
                        </h2>
                        <p className="text-slate-500 text-sm mt-2">
                            {isSent
                                ? "Check your inbox for the 6-digit verification code."
                                : "Enter your email and we'll send you a code to reset your password."
                            }
                        </p>
                    </div>

                    <div className="space-y-3 mb-6">
                        {error && error.map((err, index) => <Error key={index} message={err} />)}
                        {success && (
                            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in zoom-in duration-300">
                                <CheckCircle2 size={18} />
                                {success}
                            </div>
                        )}
                    </div>

                    <form onSubmit={isSent ? handleMatchCode : handleSendCode} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSent}
                                    placeholder="name@example.com"
                                    className="w-full pl-10 pr-4 py-3 bg-white disabled:bg-slate-50 disabled:text-slate-500 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {isSent && (
                            <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Verification Code</label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="Enter 6-digit code"
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none tracking-widest font-mono"
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
                        >
                            {isSent ? 'Verify Code' : 'Send Code'}
                            <Send size={18} />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                            <ArrowLeft size={16} />
                            Back to Login
                        </Link>
                    </div>
                </div>
            ) : (
                /* Step 3: Reset Password Form */
                <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 animate-in zoom-in duration-500">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl text-indigo-600 mb-4">
                            <Lock size={32} />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">New Password</h2>
                        <p className="text-slate-500 text-sm mt-2">Set a strong password to secure your account.</p>
                    </div>

                    <div className="space-y-3 mb-6">
                        {error && error.map((err, index) => <Error key={index} message={err} />)}
                        {success && (
                            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in zoom-in duration-300">
                                <CheckCircle2 size={18} />
                                {success}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleResetPassword}>
                        <fieldset disabled={passwordChanged} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700 ml-1">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Confirm New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
                            >
                                Update Password
                                <CheckCircle2 size={18} />
                            </button>
                        </fieldset>


                    </form>

                    <div className="mt-8 text-center">
                        <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                            <ArrowLeft size={16} />
                            Back to Login
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ForgotPassword