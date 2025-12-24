import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Container, Grid, GridItem, VStack, HStack,
  Text, Button, useToast, Badge, IconButton,
  Drawer, DrawerBody, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, useDisclosure
} from '@chakra-ui/react'
import {
  Menu, Users, MessageSquare, CheckSquare,
  Gamepad2, Settings, LogOut
} from 'lucide-react'
import io from 'socket.io-client'

// Components
import PomodoroTimer from '../components/PomodoroTimer'
import ChatWindow from '../components/ChatWindow'
import TaskList from '../components/TaskList'
import UserStatus from '../components/UserStatus'
import BreakGames from '../components/BreakGames'

const StudyRoom = ({ user }) => {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const socketRef = useRef(null)
  
  const [isBreakTime, setIsBreakTime] = useState(false)
  const [socketConnected, setSocketConnected] = useState(false)

  useEffect(() => {
    const socket = io('http://localhost:5000')
    socketRef.current = socket

    socket.on('connect', () => {
      setSocketConnected(true)
      socket.emit('join-group', { groupId, userId: user.id, username: user.username })
    })

    socket.on('disconnect', () => {
      setSocketConnected(false)
    })

    return () => {
      if (socket) socket.disconnect()
    }
  }, [groupId, user])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBreakTime(true)
      toast({
        title: 'Break Time! ☕',
        description: 'Take a 5-minute break',
        status: 'info',
        duration: 5000,
      })
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleLeave = () => {
    navigate('/dashboard')
    toast({
      title: 'Left study group',
      status: 'info',
      duration: 3000,
    })
  }

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Mobile Header */}
      <Box display={{ base: 'flex', lg: 'none' }} p={4} bg="white" borderBottom="1px solid" borderColor="gray.200">
        <HStack justify="space-between" w="100%">
          <HStack>
            <IconButton icon={<Menu />} variant="ghost" onClick={onOpen} />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold">Study Group</Text>
              <Text fontSize="sm" color="gray.500">{groupId}</Text>
            </VStack>
          </HStack>
          <Badge colorScheme={socketConnected ? 'green' : 'red'}>
            {socketConnected ? 'Connected' : 'Offline'}
          </Badge>
        </HStack>
      </Box>

      <Container maxW="container.xl" pt={{ base: '70px', lg: 8 }} pb={8}>
        {isBreakTime ? (
          <VStack spacing={8}>
            <Box p={8} bgGradient="linear(to-r, green.100, blue.100)" borderRadius="2xl" textAlign="center">
              <Text fontSize="4xl">☕</Text>
              <Text fontSize="2xl" fontWeight="bold">Break Time!</Text>
              <Text color="gray.600">Take a 5-minute break</Text>
            </Box>

            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8} w="100%">
              <GridItem>
                <BreakGames 
                  groupId={groupId}
                  isActive={true}
                  onGameEnd={() => setIsBreakTime(false)}
                />
              </GridItem>
              <GridItem>
                <ChatWindow groupId={groupId} currentUser={user} socket={socketRef.current} />
              </GridItem>
            </Grid>

            <Button colorScheme="blue" size="lg" onClick={() => setIsBreakTime(false)}>
              🧠 End Break
            </Button>
          </VStack>
        ) : (
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
            <GridItem>
              <VStack spacing={8}>
                <PomodoroTimer 
                  groupId={groupId}
                  isHost={true}
                  socket={socketRef.current}
                  onBreakStart={() => setIsBreakTime(true)}
                />
                <TaskList groupId={groupId} socket={socketRef.current} />
              </VStack>
            </GridItem>

            <GridItem>
              <VStack spacing={8}>
                <UserStatus groupId={groupId} currentUser={user} socket={socketRef.current} />
                <ChatWindow groupId={groupId} currentUser={user} socket={socketRef.current} />
                <BreakGames groupId={groupId} isActive={false} />
              </VStack>
            </GridItem>
          </Grid>
        )}
      </Container>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>SyncScholars</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Button leftIcon={<Users />} variant="ghost" justifyContent="flex-start">Members</Button>
              <Button leftIcon={<MessageSquare />} variant="ghost" justifyContent="flex-start">Chat</Button>
              <Button leftIcon={<CheckSquare />} variant="ghost" justifyContent="flex-start">Tasks</Button>
              <Button leftIcon={<Gamepad2 />} variant="ghost" justifyContent="flex-start">Games</Button>
              <Button leftIcon={<Settings />} variant="ghost" justifyContent="flex-start">Settings</Button>
              <Button leftIcon={<LogOut />} colorScheme="red" variant="outline" onClick={handleLeave} mt={8}>
                Leave Group
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default StudyRoom