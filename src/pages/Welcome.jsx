import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Card,
  CardBody,
  SimpleGrid,
  Input,
  InputGroup,
  InputRightElement,
  Avatar,
  AvatarGroup,
  Heading,
  Flex,
  Badge,
  IconButton,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  Clock,
  MessageSquare,
  Trophy,
  BookOpen,
  Gamepad2,
  ChevronRight,
  LogIn,
  UserPlus,
  Sparkles,
  Zap,
  Target,
  Flame,
  Crown,
  Star,
  Volume2,
  ScreenShare,
  Home,
  Book,
  Users as UsersIcon,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  Video,
  Mic,
  Headphones,
  MoreVertical,
} from 'lucide-react'
import { useState } from 'react'

const Welcome = ({ onLogin }) => {
  const navigate = useNavigate()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Silver glow button style configuration
  const silverGlowStyle = {
    bg: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 50%, #a0a0a0 100%)',
    color: 'gray.800',
    border: '2px solid',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '0 0 20px rgba(192, 192, 255, 0.7), 0 4px 6px rgba(0, 0, 0, 0.1)',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    _before: {
      content: '""',
      position: 'absolute',
      top: '-2px',
      left: '-2px',
      right: '-2px',
      bottom: '-2px',
      background: 'linear-gradient(45deg, #a0a0a0, #c0c0c0, #e0e0e0, #c0c0c0, #a0a0a0)',
      borderRadius: 'inherit',
      zIndex: -1,
      opacity: 0.5,
    },
    _hover: {
      bg: 'linear-gradient(135deg, #f0f0f0 0%, #d0d0d0 50%, #b0b0b0 100%)',
      boxShadow: '0 0 30px rgba(192, 192, 255, 0.9), 0 6px 12px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-2px)',
      _before: {
        opacity: 0.7,
      },
    },
    _active: {
      bg: 'linear-gradient(135deg, #d0d0d0 0%, #b0b0b0 50%, #909090 100%)',
      transform: 'translateY(1px)',
    },
    _focus: {
      boxShadow: '0 0 25px rgba(192, 192, 255, 0.8), 0 0 0 3px rgba(192, 192, 255, 0.3)',
    },
  }

  const handleDemoLogin = () => {
    const demoUser = {
      id: 'demo123',
      username: 'DemoUser',
      email: 'demo@studycord.com',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
    }
    onLogin(demoUser)
    toast({
      title: '🎮 Welcome to StudyCord Demo!',
      description: 'Experience the future of collaborative studying',
      status: 'success',
      duration: 3000,
      position: 'top',
      isClosable: true,
    })
    navigate('/dashboard')
  }

  const features = [
    {
      icon: <Clock className="glow-animate" color="#805ad5" />,
      title: 'Sync Timers',
      desc: 'Study together with synchronized Pomodoro timers',
      color: 'purple',
    },
    {
      icon: <MessageSquare className="glow-animate" color="#805ad5" />,
      title: 'Group Chat',
      desc: 'Real-time chat with voice & video support',
      color: 'purple',
    },
    {
      icon: <Users className="glow-animate" color="#805ad5" />,
      title: 'Focus Rooms',
      desc: 'Join study rooms with screen sharing',
      color: 'purple',
    },
    {
      icon: <Trophy className="glow-animate" color="#805ad5" />,
      title: 'Achievements',
      desc: 'Earn badges and compete on leaderboards',
      color: 'purple',
    },
    {
      icon: <BookOpen className="glow-animate" color="#805ad5" />,
      title: 'Resources',
      desc: 'Share notes and study materials',
      color: 'purple',
    },
    {
      icon: <Gamepad2 className="glow-animate" color="#805ad5" />,
      title: 'Break Games',
      desc: 'Mini-games for study breaks',
      color: 'purple',
    },
  ]

  // Group study rooms data
  const studyGroups = [
    { id: 1, name: 'Computer Science', members: 42, active: true },
    { id: 2, name: 'Medicine', members: 28, active: true },
    { id: 3, name: 'Engineering', members: 35, active: false },
    { id: 4, name: 'Business', members: 51, active: true },
    { id: 5, name: 'Mathematics', members: 19, active: true },
    { id: 6, name: 'Languages', members: 24, active: false },
  ]

  return (
    <Box
      minH="100vh"
      bg="purple.950"
      backgroundImage="radial-gradient(circle at 20% 30%, rgba(128, 90, 213, 0.25) 0%, transparent 25%), radial-gradient(circle at 80% 70%, rgba(128, 90, 213, 0.2) 0%, transparent 25%)"
      position="relative"
      overflow="hidden"
    >
      {/* Animated Background Elements */}
      <Box
        position="absolute"
        top="10%"
        left="10%"
        w="300px"
        h="300px"
        bg="purple.600"
        borderRadius="full"
        opacity="0.15"
        filter="blur(60px)"
        animation="glow-pulse 8s infinite"
      />
      <Box
        position="absolute"
        bottom="20%"
        right="10%"
        w="400px"
        h="400px"
        bg="purple.500"
        borderRadius="full"
        opacity="0.1"
        filter="blur(60px)"
        animation="glow-pulse 8s infinite"
      />

      {/* Silver glowing particles */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          w="2px"
          h="2px"
          bg="silver"
          borderRadius="full"
          boxShadow="0 0 10px 2px rgba(192, 192, 255, 0.7)"
          animation={`float ${3 + Math.random() * 4}s infinite ${Math.random() * 2}s`}
        />
      ))}

      {/* Header */}
      <Box
        bg="purple.900/90"
        borderBottom="1px solid"
        borderColor="purple.700"
        backdropFilter="blur(10px)"
        py={4}
        position="sticky"
        top="0"
        zIndex="1000"
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <HStack spacing={3} cursor="pointer" onClick={() => window.scrollTo(0, 0)}>
              <Box
                w="10"
                h="10"
                bg="linear-gradient(135deg, #e0e0e0, #c0c0c0)"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="0 0 20px rgba(192, 192, 255, 0.7)"
              >
                <Target size={24} color="#805ad5" />
              </Box>
              <Text fontSize="2xl" fontWeight="bold" color="purple.100">
                Study<span style={{ color: '#e0e0e0', textShadow: '0 0 10px rgba(192, 192, 255, 0.7)' }}>Cord</span>
              </Text>
              <Badge
                bg="linear-gradient(135deg, #e0e0e0, #c0c0c0)"
                color="purple.800"
                variant="solid"
                px={2}
                py={1}
                boxShadow="0 0 10px rgba(192, 192, 255, 0.5)"
              >
                <Sparkles size={12} style={{ marginRight: '4px' }} /> NEW
              </Badge>
            </HStack>
            <HStack spacing={3}>
              <Button
                leftIcon={<LogIn size={16} />}
                {...silverGlowStyle}
                size="md"
              >
                Login
              </Button>
              <Button
                leftIcon={<UserPlus size={16} />}
                {...silverGlowStyle}
                size="md"
              >
                Sign Up
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={20} position="relative" zIndex="1">
        <VStack spacing={16}>
          {/* Hero Section */}
          <VStack spacing={8} textAlign="center" maxW="800px" mx="auto">
            <Badge
              {...silverGlowStyle}
              color="purple.800"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
            >
              <Sparkles size={14} style={{ marginRight: '6px', display: 'inline' }} />
              Welcome to the future of studying
            </Badge>
            
            <Heading
              size={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              lineHeight="1.1"
              color="purple.100"
              textShadow="0 2px 4px rgba(0, 0, 0, 0.3)"
            >
              Study together,
              <Text
                as="span"
                bg="linear-gradient(135deg, #e0e0e0, #c0c0c0)"
                bgClip="text"
                display="block"
                textShadow="0 0 20px rgba(192, 192, 255, 0.5)"
              >
                achieve together
              </Text>
            </Heading>
            
            <Text fontSize="xl" color="purple.200" maxW="600px" opacity="0.9">
              A Discord-inspired platform where students collaborate, focus, and achieve
              their academic goals together in real-time. Experience purple-powered productivity!
            </Text>

            <HStack spacing={4} pt={4} wrap="wrap" justify="center">
              <Button
                size="lg"
                {...silverGlowStyle}
                fontSize="lg"
                rightIcon={<ChevronRight />}
                onClick={() => navigate('/register')}
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                {...silverGlowStyle}
                leftIcon={<Zap size={18} />}
                onClick={handleDemoLogin}
              >
                Try Demo
              </Button>
            </HStack>

            <Text fontSize="sm" color="purple.300">
              No credit card required • Free forever for basic features
            </Text>
          </VStack>

          {/* Study Groups Section */}
          <VStack spacing={8} w="full" maxW="1000px" mx="auto">
            <Heading size="xl" color="purple.100" textAlign="center">
              Join Study Groups
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
              {studyGroups.map((group) => (
                <Card
                  key={group.id}
                  bg="purple.900/60"
                  border="2px solid"
                  borderColor="purple.700"
                  backdropFilter="blur(10px)"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 40px rgba(128, 90, 213, 0.3)',
                  }}
                  transition="all 0.3s"
                >
                  <CardBody>
                    <VStack spacing={4} align="start">
                      <HStack justify="space-between" w="full">
                        <Text fontWeight="bold" fontSize="lg" color="purple.100">
                          {group.name}
                        </Text>
                        <Badge colorScheme={group.active ? "green" : "gray"}>
                          {group.active ? "Active" : "Offline"}
                        </Badge>
                      </HStack>
                      <HStack>
                        <UsersIcon size={16} color="#805ad5" />
                        <Text color="purple.200">{group.members} members</Text>
                      </HStack>
                      <Button
                        {...silverGlowStyle}
                        w="full"
                        size="sm"
                        leftIcon={<Users size={16} />}
                      >
                        Join Group
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
            <Button
              {...silverGlowStyle}
              size="lg"
              leftIcon={<Plus size={20} />}
              onClick={() => navigate('/create-group')}
            >
              Create New Group
            </Button>
          </VStack>

          {/* Live Demo Preview */}
          <Card
            bg="purple.900/60"
            w="100%"
            maxW="1000px"
            mx="auto"
            border="2px solid"
            borderColor="purple.700"
            backdropFilter="blur(10px)"
            overflow="hidden"
          >
            <CardBody p={0}>
              <Flex direction={{ base: 'column', lg: 'row' }}>
                <Box flex={1} p={8} bg="purple.900/40">
                  <VStack spacing={4} align="start">
                    <Badge
                      {...silverGlowStyle}
                      color="purple.800"
                      px={3}
                      py={1}
                    >
                      <Flame size={12} style={{ marginRight: '4px' }} /> LIVE DEMO
                    </Badge>
                    <Heading size="lg" color="purple.100">Experience StudyCord Now</Heading>
                    <Text color="purple.200">
                      Join thousands of students who have transformed their study habits with our platform.
                    </Text>
                    <SimpleGrid columns={2} spacing={4} w="100%" pt={4}>
                      <HStack spacing={3}>
                        <Box p={2} bg="purple.800" borderRadius="lg">
                          <Volume2 size={20} color="#e0e0e0" />
                        </Box>
                        <Text color="purple.100">Voice Chat</Text>
                      </HStack>
                      <HStack spacing={3}>
                        <Box p={2} bg="purple.800" borderRadius="lg">
                          <ScreenShare size={20} color="#e0e0e0" />
                        </Box>
                        <Text color="purple.100">Screen Share</Text>
                      </HStack>
                      <HStack spacing={3}>
                        <Box p={2} bg="purple.800" borderRadius="lg">
                          <Target size={20} color="#e0e0e0" />
                        </Box>
                        <Text color="purple.100">Focus Timer</Text>
                      </HStack>
                      <HStack spacing={3}>
                        <Box p={2} bg="purple.800" borderRadius="lg">
                          <Crown size={20} color="#e0e0e0" />
                        </Box>
                        <Text color="purple.100">Leaderboards</Text>
                      </HStack>
                    </SimpleGrid>
                  </VStack>
                </Box>
                <Box flex={1} p={8} bg="purple.800/40">
                  <VStack spacing={4}>
                    <AvatarGroup size="lg" max={6}>
                      {[...Array(6)].map((_, i) => (
                        <Avatar
                          key={i}
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                          border="2px solid"
                          borderColor="rgba(224, 224, 224, 0.5)"
                          boxShadow="0 0 15px rgba(192, 192, 255, 0.5)"
                        />
                      ))}
                    </AvatarGroup>
                    <Button
                      w="100%"
                      size="lg"
                      {...silverGlowStyle}
                      fontSize="md"
                      onClick={handleDemoLogin}
                    >
                      <Zap size={20} style={{ marginRight: '8px' }} />
                      Launch Instant Demo
                    </Button>
                    <Text fontSize="sm" color="purple.300" textAlign="center">
                      Full access for 24 hours • No registration needed
                    </Text>
                  </VStack>
                </Box>
              </Flex>
            </CardBody>
          </Card>

          {/* Features */}
          <VStack spacing={8} w="full">
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="purple.100">
              Everything you need to study effectively
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
              {features.map((feature, idx) => (
                <Card
                  key={idx}
                  bg="purple.900/60"
                  border="2px solid"
                  borderColor="purple.700"
                  backdropFilter="blur(10px)"
                  _hover={{
                    transform: 'translateY(-8px)',
                    boxShadow: '0 25px 50px rgba(128, 90, 213, 0.3)',
                  }}
                  transition="all 0.3s"
                >
                  <CardBody>
                    <VStack spacing={4} align="center" textAlign="center">
                      <Box
                        p={4}
                        bg="purple.800/30"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="purple.600"
                        boxShadow="0 0 20px rgba(128, 90, 213, 0.3)"
                      >
                        {feature.icon}
                      </Box>
                      <Heading size="md" color="purple.100">
                        {feature.title}
                      </Heading>
                      <Text fontSize="sm" color="purple.200">
                        {feature.desc}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>

          {/* Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} w="full" maxW="800px">
            {[
              { value: '10K+', label: 'Active Students', color: 'purple' },
              { value: '500+', label: 'Study Groups', color: 'purple' },
              { value: '50K+', label: 'Study Hours', color: 'purple' },
              { value: '98%', label: 'Satisfaction', color: 'purple' },
            ].map((stat, idx) => (
              <Card
                key={idx}
                bg="purple.900/60"
                border="2px solid"
                borderColor="purple.700"
                backdropFilter="blur(10px)"
                textAlign="center"
              >
                <CardBody>
                  <Text
                    fontSize="3xl"
                    fontWeight="bold"
                    color="purple.100"
                    textShadow="0 0 10px rgba(192, 192, 255, 0.5)"
                  >
                    {stat.value}
                  </Text>
                  <Text color="purple.300">{stat.label}</Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* Final CTA */}
          <VStack spacing={6} textAlign="center" maxW="600px" mx="auto">
            <Star size={48} color="#e0e0e0" className="bounce" />
            <Heading size="xl" color="purple.100">
              Ready to transform your study sessions?
            </Heading>
            <Text fontSize="lg" color="purple.200">
              Join the community of productive students today. It's free to get started!
            </Text>
            <Button
              size="lg"
              px={12}
              py={6}
              {...silverGlowStyle}
              fontSize="lg"
              onClick={handleDemoLogin}
            >
              Start Your Free Demo Now
            </Button>
          </VStack>

          {/* Quick Action Buttons */}
          <HStack spacing={4} wrap="wrap" justify="center">
            <Button
              {...silverGlowStyle}
              leftIcon={<Video size={18} />}
              size="md"
            >
              Start Video Call
            </Button>
            <Button
              {...silverGlowStyle}
              leftIcon={<Mic size={18} />}
              size="md"
            >
              Voice Chat
            </Button>
            <Button
              {...silverGlowStyle}
              leftIcon={<Headphones size={18} />}
              size="md"
            >
              Study Music
            </Button>
            <Button
              {...silverGlowStyle}
              leftIcon={<Book size={18} />}
              size="md"
            >
              Resources
            </Button>
          </HStack>
        </VStack>
      </Container>

      {/* Footer */}
      <Box
        bg="purple.900/90"
        borderTop="1px solid"
        borderColor="purple.700"
        py={8}
        mt={16}
        backdropFilter="blur(10px)"
      >
        <Container maxW="container.xl">
          <VStack spacing={4}>
            <Text color="purple.300" fontSize="sm">
              © 2024 StudyCord. All rights reserved.
            </Text>
            <Text color="purple.400" fontSize="xs">
              Not affiliated with Discord Inc.
            </Text>
            <HStack spacing={4}>
              <Button
                {...silverGlowStyle}
                size="sm"
                variant="ghost"
              >
                Privacy Policy
              </Button>
              <Button
                {...silverGlowStyle}
                size="sm"
                variant="ghost"
              >
                Terms of Service
              </Button>
              <Button
                {...silverGlowStyle}
                size="sm"
                variant="ghost"
              >
                Contact
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
        }
        .bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </Box>
  )
}

export default Welcome