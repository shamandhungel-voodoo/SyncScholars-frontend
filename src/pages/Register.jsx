import { useState } from 'react'
import { Container, VStack, Input, Button, Heading, Text, Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleRegister = () => {
    // In real app, make API call
    navigate('/login')
  }

  return (
    <Container maxW="md" py={20}>
      <VStack spacing={8}>
        <Heading>Create Account</Heading>
        
        <VStack spacing={4} w="100%">
          <Input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({...form, username: e.target.value})}
            size="lg"
          />
          <Input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            size="lg"
          />
          <Input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            size="lg"
          />
          
          <Button
            colorScheme="blue"
            size="lg"
            w="100%"
            onClick={handleRegister}
          >
            Register
          </Button>
        </VStack>
        
        <Text>
          Already have an account?{' '}
          <Link color="blue.500" onClick={() => navigate('/login')}>
            Login
          </Link>
        </Text>
      </VStack>
    </Container>
  )
}

export default Register