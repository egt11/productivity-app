import React from 'react'
import { Route, Routes,} from 'react-router'
import Layout from './layout/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Layout>
  )
}

export default App