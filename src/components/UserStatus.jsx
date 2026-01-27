import { useState, useEffect } from 'react'
import {
  VStack,
  HStack,
  Avatar,
  Text,
  Badge,
  Box,
  Button,
  SimpleGrid,
  Progress,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
} from '@chakra-ui/react'
import {
  Users,
  Clock,
  Target,
  Coffee,
  Volume2,
  VolumeX,
  Video,
  Phone,
  ScreenShare,
  Crown,
  Star,
  Zap,
  Flame,
  Trophy,
} from 'lucide-react'

const UserStatus = ({ groupId, currentUser, socket }) => {
  const [users, setUsers] = useState([])
  const [userStatus, setUserStatus] = useState('focusing')
  const [voiceActive, setVoiceActive] = useState(false)
  const [videoActive, setVideoActive] = useState(false)
  const [screenShareActive, setScreenShareActive] = useState(false)

  useEffect(() => {
    const demo = [
      {
        id: '1',
        name: 'Alex',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        status: 'focusing',
        time: '2h 30m',
        streak: 7,
        role: 'admin',
        points: 1250,
        voice: true,
        video: true,
      },
      {
        id: '2',
        name: 'Taylor',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
        status: 'break',
        time: '1h 45m',
        streak: 5,
        role: 'member',
        points: 980,
        voice: true,
        video: false,
      },
      {
        id: '3',
        name: 'Jordan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
        status: 'focusing',
        time: '3h 15m',
        streak: 12,
        role: 'member',
        points: 2100,
        voice: false,
        video: false,
      },
      {
        id: '4',
        name: 'Casey',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey',
        status: 'away',
        time: '45m',
        streak: 3,
        role: 'member',
        points: 450,
        voice: false,
        video: false,
      },
      {
        id: '5',
        name: 'Morgan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan',
        status: 'focusing',
        time: '4h 20m',
        streak: 21,
        role: 'member',
        points: 3200,
        voice: true,
        video: true,
      },
      {
        id: '6',
        name: 'Riley',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riley',
        status: 'break',
        time: '2h 10m',
        streak: 8,
        role: 'member',
        points: 1500,
        voice: false,
        video: false,
      },
      {
        id: '7',
        name: 'Quinn',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn',
        status: 'focusing',
        time: '1h 30m',
        streak: 6,
        role: 'member',
        points: 890,
        voice: true,
        video: false,
      },
      {
        id: currentUser?.id || '8',
        name: currentUser?.username || 'You',
        avatar: currentUser?.profilePicture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        status: userStatus,
        time: '2h 45m',
        streak: 9,
        role: 'host',
        points: 1800,
        voice: voiceActive,
        video: videoActive,
      },
    ]
    setUsers(demo)
  }, [currentUser, userStatus, voiceActive, videoActive])

  const updateStatus = (status) => {
    setUserStatus(status)
    if (socket) {
      socket.emit('update-focus', { groupId, userId: currentUser?.id, status })
    }
  }

  const toggleVoice = () => {
    setVoiceActive(!voiceActive)
  }

  const toggleVideo = () => {
    setVideoActive(!videoActive)
  }

  const toggleScreenShare = () => {
    setScreenShareActive(!screenShareActive)
  }

  const getStatusColor = (status) => {
    return status === 'focusing' ? 'green' : status === 'break' ? 'yellow' : 'red'
  }

  const getStatusGlow = (status) => {
    return status === 'focusing'
      ? '0 0 15px rgba(72, 187, 120, 0.5)'
      : status === 'break'
      ? '0 0 15px rgba(246, 173, 85, 0.5)'
      : '0 0 15px rgba(229, 62, 62, 0.5)'
  }

  const totalFocusTime = users.reduce((sum, user) => {
    const hours = parseInt(user.time) || 0
    return sum + hours
  }, 0)

  const activeUsers = users.filter(u => u.status === 'focusing').length
  const topStreak = Math.max(...users.map(u => u.streak))
  const totalPoints = users.reduce((sum, user) => sum + user.points, 0)

  return (
    <VStack spacing={6} w="100%" className="glow-border" p={6} borderRadius="xl" bg="gray.900">
      <Flex w="100%" justify="space-between" align="center">
        <HStack spacing={3}>
          <Box p={2} bg="purple.700" borderRadius="lg" boxShadow="glow.purple">
            <Users size={20} />
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontSize="xl" fontWeight="bold" className="glow-text">
              Study Buddies
            </Text>
            <Text fontSize="sm" color="gray.400">
              {users.length} members in voice
            </Text>
          </VStack>
        </HStack>
        <HStack spacing={2}>
          <Badge colorScheme="purple" boxShadow="glow.purple" px={3} py={1}>
            {activeUsers} focusing
          </Badge>
          <Badge colorScheme="green" px={3} py={1} boxShadow="0 0 15px rgba(72, 187, 120, 0.5)">
            {totalPoints} total pts
          </Badge>
        </HStack>
      </Flex>

      {/* Stats Grid */}
      <SimpleGrid columns={2} spacing={4} w="100%">
        <Box
          p={4}
          bg="purple.900/30"
          borderRadius="lg"
          border="1px solid"
          borderColor="purple.700"
          boxShadow="0 0 20px rgba(128, 90, 213, 0.3)"
          _hover={{ boxShadow: 'glow.purple' }}
          transition="all 0.3s"
        >
          <HStack>
            <Clock size={20} color="#805ad5" />
            <VStack align="start" spacing={0}>
              <Text fontSize="xs" color="gray.400">Total Focus</Text>
              <Text fontWeight="bold" fontSize="lg">{totalFocusTime}h</Text>
            </VStack>
          </HStack>
        </Box>
        <Box
          p={4}
          bg="red.900/30"
          borderRadius="lg"
          border="1px solid"
          borderColor="red.700"
          boxShadow="0 0 20px rgba(229, 62, 62, 0.3)"
          _hover={{ boxShadow: 'glow.red' }}
          transition="all 0.3s"
        >
          <HStack>
            <Flame size={20} color="#e53e3e" />
            <VStack align="start" spacing={0}>
              <Text fontSize="xs" color="gray.400">Best Streak</Text>
              <Text fontWeight="bold" fontSize="lg">{topStreak} days</Text>
            </VStack>
          </HStack>
        </Box>
      </SimpleGrid>

      {/* User List */}
      <VStack spacing={3} w="100%" maxH="400px" overflowY="auto" pr={2}>
        {users.map((user) => (
          <HStack
            key={user.id}
            p={4}
            bg={
              user.id === currentUser?.id
                ? 'purple.900/40'
                : user.status === 'focusing'
                ? 'green.900/20'
                : 'gray.800/50'
            }
            borderRadius="lg"
            w="100%"
            justify="space-between"
            border="2px solid"
            borderColor={
              user.id === currentUser?.id
                ? 'purple.600'
                : user.status === 'focusing'
                ? 'green.600'
                : user.status === 'break'
                ? 'yellow.600'
                : 'red.600'
            }
            boxShadow={
              user.id === currentUser?.id
                ? 'glow.purple'
                : getStatusGlow(user.status)
            }
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow:
                user.id === currentUser?.id
                  ? '0 0 30px rgba(128, 90, 213, 0.8)'
                  : getStatusGlow(user.status).replace('15px', '20px'),
            }}
            transition="all 0.3s"
          >
            <HStack spacing={4}>
              <Box position="relative">
                <Avatar
                  size="md"
                  name={user.name}
                  src={user.avatar}
                  border="2px solid"
                  borderColor={
                    user.role === 'host'
                      ? 'yellow.500'
                      : user.role === 'admin'
                      ? 'purple.500'
                      : 'gray.600'
                  }
                  boxShadow={
                    user.role === 'host'
                      ? '0 0 15px rgba(246, 173, 85, 0.7)'
                      : user.role === 'admin'
                      ? '0 0 15px rgba(128, 90, 213, 0.7)'
                      : 'none'
                  }
                />
                {(user.voice || user.video) && (
                  <HStack
                    position="absolute"
                    bottom="-5px"
                    right="-5px"
                    bg="gray.900"
                    p={1}
                    borderRadius="full"
                    border="1px solid"
                    borderColor="gray.700"
                  >
                    {user.voice && (
                      <Box
                        w="12px"
                        h="12px"
                        bg="green.500"
                        borderRadius="full"
                        boxShadow="0 0 10px rgba(72, 187, 120, 0.7)"
                      />
                    )}
                    {user.video && (
                      <Box
                        w="12px"
                        h="12px"
                        bg="red.500"
                        borderRadius="full"
                        boxShadow="0 0 10px rgba(229, 62, 62, 0.7)"
                      />
                    )}
                  </HStack>
                )}
              </Box>
              <VStack align="start" spacing={0}>
                <HStack spacing={2}>
                  <Text fontWeight="bold">
                    {user.name} {user.id === currentUser?.id && '(You)'}
                  </Text>
                  {user.role === 'host' && (
                    <Crown size={14} color="#FFD700" />
                  )}
                  {user.role === 'admin' && (
                    <Star size={14} color="#805ad5" />
                  )}
                </HStack>
                <HStack spacing={3}>
                  <Text fontSize="xs" color="gray.500">
                    {user.time} • Streak: {user.streak} days
                  </Text>
                  <Badge
                    colorScheme={getStatusColor(user.status)}
                    fontSize="xx-small"
                    boxShadow={getStatusGlow(user.status)}
                  >
                    {user.status === 'focusing' ? '🎯 Focusing' : user.status === 'break' ? '☕ Break' : '🚶 Away'}
                  </Badge>
                </HStack>
              </VStack>
            </HStack>
            <VStack align="end" spacing={1}>
              <HStack>
                <Zap size={14} color="#FFD700" />
                <Text fontSize="sm" color="yellow.300" fontWeight="bold">
                  {user.points} pts
                </Text>
              </HStack>
              <Text fontSize="xs" color="gray.400">
                {user.voice ? '🔊' : '🔇'} {user.video ? '📹' : '📷'}
              </Text>
            </VStack>
          </HStack>
        ))}
      </VStack>

      {/* Voice Controls */}
      <Box w="100%" p={4} bg="gray.800/50" borderRadius="lg" border="1px solid" borderColor="purple.700">
        <Text fontSize="sm" fontWeight="bold" mb={3} className="glow-text">
          Voice & Video Controls
        </Text>
        <HStack spacing={3} justify="center">
          <Tooltip label={voiceActive ? "Mute microphone" : "Unmute microphone"} hasArrow>
            <IconButton
              icon={voiceActive ? <Volume2 /> : <VolumeX />}
              colorScheme={voiceActive ? 'green' : 'red'}
              size="lg"
              borderRadius="full"
              onClick={toggleVoice}
              boxShadow={voiceActive ? '0 0 20px rgba(72, 187, 120, 0.6)' : 'glow.red'}
              _hover={{
                boxShadow: voiceActive
                  ? '0 0 30px rgba(72, 187, 120, 0.8)'
                  : '0 0 30px rgba(229, 62, 62, 0.8)',
              }}
            />
          </Tooltip>
          
          <Tooltip label={videoActive ? "Turn off video" : "Turn on video"} hasArrow>
            <IconButton
              icon={<Video />}
              colorScheme={videoActive ? 'purple' : 'gray'}
              size="lg"
              borderRadius="full"
              onClick={toggleVideo}
              boxShadow={videoActive ? 'glow.purple' : 'none'}
              _hover={{
                boxShadow: videoActive
                  ? '0 0 30px rgba(128, 90, 213, 0.8)'
                  : '0 0 15px rgba(128, 90, 213, 0.4)',
              }}
            />
          </Tooltip>
          
          <Tooltip label={screenShareActive ? "Stop sharing" : "Share screen"} hasArrow>
            <IconButton
              icon={<ScreenShare />}
              colorScheme={screenShareActive ? 'red' : 'blue'}
              size="lg"
              borderRadius="full"
              onClick={toggleScreenShare}
              boxShadow={screenShareActive ? 'glow.red' : '0 0 15px rgba(66, 153, 225, 0.5)'}
              _hover={{
                boxShadow: screenShareActive
                  ? '0 0 30px rgba(229, 62, 62, 0.8)'
                  : '0 0 30px rgba(66, 153, 225, 0.8)',
              }}
            />
          </Tooltip>
        </HStack>
      </Box>

      {/* Status Controls */}
      <HStack spacing={2} w="100%" pt={2}>
        <Text fontSize="sm" color="gray.400">Your status:</Text>
        <Button
          size="sm"
          colorScheme={userStatus === 'focusing' ? 'green' : 'gray'}
          leftIcon={<Target size={14} />}
          onClick={() => updateStatus('focusing')}
          boxShadow={userStatus === 'focusing' ? '0 0 15px rgba(72, 187, 120, 0.5)' : 'none'}
          _hover={{ boxShadow: '0 0 20px rgba(72, 187, 120, 0.7)' }}
        >
          Focusing
        </Button>
        <Button
          size="sm"
          colorScheme={userStatus === 'break' ? 'yellow' : 'gray'}
          leftIcon={<Coffee size={14} />}
          onClick={() => updateStatus('break')}
          boxShadow={userStatus === 'break' ? '0 0 15px rgba(246, 173, 85, 0.5)' : 'none'}
          _hover={{ boxShadow: '0 0 20px rgba(246, 173, 85, 0.7)' }}
        >
          Break
        </Button>
        <Button
          size="sm"
          colorScheme={userStatus === 'away' ? 'red' : 'gray'}
          leftIcon={<Phone size={14} />}
          onClick={() => updateStatus('away')}
          boxShadow={userStatus === 'away' ? 'glow.red' : 'none'}
          _hover={{ boxShadow: '0 0 20px rgba(229, 62, 62, 0.7)' }}
        >
          Away
        </Button>
      </HStack>
    </VStack>
  )
}

export default UserStatus