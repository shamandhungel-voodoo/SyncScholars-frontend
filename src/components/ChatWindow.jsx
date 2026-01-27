import { useState, useEffect, useRef } from 'react'
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  Avatar,
  HStack,
  IconButton,
  useToast,
  Badge,
  Flex,
  InputGroup,
  InputRightElement,
  AvatarGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
} from '@chakra-ui/react'
import {
  Send,
  Smile,
  Paperclip,
  Mic,
  Hash,
  Pin,
  Users,
  Volume2,
  VolumeX,
  Video,
  ScreenShare,
  MoreVertical,
  Crown,
  Star,
} from 'lucide-react'

const ChatWindow = ({ groupId, currentUser, socket }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [members, setMembers] = useState([])
  const [muted, setMuted] = useState(false)
  const messagesEndRef = useRef(null)
  const toast = useToast()

  useEffect(() => {
    // Demo members (more than 4)
    const demoMembers = [
      { id: '1', username: 'Alex', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', status: 'online', role: 'admin' },
      { id: '2', username: 'Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor', status: 'online', role: 'member' },
      { id: '3', username: 'Jordan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', status: 'online', role: 'member' },
      { id: '4', username: 'Casey', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey', status: 'online', role: 'member' },
      { id: '5', username: 'Morgan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan', status: 'online', role: 'member' },
      { id: '6', username: 'Riley', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riley', status: 'online', role: 'member' },
      { id: '7', username: 'Quinn', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn', status: 'away', role: 'member' },
      { id: '8', username: 'Skyler', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Skyler', status: 'offline', role: 'member' },
    ]
    setMembers(demoMembers)

    const demoMessages = [
      {
        id: '1',
        userId: 'user1',
        username: 'Alex',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        content: 'Welcome everyone! Ready to study React hooks?',
        timestamp: new Date(Date.now() - 3600000),
        type: 'system',
      },
      {
        id: '2',
        userId: 'user2',
        username: 'Taylor',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
        content: 'Yes! I just finished the useEffect examples.',
        timestamp: new Date(Date.now() - 1800000),
        type: 'user',
      },
      {
        id: '3',
        userId: 'user3',
        username: 'Jordan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
        content: 'Anyone having trouble with useMemo?',
        timestamp: new Date(Date.now() - 900000),
        type: 'user',
      },
      {
        id: '4',
        userId: 'user4',
        username: 'Casey',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey',
        content: 'I can help! Just finished optimizing my app with it.',
        timestamp: new Date(Date.now() - 600000),
        type: 'user',
      },
      {
        id: '5',
        userId: 'user5',
        username: 'Morgan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan',
        content: 'Sharing my notes on React Router v6...',
        timestamp: new Date(Date.now() - 300000),
        type: 'user',
      },
    ]
    setMessages(demoMessages)
    
    if (socket) {
      socket.on('new-message', (msg) => {
        setMessages(prev => [...prev, msg])
      })
    }
  }, [socket])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim() || !currentUser) {
      toast({
        title: 'Message is empty',
        status: 'warning',
        duration: 2000,
      })
      return
    }

    const msg = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      avatar: currentUser.profilePicture,
      content: newMessage,
      timestamp: new Date(),
      type: 'user',
    }

    if (socket) {
      socket.emit('send-message', { groupId, ...msg })
    }

    setMessages(prev => [...prev, msg])
    setNewMessage('')
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const toggleMute = () => {
    setMuted(!muted)
    toast({
      title: muted ? '🔊 Sound unmuted' : '🔇 Sound muted',
      status: 'info',
      duration: 2000,
    })
  }

  return (
    <VStack spacing={0} h="600px" w="100%" className="glow-border" borderRadius="lg" overflow="hidden">
      {/* Chat Header with Members */}
      <Flex
        w="100%"
        p={3}
        bg="gray.900"
        borderBottom="2px solid"
        borderColor="purple.700"
        align="center"
        justify="space-between"
        boxShadow="0 0 20px rgba(128, 90, 213, 0.3)"
      >
        <HStack spacing={3}>
          <Box
            p={2}
            bg="purple.700"
            borderRadius="lg"
            boxShadow="glow.purple"
          >
            <Hash size={20} color="white" />
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold" className="glow-text">Study Group</Text>
            <HStack spacing={2}>
              <Badge colorScheme="green" boxShadow="0 0 10px rgba(72, 187, 120, 0.5)">
                {members.filter(m => m.status === 'online').length} online
              </Badge>
              <Badge colorScheme="red" boxShadow="0 0 10px rgba(229, 62, 62, 0.5)">
                {members.filter(m => m.status === 'offline').length} offline
              </Badge>
            </HStack>
          </VStack>
        </HStack>
        
        <HStack spacing={2}>
          {/* Voice Controls */}
          <Tooltip label={muted ? "Unmute" : "Mute"} hasArrow>
            <IconButton
              icon={muted ? <VolumeX /> : <Volume2 />}
              size="sm"
              variant="ghost"
              aria-label="Toggle mute"
              onClick={toggleMute}
              _hover={{ bg: 'purple.700', boxShadow: 'glow.purple' }}
            />
          </Tooltip>
          
          {/* Members Avatar Group */}
          <Menu>
            <MenuButton>
              <AvatarGroup size="sm" max={5} spacing="-0.5rem">
                {members.slice(0, 5).map((member) => (
                  <Avatar
                    key={member.id}
                    name={member.username}
                    src={member.avatar}
                    border="2px solid"
                    borderColor="purple.700"
                    boxShadow="0 0 10px rgba(128, 90, 213, 0.5)"
                  />
                ))}
              </AvatarGroup>
            </MenuButton>
            <MenuList bg="gray.900" borderColor="purple.700" boxShadow="glow.purple">
              <Text px={3} py={2} fontWeight="bold" borderBottom="1px solid" borderColor="purple.700">
                Group Members ({members.length})
              </Text>
              {members.map((member) => (
                <MenuItem key={member.id} bg="gray.900" _hover={{ bg: 'purple.800' }}>
                  <HStack spacing={2}>
                    <Avatar size="xs" name={member.username} src={member.avatar} />
                    <Text>{member.username}</Text>
                    {member.role === 'admin' && <Crown size={12} color="#FFD700" />}
                    <Badge
                      ml="auto"
                      colorScheme={member.status === 'online' ? 'green' : 'gray'}
                      fontSize="xx-small"
                      boxShadow={member.status === 'online' ? '0 0 8px rgba(72, 187, 120, 0.6)' : 'none'}
                    >
                      {member.status}
                    </Badge>
                  </HStack>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Chat Container */}
      <Flex flex={1} w="100%" overflow="hidden">
        {/* Messages Area */}
        <Box flex={1} p={4} overflowY="auto" bg="gray.900/50">
          {messages.map((msg) => (
            <HStack
              key={msg.id}
              mb={4}
              align="start"
              p={3}
              borderRadius="lg"
              bg={msg.type === 'system' ? 'purple.900/30' : 'gray.800/50'}
              border="1px solid"
              borderColor={msg.type === 'system' ? 'purple.600' : 'gray.700'}
              _hover={{
                bg: msg.type === 'system' ? 'purple.900/50' : 'gray.800',
                boxShadow: '0 0 15px rgba(128, 90, 213, 0.2)',
              }}
              transition="all 0.2s"
            >
              <Avatar
                size="sm"
                name={msg.username}
                src={msg.avatar}
                border="2px solid"
                borderColor={msg.type === 'system' ? 'purple.500' : 'gray.600'}
                boxShadow={msg.type === 'system' ? '0 0 10px rgba(128, 90, 213, 0.5)' : 'none'}
              />
              <Box flex={1} ml={2}>
                <HStack spacing={2} align="baseline">
                  <Text
                    fontWeight="bold"
                    fontSize="sm"
                    color={msg.type === 'system' ? 'purple.300' : 'white'}
                    className={msg.type === 'system' ? 'glow-text' : ''}
                  >
                    {msg.username}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    {formatTime(msg.timestamp)}
                  </Text>
                  {msg.type === 'system' && (
                    <Badge colorScheme="purple" fontSize="xx-small" boxShadow="0 0 8px rgba(128, 90, 213, 0.5)">
                      SYSTEM
                    </Badge>
                  )}
                </HStack>
                <Text fontSize="sm" mt={1} color={msg.type === 'system' ? 'purple.200' : 'gray.200'}>
                  {msg.content}
                </Text>
              </Box>
            </HStack>
          ))}
          <div ref={messagesEndRef} />
        </Box>
      </Flex>

      {/* Input Area */}
      <Box w="100%" p={3} bg="gray.900" borderTop="2px solid" borderColor="purple.700" boxShadow="0 -5px 20px rgba(128, 90, 213, 0.2)">
        <InputGroup size="lg">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message #study-group (${members.length} members online)`}
            bg="gray.800"
            borderColor="purple.600"
            borderWidth="2px"
            _focus={{
              borderColor: 'purple.400',
              boxShadow: '0 0 0 3px rgba(128, 90, 213, 0.2)',
            }}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            _placeholder={{ color: 'gray.400' }}
          />
          <InputRightElement width="auto" mr={1}>
            <HStack spacing={1}>
              <IconButton
                icon={<Smile size={18} />}
                size="sm"
                variant="ghost"
                aria-label="Emoji"
                _hover={{ bg: 'purple.700', boxShadow: 'glow.purple' }}
              />
              <IconButton
                icon={<Paperclip size={18} />}
                size="sm"
                variant="ghost"
                aria-label="Attach file"
                _hover={{ bg: 'purple.700', boxShadow: 'glow.purple' }}
              />
              <Button
                leftIcon={<Send size={16} />}
                colorScheme="purple"
                size="sm"
                onClick={sendMessage}
                boxShadow="0 0 15px rgba(128, 90, 213, 0.5)"
                _hover={{ boxShadow: 'glow.purple' }}
              >
                Send
              </Button>
            </HStack>
          </InputRightElement>
        </InputGroup>
        <HStack justify="space-between" mt={2}>
          <Text fontSize="xs" color="gray.400">
            Press Enter to send • {members.length} members in voice
          </Text>
          <Badge colorScheme={muted ? 'red' : 'green'} fontSize="xs" boxShadow={muted ? 'glow.red' : '0 0 10px rgba(72, 187, 120, 0.5)'}>
            {muted ? '🔇 Muted' : '🔊 Live'}
          </Badge>
        </HStack>
      </Box>
    </VStack>
  )
}

export default ChatWindow