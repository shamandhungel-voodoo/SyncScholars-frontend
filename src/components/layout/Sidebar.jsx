import {
  Box,
  VStack,
  Text,
  Avatar,
  AvatarGroup,
  Badge,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import {
  Users,
  MessageSquare,
  CheckSquare,
  Gamepad2,
  Settings,
  Clock,
  Trophy,
  BookOpen,
} from 'lucide-react'

const Sidebar = ({ groupId, members, onTabChange, activeTab }) => {
  const tabs = [
    { id: 'timer', icon: <Clock size={20} />, label: 'Timer' },
    { id: 'chat', icon: <MessageSquare size={20} />, label: 'Chat' },
    { id: 'tasks', icon: <CheckSquare size={20} />, label: 'Tasks' },
    { id: 'members', icon: <Users size={20} />, label: 'Members' },
    { id: 'games', icon: <Gamepad2 size={20} />, label: 'Games' },
    { id: 'stats', icon: <Trophy size={20} />, label: 'Stats' },
    { id: 'resources', icon: <BookOpen size={20} />, label: 'Resources' },
  ]

  return (
    <Box
      w="70px"
      bg="gray.900"
      borderRight="1px solid"
      borderColor="gray.800"
      display={{ base: 'none', md: 'flex' }}
      flexDirection="column"
      alignItems="center"
      py={4}
      position="fixed"
      left="0"
      top="64px"
      bottom="0"
      zIndex="900"
    >
      {/* Study Group Badge */}
      <VStack spacing={2} mb={8}>
        <Box
          w="48px"
          h="48px"
          bg="discord.500"
          borderRadius="12px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          _hover={{ transform: 'scale(1.05)' }}
          transition="transform 0.2s"
        >
          <Text fontWeight="bold" fontSize="lg">
            {groupId?.slice(0, 2).toUpperCase() || 'SG'}
          </Text>
        </Box>
        <Badge colorScheme="green" fontSize="xs">
          Active
        </Badge>
      </VStack>

      {/* Navigation Tabs */}
      <VStack spacing={4} flex="1">
        {tabs.map((tab) => (
          <Tooltip key={tab.id} label={tab.label} placement="right" hasArrow>
            <IconButton
              icon={tab.icon}
              aria-label={tab.label}
              variant="ghost"
              w="48px"
              h="48px"
              borderRadius="12px"
              bg={activeTab === tab.id ? 'discord.500' : 'transparent'}
              color={activeTab === tab.id ? 'white' : 'gray.400'}
              _hover={{
                bg: activeTab === tab.id ? 'discord.600' : 'gray.800',
                color: 'white',
              }}
              onClick={() => onTabChange(tab.id)}
            />
          </Tooltip>
        ))}
      </VStack>

      {/* Online Members */}
      <VStack spacing={3} mt="auto" pt={4}>
        <AvatarGroup size="sm" max={3}>
          {members?.slice(0, 3).map((member) => (
            <Avatar
              key={member.id}
              name={member.name}
              src={member.avatar}
              borderColor="gray.900"
            />
          ))}
        </AvatarGroup>
        <Text fontSize="xs" color="gray.400">
          {members?.length || 0} online
        </Text>
      </VStack>
    </Box>
  )
}

export default Sidebar