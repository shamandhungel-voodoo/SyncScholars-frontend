import { useState, useEffect, useRef } from 'react'
import {
  Box, VStack, Input, Button, Text, Avatar,
  HStack, IconButton, useToast, Badge
} from '@chakra-ui/react'
import { Send } from 'lucide-react'

const ChatWindow = ({ groupId, currentUser, socket }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)
  const toast = useToast()

  useEffect(() => {
    const demoMessages = [
      { id: '1', userId: 'user1', username: 'Alex', content: 'Welcome! Ready to study?', timestamp: new Date(Date.now() - 3600000) },
      { id: '2', userId: 'user2', username: 'Taylor', content: 'Yes! Let\'s start the timer.', timestamp: new Date(Date.now() - 1800000) },
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
    if (!newMessage.trim() || !currentUser) return

    const msg = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      content: newMessage,
      timestamp: new Date()
    }

    if (socket) {
      socket.emit('send-message', { groupId, ...msg })
    }

    setMessages(prev => [...prev, msg])
    setNewMessage('')
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <VStack spacing={4} h="500px" w="100%">
      <Box w="100%" p={3} bg="white" borderRadius="lg">
        <HStack justify="space-between">
          <Text fontWeight="bold">💬 Group Chat</Text>
          <Badge colorScheme="green">{messages.length} messages</Badge>
        </HStack>
      </Box>

      <Box flex={1} w="100%" bg="white" borderRadius="lg" p={4} overflowY="auto">
        {messages.map(msg => (
          <HStack key={msg.id} mb={3} align="start">
            <Avatar size="sm" name={msg.username} />
            <Box>
              <HStack>
                <Text fontWeight="bold" fontSize="sm">{msg.username}</Text>
                <Text fontSize="xs" color="gray.500">{formatTime(new Date(msg.timestamp))}</Text>
              </HStack>
              <Text fontSize="sm">{msg.content}</Text>
            </Box>
          </HStack>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <HStack w="100%">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <IconButton icon={<Send />} colorScheme="blue" onClick={sendMessage} />
      </HStack>
    </VStack>
  )
}

export default ChatWindow