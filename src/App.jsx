import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Box, ChakraProvider, Text } from '@chakra-ui/react'
import { theme } from './theme'
import Navbar from './components/layout/Navbar'

// Pages
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import StudyRoom from './pages/StudyRoom'
import Messages from './pages/Messages'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('studyCord_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('studyCord_user')
      }
    }
    
    // Request notification permission on load
    if ('Notification' in window && Notification.permission === 'default') {
      setTimeout(() => {
        Notification.requestPermission()
      }, 2000)
    }
    
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('studyCord_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('studyCord_user')
  }

  if (loading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.950"
        flexDirection="column"
        position="relative"
        overflow="hidden"
      >
        {/* Animated Background */}
        <Box
          position="absolute"
          top="20%"
          left="20%"
          w="400px"
          h="400px"
          bg="purple.500"
          borderRadius="full"
          opacity="0.1"
          filter="blur(80px)"
          animation="glow-pulse 4s infinite"
        />
        <Box
          position="absolute"
          bottom="20%"
          right="20%"
          w="300px"
          h="300px"
          bg="red.500"
          borderRadius="full"
          opacity="0.1"
          filter="blur(60px)"
          animation="glow-pulse-red 4s infinite"
        />

        {/* Spinner */}
        <Box
          w="60px"
          h="60px"
          border="4px solid"
          borderColor="purple.700"
          borderTopColor="purple.400"
          borderRadius="full"
          animation="spin 1s linear infinite"
          boxShadow="0 0 30px rgba(128, 90, 213, 0.5)"
          mb={6}
        />

        {/* Loading Text */}
        <Text
          fontSize="lg"
          color="purple.300"
          className="glow-text"
          fontWeight="bold"
        >
          Loading StudyCord...
        </Text>
        <Text fontSize="sm" color="gray.400" mt={2}>
          Preparing your study environment
        </Text>
      </Box>
    )
  }

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Box minH="100vh" bg="gray.950" position="relative" overflowX="hidden">
          {/* Animated Background Elements */}
          <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bgImage="radial-gradient(circle at 20% 30%, rgba(128, 90, 213, 0.05) 0%, transparent 25%), radial-gradient(circle at 80% 70%, rgba(229, 62, 62, 0.05) 0%, transparent 25%)"
            bgSize="cover"
            zIndex="0"
            pointerEvents="none"
          />

          <Box position="relative" zIndex="1">
            {user && <Navbar user={user} onLogout={logout} />}
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Navigate to="/dashboard" /> : <Welcome onLogin={login} />
                }
              />
              <Route
                path="/login"
                element={
                  user ? <Navigate to="/dashboard" /> : <Login onLogin={login} />
                }
              />
              <Route
                path="/register"
                element={
                  user ? <Navigate to="/dashboard" /> : <Register onLogin={login} />
                }
              />
              <Route
                path="/dashboard"
                element={
                  user ? <Dashboard user={user} /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/messages"
                element={
                  user ? <Messages user={user} /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/study/:groupId"
                element={
                  user ? <StudyRoom user={user} /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App