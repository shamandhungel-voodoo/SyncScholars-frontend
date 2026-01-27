import { useState, useEffect } from 'react'
import {
  Container,
  Card,
  CardBody,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Input,
  InputGroup,
  InputRightElement,
  Avatar,
  Heading,
  Box,
  useToast,
  SimpleGrid,
  Progress,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  AvatarBadge,
  Divider,
} from '@chakra-ui/react'
import {
  Copy,
  Users,
  Plus,
  Clock,
  Trophy,
  ArrowRight,
  BarChart3,
  BookOpen,
  MoreVertical,
  Bell,
  TrendingUp,
  Zap,
  Target,
  Flame,
  Crown,
  Star,
  Volume2,
  ScreenShare,
  Book,
  Settings,
  LogOut,
  Headphones,
  Mic,
  Video,
  ChevronRight,
  Sparkles,
  Gamepad2,
  MessageSquare,
  Award,
  CheckCircle,
  Target as TargetIcon,
  UserPlus,
  Calculator,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({ user }) => {
  const navigate = useNavigate()
  const toast = useToast()
  const [groupCode, setGroupCode] = useState('WEBDEV')
  const [groups, setGroups] = useState([])

  // Extract color scheme from Messages component
  const colors = {
    background: 'gray.950',
    cardBackground: 'gray.900',
    cardBorder: 'purple.800',
    cardShadow: '0 0 30px rgba(128, 90, 213, 0.2)',
    primaryText: 'white',
    secondaryText: 'gray.400',
    accentText: 'purple.300',
    buttonBg: 'purple.800',
    buttonHover: 'purple.700',
    buttonShadow: '0 0 15px rgba(128, 90, 213, 0.5)',
    buttonHoverShadow: '0 0 20px rgba(128, 90, 213, 0.8)',
    inputBg: 'gray.800',
    inputBorder: 'purple.600',
    inputFocus: 'purple.400',
    badgeGreen: 'green.500',
    badgeRed: 'red.500',
    onlineGreen: 'green.400',
    progressBg: 'purple.700',
    progressFill: '#805ad5',
  }

  // Button style matching Messages component
  const buttonStyle = {
    bg: colors.buttonBg,
    color: 'white',
    border: '1px solid',
    borderColor: colors.cardBorder,
    _hover: {
      bg: colors.buttonHover,
      boxShadow: colors.buttonHoverShadow,
      transform: 'translateY(-2px)',
    },
    _active: {
      transform: 'translateY(0)',
    },
    boxShadow: colors.buttonShadow,
  }

  // Badge style
  const badgeStyle = {
    bg: 'purple.800',
    color: 'white',
    border: '1px solid',
    borderColor: colors.cardBorder,
    boxShadow: '0 0 8px rgba(128, 90, 213, 0.5)',
  }

  // Card style
  const cardStyle = {
    bg: colors.cardBackground,
    border: '1px solid',
    borderColor: colors.cardBorder,
    boxShadow: colors.cardShadow,
  }

  useEffect(() => {
    // Mock data
    setGroups([
      {
        id: 'webdev',
        name: 'Web Dev Masters',
        members: 8,
        active: true,
        focusTime: '2h 30m',
        description: 'Learning React & Node.js',
        avatarColor: 'blue.500',
        level: 3,
        progress: 75,
        online: 5,
      },
      {
        id: 'datascience',
        name: 'Data Science Squad',
        members: 12,
        active: true,
        focusTime: '4h 15m',
        description: 'ML & Statistics study group',
        avatarColor: 'green.500',
        level: 5,
        progress: 45,
        online: 8,
      },
      {
        id: 'medschool',
        name: 'Med School Warriors',
        members: 6,
        active: false,
        focusTime: '1h 45m',
        description: 'Anatomy & Physiology',
        avatarColor: 'red.500',
        level: 2,
        progress: 90,
        online: 0,
      },
      {
        id: 'math',
        name: 'Math Geniuses',
        members: 10,
        active: true,
        focusTime: '3h 20m',
        description: 'Calculus & Linear Algebra',
        avatarColor: 'purple.500',
        level: 4,
        progress: 60,
        online: 7,
        avatarEmoji: '🧮', // Math abacus emoji
      },
    ])
  }, [])

  const stats = [
    {
      icon: <Clock color={colors.accentText} />,
      label: 'Total Focus',
      value: '25h 30m',
      change: '+12%',
      color: 'blue',
      progress: 75,
    },
    {
      icon: <Trophy color={colors.accentText} />,
      label: 'Current Streak',
      value: '7 days',
      change: '+2',
      color: 'green',
      progress: 100,
    },
    {
      icon: <Users color={colors.accentText} />,
      label: 'Sessions',
      value: '42',
      change: '+8',
      color: 'purple',
      progress: 60,
    },
    {
      icon: <BarChart3 color={colors.accentText} />,
      label: 'Productivity',
      value: '86%',
      change: '+5%',
      color: 'orange',
      progress: 86,
    },
  ]

  const copyGroupCode = () => {
    navigator.clipboard.writeText(groupCode)
    toast({
      title: '✅ Code Copied!',
      description: 'Share the code with your study buddies',
      status: 'success',
      duration: 2000,
      position: 'top',
      isClosable: true,
    })
  }

  const handleJoinGroup = () => {
    if (groupCode.trim()) {
      toast({
        title: '🎉 Joining Group!',
        description: `Connecting to ${groupCode} study group...`,
        status: 'info',
        duration: 2000,
        position: 'top',
        isClosable: true,
      })
      setTimeout(() => {
        navigate(`/study/${groupCode}`)
      }, 1000)
    }
  }

  const handleCreateGroup = () => {
    toast({
      title: '🚀 Creating New Group!',
      description: 'Setting up your study space...',
      status: 'info',
      duration: 2000,
      position: 'top',
      isClosable: true,
    })
    setTimeout(() => {
      navigate('/study/NEW')
    }, 1000)
  }

  // Find Math Genius group to match the style
  const mathGeniusGroup = groups.find(g => g.id === 'math')

  return (
    <Box 
      minH="100vh" 
      bg={colors.background}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl" py={8} position="relative" zIndex="1">
        <VStack spacing={8} align="stretch">
          {/* Header with User Info - MATCHING MATH GENIUS STYLE */}
          <Flex 
            justify="space-between" 
            align="center" 
            {...cardStyle}
            p={6}
            borderRadius="lg"
          >
            <HStack spacing={4}>
              {/* Updated Avatar to match Math Genius style */}
              <Box
                w="60px"
                h="60px"
                bg="purple.700"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="2xl"
                boxShadow="0 0 20px rgba(128, 90, 213, 0.6)"
                position="relative"
                overflow="hidden"
                border="2px solid"
                borderColor="purple.500"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                  transform: 'rotate(45deg)',
                  animation: 'shine 2s infinite',
                }}
              >
                {/* Math Genius style: Using calculator emoji */}
                <Calculator size={32} color="#e0e0e0" />
              </Box>
              <VStack align="start" spacing={1}>
                <HStack>
                  <Heading size="lg" color={colors.primaryText}>
                    Alex Johnson
                  </Heading>
                  <Badge 
                    {...badgeStyle}
                    fontSize="xs"
                    px={2}
                    py={1}
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <Crown size={10} /> MATH GENIUS
                  </Badge>
                </HStack>
                <Text color={colors.secondaryText} fontWeight="medium" fontSize="sm">
                  Mathematics • Level 12 • Top 1%
                </Text>
                <HStack spacing={2} align="center">
                  <Box w="120px" bg={colors.progressBg} borderRadius="full" h={2}>
                    <Box 
                      w="92%" 
                      bg="linear-gradient(90deg, #805ad5, #9f7aea)" 
                      h="100%" 
                      borderRadius="full"
                      boxShadow="0 0 10px rgba(128, 90, 213, 0.7)"
                      position="relative"
                      overflow="hidden"
                    />
                  </Box>
                  <Text fontSize="sm" color={colors.accentText} fontWeight="bold">92%</Text>
                </HStack>
              </VStack>
            </HStack>
            <HStack spacing={3}>
              <IconButton
                aria-label="Notifications"
                icon={<Bell color="white" size={20} />}
                variant="ghost"
                colorScheme="whiteAlpha"
                size="lg"
                _hover={{
                  bg: 'purple.800',
                  transform: 'scale(1.1)',
                }}
              />
              <Menu>
                <MenuButton
                  as={Button}
                  {...buttonStyle}
                  size="md"
                  rightIcon={<MoreVertical size={18} />}
                >
                  Menu
                </MenuButton>
                <MenuList 
                  bg={colors.cardBackground} 
                  border="1px solid"
                  borderColor={colors.cardBorder}
                  boxShadow={colors.cardShadow}
                >
                  <MenuItem bg={colors.cardBackground} _hover={{ bg: 'purple.800' }} icon={<Settings size={16} color={colors.accentText} />}>
                    Settings
                  </MenuItem>
                  <MenuItem bg={colors.cardBackground} _hover={{ bg: 'purple.800' }} icon={<Calculator size={16} color={colors.accentText} />}>
                    Math Tools
                  </MenuItem>
                  <MenuItem bg={colors.cardBackground} _hover={{ bg: 'purple.800' }} icon={<Award size={16} color={colors.accentText} />}>
                    Math Achievements
                  </MenuItem>
                  <MenuItem bg={colors.cardBackground} _hover={{ bg: 'purple.800' }} icon={<LogOut size={16} color={colors.accentText} />}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>

          {/* JOIN STUDY GROUP SECTION */}
          <Card 
            {...cardStyle}
            _hover={{
              transform: 'translateY(-4px)',
              boxShadow: '0 25px 50px rgba(128, 90, 213, 0.3)',
            }}
            transition="all 0.3s"
          >
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <HStack spacing={3}>
                    <Box
                      p={3}
                      bg="purple.800"
                      borderRadius="lg"
                      boxShadow="0 5px 20px rgba(128, 90, 213, 0.3)"
                    >
                      <UserPlus size={24} color={colors.accentText} />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Heading size="md" color={colors.primaryText}>
                        Join Study Group
                      </Heading>
                      <Text color={colors.secondaryText} fontSize="sm">
                        Enter a group code to join your classmates
                      </Text>
                    </VStack>
                  </HStack>
                  <Badge 
                    {...badgeStyle}
                    fontSize="sm"
                    px={3}
                    py={1}
                  >
                    <Sparkles size={12} style={{ marginRight: '4px' }} />
                    ACTIVE
                  </Badge>
                </HStack>

                <Divider borderColor="purple.700" />

                <VStack spacing={4} align="stretch">
                  <Text color={colors.primaryText} fontWeight="medium">
                    Enter Group Code
                  </Text>
                  
                  <InputGroup size="lg">
                    <Input
                      value={groupCode}
                      onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
                      placeholder="Enter group code (e.g., MATH101)"
                      bg={colors.inputBg}
                      border="1px solid"
                      borderColor={colors.inputBorder}
                      color={colors.primaryText}
                      fontWeight="bold"
                      fontSize="lg"
                      _placeholder={{ color: colors.secondaryText, fontWeight: 'normal' }}
                      _focus={{
                        borderColor: colors.inputFocus,
                        boxShadow: '0 0 0 1px rgba(128, 90, 213, 0.5)',
                      }}
                    />
                    <InputRightElement width="4.5rem" mr={2}>
                      <IconButton
                        aria-label="Copy code"
                        size="sm"
                        icon={<Copy color={colors.accentText} />}
                        onClick={copyGroupCode}
                        bg={colors.inputBg}
                        border="1px solid"
                        borderColor={colors.inputBorder}
                        _hover={{
                          bg: colors.buttonHover,
                          transform: 'scale(1.1)',
                        }}
                      />
                    </InputRightElement>
                  </InputGroup>

                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                    <Button
                      {...buttonStyle}
                      size="lg"
                      height="60px"
                      fontSize="lg"
                      onClick={handleJoinGroup}
                      rightIcon={<ArrowRight size={20} />}
                    >
                      Join Now
                    </Button>
                    <Button
                      {...buttonStyle}
                      size="lg"
                      height="60px"
                      fontSize="lg"
                      variant="outline"
                      borderColor="purple.600"
                      onClick={handleCreateGroup}
                      leftIcon={<Plus size={20} />}
                    >
                      Create New
                    </Button>
                  </SimpleGrid>

                  <HStack spacing={3} pt={2}>
                    <Text fontSize="sm" color={colors.secondaryText}>
                      Popular groups:
                    </Text>
                    <HStack spacing={2}>
                      {['MATH101', 'CALCULUS', 'ALGEBRA'].map((code) => (
                        <Badge
                          key={code}
                          bg="purple.800"
                          color="white"
                          px={3}
                          py={1}
                          borderRadius="md"
                          cursor="pointer"
                          _hover={{
                            bg: 'purple.700',
                            transform: 'translateY(-1px)',
                          }}
                          onClick={() => setGroupCode(code)}
                        >
                          {code}
                        </Badge>
                      ))}
                    </HStack>
                  </HStack>
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Stats Grid - Math Focused */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {[
              {
                icon: <Calculator color={colors.accentText} />,
                label: 'Math Hours',
                value: '48h 15m',
                change: '+18%',
                color: 'purple',
                progress: 85,
              },
              {
                icon: <Trophy color={colors.accentText} />,
                label: 'Problem Solved',
                value: '1,248',
                change: '+156',
                color: 'green',
                progress: 100,
              },
              {
                icon: <TrendingUp color={colors.accentText} />,
                label: 'Accuracy',
                value: '94%',
                change: '+3%',
                color: 'purple',
                progress: 94,
              },
              {
                icon: <BarChart3 color={colors.accentText} />,
                label: 'Peer Rank',
                value: 'Top 1%',
                change: '+2',
                color: 'orange',
                progress: 99,
              },
            ].map((stat, i) => (
              <Card 
                key={i} 
                {...cardStyle}
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: '0 25px 50px rgba(128, 90, 213, 0.3)',
                }}
                transition="all 0.3s"
              >
                <CardBody>
                  <VStack spacing={3} align="start">
                    <HStack justify="space-between" w="full">
                      <Box 
                        p={3} 
                        bg="purple.800" 
                        borderRadius="lg"
                        boxShadow="0 5px 15px rgba(128, 90, 213, 0.3)"
                      >
                        {stat.icon}
                      </Box>
                      <Badge 
                        bg="green.900"
                        color="green.300"
                        fontWeight="bold"
                        fontSize="xs"
                        px={2}
                        py={1}
                        border="1px solid"
                        borderColor="green.700"
                      >
                        {stat.change}
                      </Badge>
                    </HStack>
                    <Text fontSize="2xl" fontWeight="bold" color={colors.primaryText}>
                      {stat.value}
                    </Text>
                    <Text color={colors.secondaryText} fontSize="sm" fontWeight="medium">
                      {stat.label}
                    </Text>
                    <Progress
                      value={stat.progress}
                      colorScheme="purple"
                      size="sm"
                      borderRadius="full"
                      w="full"
                      bg="purple.800"
                      sx={{
                        '& > div': {
                          background: colors.progressFill,
                          boxShadow: '0 2px 10px rgba(128, 90, 213, 0.5)',
                        }
                      }}
                    />
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* Quick Actions - Math Focused */}
          <HStack spacing={4} wrap="wrap" justify="center">
            <Button
              leftIcon={<Calculator size={18} color={colors.accentText} />}
              {...buttonStyle}
              size="md"
            >
              Math Tools
            </Button>
            <Button
              leftIcon={<BookOpen size={18} color={colors.accentText} />}
              {...buttonStyle}
              size="md"
            >
              Textbooks
            </Button>
            <Button
              leftIcon={<TrendingUp size={18} color={colors.accentText} />}
              {...buttonStyle}
              size="md"
            >
              Practice Tests
            </Button>
            <Button
              leftIcon={<Video size={18} color={colors.accentText} />}
              {...buttonStyle}
              size="md"
            >
              Tutorials
            </Button>
            <Button
              leftIcon={<Users size={18} color={colors.accentText} />}
              {...buttonStyle}
              size="md"
            >
              Study Partners
            </Button>
          </HStack>

          {/* Active Groups Section */}
          <VStack spacing={4} align="stretch">
            <Flex justify="space-between" align="center">
              <Heading size="xl" color={colors.primaryText}>
                Your Study Groups
              </Heading>
              <Badge 
                {...badgeStyle}
                fontSize="md"
                px={3}
                py={1}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Flame size={16} /> {groups.filter(g => g.active).length} Active
              </Badge>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {groups.map((group) => (
                <Card 
                  key={group.id} 
                  {...cardStyle}
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: '0 25px 50px rgba(128, 90, 213, 0.3)',
                  }}
                  transition="all 0.3s"
                >
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Flex justify="space-between" align="start">
                        <HStack spacing={3}>
                          {/* Group Avatar with Math Genius style for Math Genius group */}
                          {group.id === 'math' ? (
                            <Box
                              w="48px"
                              h="48px"
                              bg="purple.700"
                              borderRadius="lg"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              fontSize="xl"
                              boxShadow="0 0 15px rgba(128, 90, 213, 0.5)"
                              border="2px solid"
                              borderColor="purple.500"
                            >
                              🧮
                            </Box>
                          ) : (
                            <Avatar
                              name={group.name}
                              bg={group.avatarColor}
                              color="white"
                              size="md"
                              border="2px solid"
                              borderColor={group.active ? colors.onlineGreen : colors.cardBorder}
                              boxShadow={group.active ? `0 0 15px ${colors.onlineGreen}` : 'none'}
                            >
                              {group.online > 0 && (
                                <AvatarBadge
                                  boxSize="1em"
                                  bg={colors.onlineGreen}
                                  border="2px solid"
                                  borderColor={colors.cardBackground}
                                />
                              )}
                            </Avatar>
                          )}
                          <VStack align="start" spacing={1}>
                            <HStack>
                              <Text fontWeight="bold" color={colors.primaryText}>{group.name}</Text>
                              <Badge 
                                colorScheme={group.active ? "green" : "gray"}
                                fontSize="xs"
                                boxShadow="0 2px 8px rgba(0, 0, 0, 0.2)"
                              >
                                {group.active ? "LIVE" : "OFFLINE"}
                              </Badge>
                            </HStack>
                            <Text fontSize="sm" color={colors.secondaryText}>
                              {group.description}
                            </Text>
                            <HStack spacing={3}>
                              <HStack spacing={1}>
                                <Users size={12} color={colors.accentText} />
                                <Text fontSize="xs" color={colors.secondaryText} fontWeight="medium">
                                  {group.members} members
                                </Text>
                              </HStack>
                              <HStack spacing={1}>
                                <Clock size={12} color={colors.accentText} />
                                <Text fontSize="xs" color={colors.secondaryText} fontWeight="medium">
                                  {group.focusTime}
                                </Text>
                              </HStack>
                            </HStack>
                          </VStack>
                        </HStack>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<MoreVertical color={colors.accentText} />}
                            bg={colors.inputBg}
                            border="1px solid"
                            borderColor={colors.inputBorder}
                            size="sm"
                            _hover={{
                              bg: colors.buttonHover,
                              transform: 'scale(1.1)',
                            }}
                          />
                          <MenuList 
                            bg={colors.cardBackground} 
                            border="1px solid"
                            borderColor={colors.cardBorder}
                            boxShadow={colors.cardShadow}
                          >
                            <MenuItem bg={colors.cardBackground} _hover={{ bg: 'purple.800' }}>Invite Members</MenuItem>
                            <MenuItem bg={colors.cardBackground} _hover={{ bg: 'purple.800' }}>Group Settings</MenuItem>
                            <MenuItem bg={colors.cardBackground} _hover={{ bg: 'purple.800' }}>View Analytics</MenuItem>
                            <MenuItem bg={colors.cardBackground} _hover={{ bg: 'purple.800' }} color="red.400">Leave Group</MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>

                      <VStack spacing={2} align="stretch">
                        <HStack justify="space-between">
                          <Text fontSize="sm" color={colors.secondaryText} fontWeight="medium">Level {group.level}</Text>
                          <Text fontSize="sm" color={colors.primaryText} fontWeight="bold">{group.progress}%</Text>
                        </HStack>
                        <Progress
                          value={group.progress}
                          colorScheme="purple"
                          size="sm"
                          borderRadius="full"
                          bg="purple.800"
                          sx={{
                            '& > div': {
                              background: colors.progressFill,
                              boxShadow: '0 2px 10px rgba(128, 90, 213, 0.5)',
                            }
                          }}
                        />
                      </VStack>

                      <Button
                        rightIcon={<ArrowRight />}
                        {...buttonStyle}
                        size="md"
                        onClick={() => navigate(`/study/${group.id}`)}
                      >
                        {group.id === 'math' ? 'Solve Problems' : 'Enter Study Room'}
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>

          {/* Recent Activity & Achievements */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {/* Recent Activity - Math Focused */}
            <Card {...cardStyle}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <HStack>
                    <Calculator color={colors.accentText} />
                    <Heading size="md" color={colors.primaryText}>Recent Math Activity</Heading>
                  </HStack>
                  {[
                    { action: 'Solved 25 calculus problems in Math Geniuses', time: '2 hours ago', icon: <CheckCircle color="#48bb78" /> },
                    { action: 'Helped 3 peers with linear algebra', time: '1 day ago', icon: <Users color={colors.accentText} /> },
                    { action: 'Achieved perfect score on weekly test', time: '2 days ago', icon: <Trophy color="#d69e2e" /> },
                    { action: 'Shared notes on differential equations', time: '3 days ago', icon: <BookOpen color={colors.accentText} /> },
                    { action: 'Reached Math Master Level 12', time: '4 days ago', icon: <TrendingUp color="#48bb78" /> },
                  ].map((activity, idx) => (
                    <HStack
                      key={idx}
                      py={3}
                      borderBottom={idx < 4 ? '1px solid' : 'none'}
                      borderColor="purple.800"
                    >
                      <Box
                        w="8px"
                        h="8px"
                        bg={colors.progressFill}
                        borderRadius="full"
                        boxShadow={`0 0 10px ${colors.progressFill}`}
                      />
                      <Box color={colors.accentText}>
                        {activity.icon}
                      </Box>
                      <Text flex={1} color={colors.primaryText} fontSize="sm">{activity.action}</Text>
                      <Text color={colors.secondaryText} fontSize="xs" fontWeight="medium">
                        {activity.time}
                      </Text>
                    </HStack>
                  ))}
                  <Button
                    {...buttonStyle}
                    variant="ghost"
                    size="sm"
                    mt={2}
                  >
                    View All Activity
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            {/* Achievements - Math Focused */}
            <Card {...cardStyle}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <HStack>
                    <Trophy color={colors.accentText} />
                    <Heading size="md" color={colors.primaryText}>Math Achievements</Heading>
                  </HStack>
                  <SimpleGrid columns={2} spacing={4}>
                    {[
                      { title: 'Calculus Master', desc: '500+ problems', icon: <Calculator color="white" />, bg: colors.progressFill },
                      { title: 'Math Olympiad', desc: 'Top 10 ranking', icon: <Trophy color="white" />, bg: '#d69e2e' },
                      { title: 'Consistency', desc: '30-day streak', icon: <Flame color="white" />, bg: '#dd6b20' },
                      { title: 'Peer Tutor', desc: 'Helped 50+ peers', icon: <Users color="white" />, bg: '#38a169' },
                    ].map((achievement, idx) => (
                      <VStack
                        key={idx}
                        p={4}
                        bg={colors.cardBackground}
                        borderRadius="lg"
                        border="1px solid"
                        borderColor={colors.cardBorder}
                        textAlign="center"
                        spacing={3}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 25px rgba(128, 90, 213, 0.3)',
                        }}
                        transition="all 0.2s"
                      >
                        <Box
                          p={3}
                          bg={achievement.bg}
                          borderRadius="full"
                          display="inline-flex"
                          boxShadow="0 5px 20px rgba(128, 90, 213, 0.4)"
                        >
                          {achievement.icon}
                        </Box>
                        <Text fontWeight="bold" color={colors.primaryText}>{achievement.title}</Text>
                        <Text fontSize="xs" color={colors.secondaryText}>{achievement.desc}</Text>
                      </VStack>
                    ))}
                  </SimpleGrid>
                  <Button
                    {...buttonStyle}
                    rightIcon={<ChevronRight />}
                    size="md"
                  >
                    View All Achievements
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes shine {
          0% { transform: rotate(45deg) translateX(-100%); }
          100% { transform: rotate(45deg) translateX(100%); }
        }
      `}</style>
    </Box>
  )
}

export default Dashboard