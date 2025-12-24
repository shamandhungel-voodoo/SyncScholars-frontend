import { useState, useEffect } from 'react'
import {
  VStack, HStack, Avatar, Text, Badge, 
  Box, Button, SimpleGrid
} from '@chakra-ui/react'
import { Users, Clock, Target, Coffee } from 'lucide-react'

const UserStatus = ({ groupId, currentUser, socket }) => {
  const [users, setUsers] = useState([])
  const [userStatus, setUserStatus] = useState('focusing')

  useEffect(() => {
    const demo = [
      { id: '1', name: 'Alex', status: 'focusing', time: '120 min', streak: 5 },
      { id: '2', name: 'Taylor', status: 'break', time: '90 min', streak: 3 },
      { id: '3', name: 'Jordan', status: 'focusing', time: '180 min', streak: 7 },
      { id: currentUser?.id || '4', name: currentUser?.username || 'You', status: userStatus, time: '150 min', streak: 4 },
    ]
    setUsers(demo)
  }, [currentUser, userStatus])

  const updateStatus = (status) => {
    setUserStatus(status)
    if (socket) {
      socket.emit('update-focus', { groupId, userId: currentUser?.id, status })
    }
  }

  const getStatusColor = (status) => {
    return status === 'focusing' ? 'green' : status === 'break' ? 'yellow' : 'gray'
  }

  return (
    <VStack spacing={6} w="100%" bg="white" p={6} borderRadius="2xl" shadow="xl">
      <HStack w="100%" justify="space-between">
        <Text fontSize="xl" fontWeight="bold">👥 Study Buddies</Text>
        <Badge colorScheme="purple">{users.length} online</Badge>
      </HStack>

      <SimpleGrid columns={2} spacing={4} w="100%">
        <Box p={3} bg="blue.50" borderRadius="lg">
          <HStack>
            <Clock size={16} />
            <VStack align="start" spacing={0}>
              <Text fontSize="xs">Total Study</Text>
              <Text fontWeight="bold">4h 30m</Text>
            </VStack>
          </HStack>
        </Box>
        <Box p={3} bg="green.50" borderRadius="lg">
          <HStack>
            <Target size={16} />
            <VStack align="start" spacing={0}>
              <Text fontSize="xs">Best Streak</Text>
              <Text fontWeight="bold">7 days</Text>
            </VStack>
          </HStack>
        </Box>
      </SimpleGrid>

      <VStack spacing={3} w="100%">
        {users.map(user => (
          <HStack
            key={user.id}
            p={3}
            bg={user.status === 'focusing' ? 'green.50' : 'gray.50'}
            borderRadius="lg"
            w="100%"
            justify="space-between"
          >
            <HStack spacing={3}>
              <Avatar size="sm" name={user.name} />
              <VStack align="start" spacing={0}>
                <Text fontWeight="medium">{user.name} {user.id === currentUser?.id && '(You)'}</Text>
                <Text fontSize="xs" color="gray.500">{user.time} • Streak: {user.streak} days</Text>
              </VStack>
            </HStack>
            <Badge colorScheme={getStatusColor(user.status)}>
              {user.status === 'focusing' ? '🎯 Focusing' : user.status === 'break' ? '☕ Break' : '🚶 Away'}
            </Badge>
          </HStack>
        ))}
      </VStack>

      <HStack spacing={2} w="100%" pt={2}>
        <Text fontSize="sm">Your status:</Text>
        <Button size="sm" colorScheme={userStatus === 'focusing' ? 'green' : 'gray'} onClick={() => updateStatus('focusing')}>
          🎯 Focusing
        </Button>
        <Button size="sm" colorScheme={userStatus === 'break' ? 'yellow' : 'gray'} onClick={() => updateStatus('break')}>
          ☕ Break
        </Button>
        <Button size="sm" colorScheme={userStatus === 'away' ? 'gray' : 'gray'} onClick={() => updateStatus('away')}>
          🚶 Away
        </Button>
      </HStack>
    </VStack>
  )
}

export default UserStatus