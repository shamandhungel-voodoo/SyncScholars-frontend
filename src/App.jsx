import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import StudyRoom from './pages/StudyRoom'

// Components
import Footer from './components/Footer'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('syncscholars_user')
    if (saved) {
      setUser(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  // Add Matrix rain effect
  useEffect(() => {
    const createMatrixRain = () => {
      const container = document.querySelector('.matrix-bg')
      if (!container) return

      // Clear existing rain
      container.innerHTML = ''

      // Create rain drops
      for (let i = 0; i < 50; i++) {
        const rain = document.createElement('div')
        rain.className = 'matrix-rain'
        rain.style.left = `${Math.random() * 100}%`
        rain.style.animationDelay = `${Math.random() * 5}s`
        rain.style.animationDuration = `${3 + Math.random() * 4}s`
        container.appendChild(rain)
      }
    }

    createMatrixRain()
    
    // Recreate rain on resize
    window.addEventListener('resize', createMatrixRain)
    return () => window.removeEventListener('resize', createMatrixRain)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('syncscholars_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('syncscholars_user')
  }

  if (loading) {
    return (
      <Box 
        minH="100vh" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        bg="terminal.black"
        color="matrix.green"
        fontFamily="'Source Code Pro', monospace"
      >
        <Box className="code-typing" fontSize="lg">
          LOADING SYSTEM...
        </Box>
      </Box>
    )
  }

  return (
    <BrowserRouter>
      <Box 
        minH="100vh" 
        display="flex" 
        flexDirection="column"
        bg="terminal.black"
        color="matrix.green"
        position="relative"
      >
        {/* Matrix Background */}
        <Box className="matrix-bg">
          {/* Matrix rain effect created by JS */}
        </Box>
        
        <Box className="binary-bg" />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" /> : <Login onLogin={login} />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/dashboard" /> : <Register />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} onLogout={logout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/study/:groupId" 
            element={user ? <StudyRoom user={user} /> : <Navigate to="/login" />} 
          />
        </Routes>
        
        <Footer />
      </Box>
    </BrowserRouter>
  )
}

export default App
