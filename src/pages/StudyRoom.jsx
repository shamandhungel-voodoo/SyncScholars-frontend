import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Button,
  useToast,
  Badge,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import {
  Menu,
  Users,
  MessageSquare,
  CheckSquare,
  Gamepad2,
  Settings,
  LogOut,
  Search,
  Bell,
  Volume2,
  ScreenShare,
  Video,
  Mic,
  Target,
  Trophy,
  BookOpen,
  BarChart3,
} from 'lucide-react'
import io from 'socket.io-client'

// Components
import Sidebar from '../components/layout/Sidebar'
import PomodoroTimer from '../components/PomodoroTimer'
import ChatWindow from '../components/ChatWindow'
import TaskList from '../components/TaskList'
import UserStatus from '../components/UserStatus'
import BreakGames from '../components/BreakGames'
import Stats from '../components/Stats'
import Resources from '../components/Resources'

const StudyRoom = ({ user }) => {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const socketRef = useRef(null)
  
  const [isBreakTime, setIsBreakTime] = useState(false)
  const [socketConnected, setSocketConnected] = useState(false)
  const [activeTab, setActiveTab] = useState('timer')
  const [members] = useState([
    { id: '1', name: 'Alex', status: 'focusing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    { id: '2', name: 'Taylor', status: 'break', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor' },
    { id: '3', name: 'Jordan', status: 'focusing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan' },
    { id: '4', name: 'Casey', status: 'focusing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey' },
    { id: '5', name: 'Morgan', status: 'focusing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan' },
    { id: '6', name: 'Riley', status: 'break', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riley' },
    { id: '7', name: 'Quinn', status: 'focusing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn' },
    { id: '8', name: 'Skyler', status: 'away', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Skyler' },
  ])

  useEffect(() => {
    // Mock WebSocket connection
    const socket = io('http://localhost:5000', {
      transports: ['websocket'],
    })
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

  const handleLeave = () => {
    navigate('/dashboard')
    toast({
      title: 'Left study group',
      description: 'You have successfully left the study group',
      status: 'info',
      duration: 3000,
      position: 'top',
      isClosable: true,
    })
  }

  const handleBreakEnd = () => {
    setIsBreakTime(false)
    toast({
      title: 'Break Time Over!',
      description: 'Time to get back to studying!',
      status: 'success',
      duration: 3000,
      position: 'top',
      isClosable: true,
    })
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'timer':
        return (
          <PomodoroTimer
            groupId={groupId}
            isHost={true}
            socket={socketRef.current}
            onBreakStart={() => {
              setIsBreakTime(true)
              toast({
                title: 'Break Time! ☕',
                description: 'Take a 5-minute break and relax',
                status: 'info',
                duration: 5000,
                position: 'top',
                isClosable: true,
              })
            }}
          />
        )
      case 'chat':
        return <ChatWindow groupId={groupId} currentUser={user} socket={socketRef.current} />
      case 'tasks':
        return <TaskList groupId={groupId} socket={socketRef.current} />
      case 'members':
        return <UserStatus groupId={groupId} currentUser={user} socket={socketRef.current} />
      case 'games':
        return <BreakGames groupId={groupId} isActive={isBreakTime} onGameEnd={handleBreakEnd} />
      case 'stats':
        return <Stats groupId={groupId} currentUser={user} />
      case 'resources':
        return <Resources groupId={groupId} />
      default:
        return (
          <PomodoroTimer
            groupId={groupId}
            isHost={true}
            socket={socketRef.current}
            onBreakStart={() => setIsBreakTime(true)}
          />
        )
    }
  }

  return (
    <Box minH="calc(100vh - 64px)" bg="gray.950" position="relative">
      {/* Animated Background Elements */}
      <Box
        position="fixed"
        top="20%"
        left="10%"
        w="300px"
        h="300px"
        bg="purple.500"
        borderRadius="full"
        opacity="0.05"
        filter="blur(60px)"
        animation="glow-pulse 8s infinite"
        zIndex="0"
      />
      <Box
        position="fixed"
        bottom="20%"
        right="10%"
        w="400px"
        h="400px"
        bg="red.500"
        borderRadius="full"
        opacity="0.05"
        filter="blur(60px)"
        animation="glow-pulse-red 8s infinite"
        zIndex="0"
      />

      <Flex position="relative" zIndex="1">
        {/* Sidebar */}
        <Sidebar
          groupId={groupId}
          members={members}
          onTabChange={setActiveTab}
          activeTab={activeTab}
        />

        {/* Main Content */}
        <Box
          flex="1"
          ml={{ base: 0, md: '70px' }}
          p={{ base: 4, md: 6 }}
          minH="calc(100vh - 64px)"
        >
          {isBreakTime ? (
            <VStack spacing={8}>
              <Box
                p={8}
                bgGradient="linear(to-r, purple.900, red.900)"
                borderRadius="xl"
                textAlign="center"
                w="100%"
                border="2px solid"
                borderColor="purple.600"
                boxShadow="0 0 40px rgba(128, 90, 213, 0.5)"
                className="glow-animate"
              >
                <Text fontSize="6xl" mb={4}>🎮</Text>
                <Text fontSize="2xl" fontWeight="bold" className="glow-text">
                  Break Time Activated!
                </Text>
                <Text color="gray.300">Take a 5-minute break and play some games</Text>
              </Box>

              <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8} w="100%">
                <GridItem>
                  <BreakGames
                    groupId={groupId}
                    isActive={true}
                    onGameEnd={handleBreakEnd}
                  />
                </GridItem>
                <GridItem>
                  <ChatWindow
                    groupId={groupId}
                    currentUser={user}
                    socket={socketRef.current}
                  />
                </GridItem>
              </Grid>

              <Button
                colorScheme="purple"
                size="lg"
                onClick={handleBreakEnd}
                px={8}
                py={6}
                fontSize="lg"
                boxShadow="glow.purple"
                _hover={{
                  boxShadow: '0 0 40px rgba(128, 90, 213, 0.8)',
                  transform: 'translateY(-2px)',
                }}
                className="glow-animate"
              >
                🧠 End Break & Continue Studying
              </Button>
            </VStack>
          ) : (
            <>
              {/* Header */}
              <Flex
                justify="space-between"
                align="center"
                mb={6}
                pb={4}
                borderBottom="2px solid"
                borderColor="purple.800"
              >
                <VStack align="start" spacing={1}>
                  <HStack spacing={2}>
                    <Box
                      w="8px"
                      h="8px"
                      bg={socketConnected ? 'green.500' : 'red.500'}
                      borderRadius="full"
                      boxShadow={socketConnected ? '0 0 10px rgba(72, 187, 120, 0.8)' : 'glow.red'}
                      animation={socketConnected ? 'glow-pulse-green 2s infinite' : 'none'}
                    />
                    <Text fontSize="xl" fontWeight="bold" className="glow-text">
                      {groupId === 'NEW' ? 'New Study Group' : `Study Group: ${groupId}`}
                    </Text>
                  </HStack>
                  <HStack spacing={2}>
                    <Badge
                      colorScheme={socketConnected ? 'green' : 'red'}
                      boxShadow={socketConnected ? '0 0 10px rgba(72, 187, 120, 0.5)' : 'glow.red'}
                    >
                      {socketConnected ? 'Connected' : 'Offline'}
                    </Badge>
                    <Badge
                      colorScheme="purple"
                      boxShadow="glow.purple"
                    >
                      {members.filter(m => m.status === 'focusing').length} focusing
                    </Badge>
                    <Badge
                      colorScheme="red"
                      boxShadow="glow.red"
                    >
                      {members.length} total members
                    </Badge>
                  </HStack>
                </VStack>
                <HStack spacing={2}>
                  <IconButton
                    icon={<Volume2 size={18} />}
                    variant="ghost"
                    aria-label="Voice settings"
                    _hover={{ bg: 'purple.800', boxShadow: 'glow.purple' }}
                  />
                  <IconButton
                    icon={<Bell size={18} />}
                    variant="ghost"
                    aria-label="Notifications"
                    className="notification-badge"
                    _hover={{ bg: 'red.800', boxShadow: 'glow.red' }}
                  />
                  <Button
                    leftIcon={<LogOut size={16} />}
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    onClick={handleLeave}
                    boxShadow="glow.red"
                    _hover={{ boxShadow: '0 0 20px rgba(229, 62, 62, 0.8)' }}
                  >
                    Leave
                  </Button>
                </HStack>
              </Flex>

              {/* Active Tab Display */}
              <Box mb={4}>
                <Text fontSize="sm" color="gray.400" mb={2}>
                  Active Section:
                </Text>
                <Badge
                  colorScheme="purple"
                  fontSize="md"
                  px={3}
                  py={1}
                  borderRadius="full"
                  boxShadow="glow.purple"
                  className="glow-animate"
                >
                  {activeTab === 'timer' && <Target size={14} style={{ marginRight: '6px', display: 'inline' }} />}
                  {activeTab === 'chat' && <MessageSquare size={14} style={{ marginRight: '6px', display: 'inline' }} />}
                  {activeTab === 'tasks' && <CheckSquare size={14} style={{ marginRight: '6px', display: 'inline' }} />}
                  {activeTab === 'members' && <Users size={14} style={{ marginRight: '6px', display: 'inline' }} />}
                  {activeTab === 'games' && <Gamepad2 size={14} style={{ marginRight: '6px', display: 'inline' }} />}
                  {activeTab === 'stats' && <BarChart3 size={14} style={{ marginRight: '6px', display: 'inline' }} />}
                  {activeTab === 'resources' && <BookOpen size={14} style={{ marginRight: '6px', display: 'inline' }} />}
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </Badge>
              </Box>

              {/* Main Content Area */}
              <Box className="fade-in">
                {renderContent()}
              </Box>
            </>
          )}
        </Box>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
        <DrawerContent
          bg="gray.900"
          borderRight="2px solid"
          borderColor="purple.700"
          boxShadow="20px 0 40px rgba(0, 0, 0, 0.5)"
        >
          <DrawerCloseButton color="white" />
          <DrawerHeader
            borderBottom="2px solid"
            borderColor="purple.700"
            bg="gray.900"
          >
            <HStack spacing={2}>
              <Box
                w="8px"
                h="8px"
                bg="green.500"
                borderRadius="full"
                boxShadow="0 0 10px rgba(72, 187, 120, 0.8)"
              />
              <Text fontSize="lg" fontWeight="bold" className="glow-text">
                StudyCord
              </Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody py={6}>
            <VStack spacing={2} align="stretch">
              {[
                { id: 'timer', label: 'Timer', icon: <Target size={18} /> },
                { id: 'chat', label: 'Chat', icon: <MessageSquare size={18} /> },
                { id: 'tasks', label: 'Tasks', icon: <CheckSquare size={18} /> },
                { id: 'members', label: 'Members', icon: <Users size={18} /> },
                { id: 'games', label: 'Games', icon: <Gamepad2 size={18} /> },
                { id: 'stats', label: 'Stats', icon: <BarChart3 size={18} /> },
                { id: 'resources', label: 'Resources', icon: <BookOpen size={18} /> },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={tab.icon}
                  onClick={() => {
                    setActiveTab(tab.id)
                    onClose()
                  }}
                  bg={activeTab === tab.id ? 'purple.900' : 'transparent'}
                  color={activeTab === tab.id ? 'purple.300' : 'gray.300'}
                  borderLeft={activeTab === tab.id ? '4px solid' : 'none'}
                  borderColor="purple.500"
                  _hover={{
                    bg: 'purple.800',
                    color: 'white',
                    transform: 'translateX(4px)',
                    boxShadow: '0 0 20px rgba(128, 90, 213, 0.3)',
                  }}
                  transition="all 0.2s"
                  py={4}
                  pl={4}
                >
                  {tab.label}
                </Button>
              ))}
              
              <Box pt={8} borderTop="1px solid" borderColor="gray.800" mt={4}>
                <Button
                  w="100%"
                  leftIcon={<LogOut size={16} />}
                  colorScheme="red"
                  variant="outline"
                  onClick={handleLeave}
                  boxShadow="glow.red"
                  _hover={{ boxShadow: '0 0 20px rgba(229, 62, 62, 0.8)' }}
                >
                  Leave Group
                </Button>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Bottom Mobile Navigation */}
      <Box
        display={{ base: 'flex', md: 'none' }}
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="gray.900"
        borderTop="2px solid"
        borderColor="purple.700"
        py={2}
        px={4}
        zIndex="1000"
        backdropFilter="blur(10px)"
      >
        <HStack justify="space-around" w="100%">
          <IconButton
            icon={<Menu />}
            variant="ghost"
            aria-label="Open menu"
            onClick={onOpen}
            color="purple.300"
          />
          <IconButton
            icon={<Target />}
            variant={activeTab === 'timer' ? 'solid' : 'ghost'}
            colorScheme={activeTab === 'timer' ? 'purple' : 'gray'}
            aria-label="Timer"
            onClick={() => setActiveTab('timer')}
          />
          <IconButton
            icon={<MessageSquare />}
            variant={activeTab === 'chat' ? 'solid' : 'ghost'}
            colorScheme={activeTab === 'chat' ? 'purple' : 'gray'}
            aria-label="Chat"
            onClick={() => setActiveTab('chat')}
          />
          <IconButton
            icon={<Gamepad2 />}
            variant={activeTab === 'games' ? 'solid' : 'ghost'}
            colorScheme={activeTab === 'games' ? 'purple' : 'gray'}
            aria-label="Games"
            onClick={() => setActiveTab('games')}
          />
        </HStack>
      </Box>
    </Box>
  )
}

export default StudyRoom