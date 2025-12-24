import { useState } from 'react'
import { Box, Container, VStack, Input, Button, Heading, Text, Alert, AlertIcon } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    const user = {
      id: 'user123',
      username: 'Demo User',
      email: email,
      profilePicture: 'https://ui-avatars.com/api/?name=Demo+User&background=blue'
    }
    
    onLogin(user)
    navigate('/dashboard')
  }

  const handleDemo = () => {
    const user = {
      id: 'demo123',
      username: 'Alex Johnson',
      email: 'demo@example.com',
      profilePicture: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=blue'
    }
    onLogin(user)
    navigate('/dashboard')
  }

  return (
    <Container maxW="md" py={20}>
      <VStack spacing={8}>
        <Heading>Welcome to SyncScholars</Heading>
        
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        <VStack spacing={4} w="100%">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
          />
          
          <Button
            colorScheme="blue"
            size="lg"
            w="100%"
            onClick={handleLogin}
          >
            Login
          </Button>
          
          <Button
            variant="outline"
            colorScheme="green"
            size="lg"
            w="100%"
            onClick={handleDemo}
          >
            Try Demo Account
          </Button>
        </VStack>
        
        <Text fontSize="sm" color="gray.500" textAlign="center">
          Use any email/password or click "Try Demo Account"
        </Text>
      </VStack>
    </Container>
  )
}

export default Login