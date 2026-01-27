import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Badge,
  Card,
  CardBody,
  Flex,
  Button,
  IconButton,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  AvatarGroup,
  useToast,
} from '@chakra-ui/react'
import {
  Search,
  MessageSquare,
  Users,
  Star,
  Pin,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Clock,
  Check,
  CheckCheck,
  Video,
  Phone,
  Info,
  Shield,
  UserPlus,
  Settings,
  Trash2,
  Archive,
  Ban,
  User,
} from 'lucide-react'


const Messages = ({ user }) => {
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [messageInput, setMessageInput] = useState('')
  const [messages, setMessages] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const toast = useToast()

  useEffect(() => {
    // Demo conversations
    const demoConversations = [
      {
        id: '1',
        name: 'Web Dev Study Group',
        type: 'group',
        members: 8,
        unread: 3,
        lastMessage: 'Taylor: Can someone review my React code?',
        time: '2 min ago',
        avatar: '👨‍💻',
        online: true,
        pinned: true,
        muted: false,
      },
      {
        id: '2',
        name: 'Alex Johnson',
        type: 'dm',
        unread: 0,
        lastMessage: 'Thanks for helping with the useEffect hook!',
        time: '1 hour ago',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        online: true,
        pinned: false,
        muted: false,
      },
      {
        id: '3',
        name: 'Data Science Squad',
        type: 'group',
        members: 12,
        unread: 15,
        lastMessage: 'Morgan: New dataset uploaded for ML project',
        time: '3 hours ago',
        avatar: '📊',
        online: true,
        pinned: true,
        muted: false,
      },
      {
        id: '4',
        name: 'Taylor Swift',
        type: 'dm',
        unread: 0,
        lastMessage: 'Meeting tomorrow at 2 PM EST',
        time: '1 day ago',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
        online: false,
        pinned: false,
        muted: true,
      },
      {
        id: '5',
        name: 'Math Study Group',
        type: 'group',
        members: 6,
        unread: 0,
        lastMessage: 'Homework due Friday',
        time: '2 days ago',
        avatar: '🧮',
        online: true,
        pinned: false,
        muted: false,
      },
    ]

    // Demo messages for active conversation
    const demoMessages = [
      {
        id: '1',
        sender: 'Alex',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        message: 'Hey everyone! Ready for our study session?',
        time: '10:30 AM',
        read: true,
        type: 'text',
      },
      {
        id: '2',
        sender: 'Taylor',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
        message: 'Yes! I just finished the React tutorial',
        time: '10:32 AM',
        read: true,
        type: 'text',
      },
      {
        id: '3',
        sender: 'You',
        avatar: user?.profilePicture,
        message: 'Great! Let me share my screen and we can go through the components',
        time: '10:33 AM',
        read: true,
        type: 'text',
      },
      {
        id: '4',
        sender: 'Jordan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
        message: 'Anyone having trouble with useState?',
        time: '10:35 AM',
        read: true,
        type: 'text',
      },
      {
        id: '5',
        sender: 'Alex',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        message: 'I can help! Just finished that section',
        time: '10:36 AM',
        read: true,
        type: 'text',
      },
    ]

    setConversations(demoConversations)
    setMessages(demoMessages)
    setActiveConversation(demoConversations[0])
  }, [user])

  const sendMessage = () => {
    if (!messageInput.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      sender: 'You',
      avatar: user?.profilePicture,
      message: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'text',
    }

    setMessages([...messages, newMessage])
    setMessageInput('')

    // Update conversation
    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversation.id
          ? {
              ...conv,
              lastMessage: `You: ${messageInput}`,
              time: 'Just now',
              unread: 0,
            }
          : conv
      )
    )
  }

  const startVideoCall = () => {
    toast({
      title: 'Starting video call...',
      description: 'Connecting to WebRTC server',
      status: 'info',
      duration: 3000,
      position: 'top',
    })
  }

  const startVoiceCall = () => {
    toast({
      title: 'Starting voice call...',
      description: 'Connecting to voice channel',
      status: 'info',
      duration: 3000,
      position: 'top',
    })
  }

  const toggleMuteConversation = (conversationId) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId ? { ...conv, muted: !conv.muted } : conv
      )
    )
    toast({
      title: conversations.find(c => c.id === conversationId)?.muted
        ? 'Conversation unmuted'
        : 'Conversation muted',
      status: 'info',
      duration: 2000,
      position: 'top',
    })
  }

  const togglePinConversation = (conversationId) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId ? { ...conv, pinned: !conv.pinned } : conv
      )
    )
  }

  const filteredConversations = conversations.filter(
    conv =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Conversation Item Component
  const ConversationItem = ({ conversation, isActive, onClick, onMute, onPin }) => {
    return (
      <Box
        p={3}
        borderRadius="lg"
        bg={isActive ? 'purple.900' : 'transparent'}
        border="1px solid"
        borderColor={isActive ? 'purple.600' : 'transparent'}
        cursor="pointer"
        _hover={{ bg: 'gray.800' }}
        onClick={onClick}
        transition="all 0.2s"
        position="relative"
      >
        <HStack spacing={3}>
          {conversation.type === 'group' ? (
            <Box
              w="40px"
              h="40px"
              bg="purple.700"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="lg"
              boxShadow="0 0 10px rgba(128, 90, 213, 0.5)"
            >
              {conversation.avatar}
            </Box>
          ) : (
            <Avatar
              size="md"
              name={conversation.name}
              src={conversation.avatar}
              border="2px solid"
              borderColor={conversation.online ? 'green.500' : 'gray.600'}
              boxShadow={conversation.online ? '0 0 10px rgba(72, 187, 120, 0.5)' : 'none'}
            />
          )}
          <Box flex={1}>
            <HStack justify="space-between" mb={1}>
              <Text fontWeight="medium" noOfLines={1}>
                {conversation.name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {conversation.time}
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.400" noOfLines={1}>
                {conversation.lastMessage}
              </Text>
              {conversation.unread > 0 && (
                <Badge
                  colorScheme="red"
                  borderRadius="full"
                  minW="5"
                  h="5"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 0 8px rgba(245, 101, 101, 0.5)"
                >
                  {conversation.unread}
                </Badge>
              )}
            </HStack>
          </Box>
        </HStack>
        
        {/* Conversation Actions */}
        <HStack spacing={1} mt={2} justifyContent="flex-end">
          {conversation.pinned && (
            <Pin size={12} color="#D69E2E" />
          )}
          {conversation.muted && (
            <BellOff size={12} color="#718096" />
          )}
        </HStack>
      </Box>
    )
  }

  return (
    <Box minH="calc(100vh - 64px)" bg="gray.950">
      <Container maxW="container.xl" py={8}>
        <Card 
          h="calc(100vh - 120px)"
          bg="gray.900"
          border="1px solid"
          borderColor="purple.800"
          boxShadow="0 0 30px rgba(128, 90, 213, 0.2)"
        >
          <CardBody p={0}>
            <Flex h="full">
              {/* Sidebar - Conversations List */}
              <Box
                w="350px"
                borderRight="1px solid"
                borderColor="purple.800"
                bg="gray.900"
                display={{ base: activeConversation ? 'none' : 'block', md: 'block' }}
              >
                {/* Header */}
                <Box p={4} borderBottom="1px solid" borderColor="purple.800">
                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="xl" fontWeight="bold" color="white">
                        Messages
                      </Text>
                      <Badge colorScheme="purple" boxShadow="0 0 8px rgba(128, 90, 213, 0.5)">
                        {conversations.filter(c => c.unread > 0).length} unread
                      </Badge>
                    </HStack>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Search size={16} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        bg="gray.800"
                        borderColor="purple.600"
                        _focus={{ borderColor: 'purple.400' }}
                        color="white"
                      />
                    </InputGroup>
                    <HStack spacing={2}>
                      <Button size="sm" variant="outline" colorScheme="purple" w="full">
                        <UserPlus size={14} style={{ marginRight: '6px' }} />
                        New Group
                      </Button>
                      <Button size="sm" variant="outline" colorScheme="green" w="full">
                        <MessageSquare size={14} style={{ marginRight: '6px' }} />
                        New DM
                      </Button>
                    </HStack>
                  </VStack>
                </Box>

                {/* Pinned Conversations */}
                <Box p={4} borderBottom="1px solid" borderColor="gray.800">
                  <Text fontSize="sm" color="gray.400" mb={2} fontWeight="medium">
                    <Pin size={12} style={{ marginRight: '6px', display: 'inline' }} />
                    PINNED
                  </Text>
                  <VStack spacing={2} align="stretch">
                    {filteredConversations
                      .filter(conv => conv.pinned)
                      .map((conv) => (
                        <ConversationItem
                          key={conv.id}
                          conversation={conv}
                          isActive={activeConversation?.id === conv.id}
                          onClick={() => setActiveConversation(conv)}
                          onMute={() => toggleMuteConversation(conv.id)}
                          onPin={() => togglePinConversation(conv.id)}
                        />
                      ))}
                  </VStack>
                </Box>

                {/* All Conversations */}
                <Box p={4} flex={1} overflowY="auto">
                  <Text fontSize="sm" color="gray.400" mb={2} fontWeight="medium">
                    ALL MESSAGES
                  </Text>
                  <VStack spacing={2} align="stretch">
                    {filteredConversations
                      .filter(conv => !conv.pinned)
                      .map((conv) => (
                        <ConversationItem
                          key={conv.id}
                          conversation={conv}
                          isActive={activeConversation?.id === conv.id}
                          onClick={() => setActiveConversation(conv)}
                          onMute={() => toggleMuteConversation(conv.id)}
                          onPin={() => togglePinConversation(conv.id)}
                        />
                      ))}
                  </VStack>
                </Box>
              </Box>

              {/* Main Chat Area */}
              <Box flex={1} display="flex" flexDirection="column">
                {activeConversation ? (
                  <>
                    {/* Chat Header */}
                    <Box
                      p={4}
                      borderBottom="1px solid"
                      borderColor="purple.800"
                      bg="gray.900"
                    >
                      <HStack justify="space-between">
                        <HStack spacing={3}>
                          {activeConversation.type === 'group' ? (
                            <Box
                              w="40px"
                              h="40px"
                              bg="purple.700"
                              borderRadius="lg"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              fontSize="lg"
                              boxShadow="0 0 15px rgba(128, 90, 213, 0.5)"
                            >
                              {activeConversation.avatar}
                            </Box>
                          ) : (
                            <Avatar
                              size="md"
                              name={activeConversation.name}
                              src={activeConversation.avatar}
                              border="2px solid"
                              borderColor="purple.500"
                              boxShadow="0 0 15px rgba(128, 90, 213, 0.5)"
                            />
                          )}
                          <VStack align="start" spacing={0}>
                            <HStack>
                              <Text fontWeight="bold" color="white">{activeConversation.name}</Text>
                              {activeConversation.online && (
                                <Badge
                                  colorScheme="green"
                                  fontSize="xx-small"
                                  boxShadow="0 0 8px rgba(72, 187, 120, 0.5)"
                                >
                                  online
                                </Badge>
                              )}
                            </HStack>
                            {activeConversation.type === 'group' ? (
                              <Text fontSize="sm" color="gray.400">
                                {activeConversation.members} members
                              </Text>
                            ) : (
                              <Text fontSize="sm" color="gray.400">
                                {activeConversation.online ? 'Active now' : 'Last seen 2h ago'}
                              </Text>
                            )}
                          </VStack>
                        </HStack>
                        <HStack spacing={2}>
                          <IconButton
                            icon={activeConversation.muted ? <BellOff /> : <Bell />}
                            variant="ghost"
                            aria-label="Mute"
                            onClick={() => toggleMuteConversation(activeConversation.id)}
                            colorScheme={activeConversation.muted ? 'red' : 'gray'}
                            color="white"
                          />
                          <IconButton
                            icon={<Phone />}
                            variant="ghost"
                            aria-label="Voice call"
                            onClick={startVoiceCall}
                            _hover={{ bg: 'green.800', boxShadow: '0 0 15px rgba(72, 187, 120, 0.5)' }}
                            color="white"
                          />
                          <IconButton
                            icon={<Video />}
                            variant="ghost"
                            aria-label="Video call"
                            onClick={startVideoCall}
                            _hover={{ bg: 'blue.800', boxShadow: '0 0 15px rgba(66, 153, 225, 0.5)' }}
                            color="white"
                          />
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<MoreVertical />}
                              variant="ghost"
                              aria-label="More options"
                              color="white"
                            />
                            <MenuList bg="gray.800" borderColor="purple.700">
                              <MenuItem 
                                icon={<Info size={14} />}
                                bg="gray.800"
                                _hover={{ bg: 'gray.700' }}
                                color="white"
                              >
                                View Info
                              </MenuItem>
                              <MenuItem 
                                icon={<Users size={14} />}
                                bg="gray.800"
                                _hover={{ bg: 'gray.700' }}
                                color="white"
                              >
                                View Members
                              </MenuItem>
                              <MenuItem 
                                icon={<Settings size={14} />}
                                bg="gray.800"
                                _hover={{ bg: 'gray.700' }}
                                color="white"
                              >
                                Settings
                              </MenuItem>
                              <MenuDivider borderColor="gray.700" />
                              <MenuItem 
                                icon={activeConversation.muted ? <Bell size={14} /> : <BellOff size={14} />}
                                bg="gray.800"
                                _hover={{ bg: 'gray.700' }}
                                color="white"
                                onClick={() => toggleMuteConversation(activeConversation.id)}
                              >
                                {activeConversation.muted ? 'Unmute' : 'Mute'}
                              </MenuItem>
                              <MenuItem 
                                icon={<Pin size={14} />}
                                bg="gray.800"
                                _hover={{ bg: 'gray.700' }}
                                color="white"
                                onClick={() => togglePinConversation(activeConversation.id)}
                              >
                                {activeConversation.pinned ? 'Unpin' : 'Pin'}
                              </MenuItem>
                              <MenuDivider borderColor="gray.700" />
                              <MenuItem 
                                icon={<Archive size={14} />}
                                bg="gray.800"
                                _hover={{ bg: 'gray.700' }}
                                color="white"
                              >
                                Archive
                              </MenuItem>
                              <MenuItem 
                                icon={<Ban size={14} />} 
                                color="red.400"
                                bg="gray.800"
                                _hover={{ bg: 'gray.700' }}
                              >
                                Block
                              </MenuItem>
                              <MenuItem 
                                icon={<Trash2 size={14} />} 
                                color="red.400"
                                bg="gray.800"
                                _hover={{ bg: 'gray.700' }}
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </HStack>
                      </HStack>
                    </Box>

                    {/* Messages Container */}
                    <Box flex={1} p={4} overflowY="auto" bg="gray.950/50">
                      <VStack spacing={4} align="stretch">
                        {messages.map((msg) => (
                          <HStack
                            key={msg.id}
                            spacing={3}
                            align="start"
                            justifyContent={msg.sender === 'You' ? 'flex-end' : 'flex-start'}
                          >
                            {msg.sender !== 'You' && (
                              <Avatar
                                size="sm"
                                name={msg.sender}
                                src={msg.avatar}
                              />
                            )}
                            <Box
                              maxW="70%"
                              bg={msg.sender === 'You' ? 'purple.800' : 'gray.800'}
                              borderRadius="lg"
                              p={3}
                              border="1px solid"
                              borderColor={msg.sender === 'You' ? 'purple.600' : 'gray.700'}
                              boxShadow={msg.sender === 'You' ? '0 0 15px rgba(128, 90, 213, 0.3)' : 'none'}
                            >
                              {msg.sender !== 'You' && (
                                <Text fontSize="xs" fontWeight="bold" color="purple.300" mb={1}>
                                  {msg.sender}
                                </Text>
                              )}
                              <Text fontSize="sm" color="white">{msg.message}</Text>
                              <HStack justify="space-between" mt={2}>
                                <Text fontSize="xs" color="gray.500">
                                  {msg.time}
                                </Text>
                                {msg.sender === 'You' && (
                                  msg.read ? (
                                    <CheckCheck size={12} color="#48BB78" />
                                  ) : (
                                    <Check size={12} color="#718096" />
                                  )
                                )}
                              </HStack>
                            </Box>
                            {msg.sender === 'You' && (
                              <Avatar
                                size="sm"
                                name="You"
                                src={msg.avatar}
                              />
                            )}
                          </HStack>
                        ))}
                      </VStack>
                    </Box>

                    {/* Message Input */}
                    <Box
                      p={4}
                      borderTop="1px solid"
                      borderColor="purple.800"
                      bg="gray.900"
                    >
                      <HStack spacing={3}>
                        <IconButton
                          icon={<Paperclip />}
                          variant="ghost"
                          aria-label="Attach file"
                          _hover={{ bg: 'purple.800', boxShadow: '0 0 15px rgba(128, 90, 213, 0.5)' }}
                          color="white"
                        />
                        <Input
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          placeholder={`Message ${activeConversation.name}...`}
                          bg="gray.800"
                          borderColor="purple.600"
                          _focus={{ borderColor: 'purple.400' }}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          color="white"
                        />
                        <IconButton
                          icon={<Smile />}
                          variant="ghost"
                          aria-label="Emoji"
                          _hover={{ bg: 'purple.800', boxShadow: '0 0 15px rgba(128, 90, 213, 0.5)' }}
                          color="white"
                        />
                        <Button
                          colorScheme="purple"
                          leftIcon={<Send size={16} />}
                          onClick={sendMessage}
                          boxShadow="0 0 15px rgba(128, 90, 213, 0.5)"
                          _hover={{ boxShadow: '0 0 20px rgba(128, 90, 213, 0.8)' }}
                        >
                          Send
                        </Button>
                      </HStack>
                    </Box>
                  </>
                ) : (
                  <Box
                    flex={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={8}
                  >
                    <VStack spacing={4} textAlign="center">
                      <MessageSquare size={64} color="#805ad5" opacity={0.5} />
                      <Text fontSize="xl" fontWeight="bold" color="white">
                        Select a conversation
                      </Text>
                      <Text color="gray.400" maxW="400px">
                        Choose a conversation from the sidebar to start messaging, or create a new one
                      </Text>
                      <Button
                        colorScheme="purple"
                        leftIcon={<MessageSquare size={16} />}
                        boxShadow="0 0 15px rgba(128, 90, 213, 0.5)"
                        _hover={{ boxShadow: '0 0 20px rgba(128, 90, 213, 0.8)' }}
                        onClick={() =>
                          toast({
                            title: 'New conversation',
                            description: 'Feature coming soon!',
                            status: 'info',
                            duration: 3000,
                          })
                        }
                      >
                        Start New Conversation
                      </Button>
                    </VStack>
                  </Box>
                )}
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </Container>
    </Box>
  )
}

export default Messages