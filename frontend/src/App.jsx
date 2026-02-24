import React from 'react'
import { Route, Routes, } from 'react-router'
import PublicLayout from './layout/PublicLayout'
import DashboardLayout from './layout/DashboardLayout'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import Landing from './pages/public/Landing'
import Dashboard from './pages/dashboard/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Notes from './pages/dashboard/Notes'
import Tasks from './pages/dashboard/Tasks'
import Settings from './pages/dashboard/Settings'

function App() {
  return (
    <Routes>
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<Landing />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<Dashboard />}/>
          <Route path='notes' element={<Notes />} />
          <Route path='tasks' element={<Tasks />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </Route>


    </Routes>
  )
}

export default App