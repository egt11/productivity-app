import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { User, Mail, Lock, Edit3, Save, XCircle } from 'lucide-react'
import Error from '../../components/Error'

function Settings() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState([])
  const [success, setSuccess] = useState(false)

  const updateInfo = async () => {
    setSuccess(false)
    setError([])

    if (!email || !name) {
      setError(prev => [...prev, 'Email or Full Name must not be empty.'])
      return
    }

    if (password) {
      if (!confirmPassword) {
        setError(prev => [...prev, 'Please confirm your new password.'])
        setPassword('')
        setConfirmPassword('')
        return
      }

      if (password.length < 8) {
        setError(prev => [...prev, 'New password must be 8 characters long or more.'])
        setPassword('')
        setConfirmPassword('')
        return
      }

      if (password !== confirmPassword) {
        setError(prev => [...prev, 'Passwords do not match.'])
        setPassword('')
        setConfirmPassword('')
        return
      }
    }

    const storedToken = JSON.parse(localStorage.getItem('token'))
    const token = storedToken?.token

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/user/settings`,
        { email: email, fullName: name, password: password },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSuccess(true)

      storedToken.fullName = name
      storedToken.email = email
      localStorage.setItem('token', JSON.stringify(storedToken))

    } catch (error) {
      console.log(error)
    }

    setPassword('')
    setConfirmPassword('')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInfo()
    setIsEditing(false)
  }

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('token'))
    const token = storedToken?.token

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/settings`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const { email, fullName } = response.data
        setEmail(email)
        setName(fullName)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [])


  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/60">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Settings</h2>
          <p className="text-slate-500 text-sm mt-1">Configure your personal account details and security here.</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center justify-center gap-4 px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100"
          >
            <Edit3 size={18} />
            Edit Profile
          </button>
        )}
      </div>

      {error &&
        error.map((err, index) => <Error key={index} message={err} />)
      }

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4 text-center">
          User details updated successfully
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset disabled={!isEditing} className="space-y-6 disabled:opacity-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white disabled:bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 placeholder:text-slate-400"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white disabled:bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white disabled:bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
                  placeholder={isEditing ? "Leave blank to keep current" : "••••••••"}
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white disabled:bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
                  placeholder={isEditing ? "Confirm your new password" : "••••••••"}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex items-center gap-3 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all active:scale-95"
              >
                <XCircle size={20} />
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
              >
                <Save size={20} />
                Save
              </button>
            </div>
          )}
        </fieldset>
      </form>
    </div>
  )
}

export default Settings