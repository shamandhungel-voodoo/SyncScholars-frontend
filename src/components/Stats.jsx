import { useState, useEffect } from 'react'
import {
  VStack,
  HStack,
  Text,
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Flex,
  IconButton,
  Select,
} from '@chakra-ui/react'
import {
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Trophy,
  Users,
  Zap,
  Flame,
  Star,
  Award,
  Calendar,
  BarChart3,
  Download,
} from 'lucide-react'

const Stats = ({ groupId, currentUser }) => {
  const [timeRange, setTimeRange] = useState('week')
  const [stats, setStats] = useState({
    totalFocusTime: 42,
    averageFocus: 3.5,
    groupStreak: 7,
    totalSessions: 156,
    productivity: 87,
    completedTasks: 89,
    pointsEarned: 2450,
    membersActive: 8,
  })

  const leaderboard = [
    { rank: 1, name: 'Alex', points: 3200, streak: 21, focusTime: '42h' },
    { rank: 2, name: 'Morgan', points: 2900, streak: 18, focusTime: '38h' },
    { rank: 3, name: currentUser?.username || 'You', points: 2450, streak: 12, focusTime: '35h' },
    { rank: 4, name: 'Jordan', points: 2100, streak: 15, focusTime: '32h' },
    { rank: 5, name: 'Taylor', points: 1800, streak: 10, focusTime: '28h' },
  ]

  const weeklyData = [
    { day: 'Mon', focus: 4, tasks: 8 },
    { day: 'Tue', focus: 3, tasks: 6 },
    { day: 'Wed', focus: 5, tasks: 10 },
    { day: 'Thu', focus: 4, tasks: 7 },
    { day: 'Fri', focus: 6, tasks: 12 },
    { day: 'Sat', focus: 2, tasks: 4 },
    { day: 'Sun', focus: 4, tasks: 9 },
  ]

  const getGlowColor = (value) => {
    if (value >= 80) return '0 0 20px rgba(72, 187, 120, 0.6)'
    if (value >= 60) return '0 0 20px rgba(128, 90, 213, 0.6)'
    return '0 0 20px rgba(229, 62, 62, 0.6)'
  }

  return (
    <VStack spacing={6} w="100%" className="glow-border" p={6} borderRadius="xl" bg="gray.900">
      <Flex w="100%" justify="space-between" align="center">
        <HStack spacing={3}>
          <Box p={2} bg="purple.700" borderRadius="lg" boxShadow="glow.purple">
            <BarChart3 size={20} />
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontSize="xl" fontWeight="bold" className="glow-text">
              Group Statistics
            </Text>
            <Text fontSize="sm" color="gray.400">
              Track your study progress
            </Text>
          </VStack>
        </HStack>
        
        <HStack spacing={3}>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            size="sm"
            bg="gray.800"
            borderColor="purple.600"
            _focus={{ borderColor: 'purple.400' }}
            w="auto"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </Select>
          <IconButton
            icon={<Download />}
            size="sm"
            variant="outline"
            colorScheme="purple"
            aria-label="Export stats"
            _hover={{ boxShadow: 'glow.purple' }}
          />
        </HStack>
      </Flex>

      {/* Main Stats Grid */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} w="100%">
        <Card
          variant="glow"
          border="2px solid"
          borderColor="purple.600"
          _hover={{ boxShadow: 'glow.purple' }}
          transition="all 0.3s"
        >
          <CardBody>
            <VStack spacing={3}>
              <Box p={2} bg="purple.900/50" borderRadius="full">
                <Clock size={20} color="#805ad5" />
              </Box>
              <Stat textAlign="center">
                <StatLabel color="gray.400">Focus Time</StatLabel>
                <StatNumber color="white" fontSize="2xl">{stats.totalFocusTime}h</StatNumber>
                <StatHelpText>
                  <TrendingUp color="#38A169" style={{ marginRight: '4px', display: 'inline' }} />
                  <Text as="span" color="green.400">+12% this week</Text>
                </StatHelpText>
              </Stat>
            </VStack>
          </CardBody>
        </Card>

        <Card
          variant="glow"
          border="2px solid"
          borderColor="red.600"
          _hover={{ boxShadow: 'glow.red' }}
          transition="all 0.3s"
        >
          <CardBody>
            <VStack spacing={3}>
              <Box p={2} bg="red.900/50" borderRadius="full">
                <Flame size={20} color="#e53e3e" />
              </Box>
              <Stat textAlign="center">
                <StatLabel color="gray.400">Group Streak</StatLabel>
                <StatNumber color="white" fontSize="2xl">{stats.groupStreak} days</StatNumber>
                <StatHelpText>
                  <Star color="#D69E2E" style={{ marginRight: '4px', display: 'inline' }} />
                  <Text as="span" color="yellow.400">🔥 Active streak</Text>
                </StatHelpText>
              </Stat>
            </VStack>
          </CardBody>
        </Card>

        <Card
          variant="glow"
          border="2px solid"
          borderColor="green.600"
          _hover={{ boxShadow: '0 0 30px rgba(72, 187, 120, 0.6)' }}
          transition="all 0.3s"
        >
          <CardBody>
            <VStack spacing={3}>
              <Box p={2} bg="green.900/50" borderRadius="full">
                <Target size={20} color="#38A169" />
              </Box>
              <Stat textAlign="center">
                <StatLabel color="gray.400">Productivity</StatLabel>
                <StatNumber color="white" fontSize="2xl">{stats.productivity}%</StatNumber>
                <StatHelpText>
                  <TrendingUp color="#38A169" style={{ marginRight: '4px', display: 'inline' }} />
                  <Text as="span" color="green.400">All time high</Text>
                </StatHelpText>
              </Stat>
            </VStack>
          </CardBody>
        </Card>

        <Card
          variant="glow"
          border="2px solid"
          borderColor="yellow.600"
          _hover={{ boxShadow: '0 0 30px rgba(246, 173, 85, 0.6)' }}
          transition="all 0.3s"
        >
          <CardBody>
            <VStack spacing={3}>
              <Box p={2} bg="yellow.900/50" borderRadius="full">
                <Zap size={20} color="#D69E2E" />
              </Box>
              <Stat textAlign="center">
                <StatLabel color="gray.400">Points Earned</StatLabel>
                <StatNumber color="white" fontSize="2xl">{stats.pointsEarned}</StatNumber>
                <StatHelpText>
                  <Trophy color="#D69E2E" style={{ marginRight: '4px', display: 'inline' }} />
                  <Text as="span" color="yellow.400">#3 in group</Text>
                </StatHelpText>
              </Stat>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Leaderboard */}
      <Card variant="glow" w="100%">
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontWeight="bold" fontSize="lg" className="glow-text">
                <Trophy style={{ marginRight: '8px', display: 'inline' }} />
                Leaderboard
              </Text>
              <Badge colorScheme="purple" boxShadow="glow.purple" px={3} py={1}>
                Top 5 Performers
              </Badge>
            </HStack>

            <VStack spacing={2}>
              {leaderboard.map((user) => (
                <HStack
                  key={user.rank}
                  w="100%"
                  p={3}
                  bg={user.name === currentUser?.username ? 'purple.900/40' : 'gray.800/50'}
                  borderRadius="lg"
                  border="2px solid"
                  borderColor={user.name === currentUser?.username ? 'purple.600' : 'gray.700'}
                  boxShadow={user.name === currentUser?.username ? 'glow.purple' : 'none'}
                  _hover={{ transform: 'translateY(-2px)' }}
                  transition="all 0.3s"
                >
                  <Text
                    fontWeight="bold"
                    color={
                      user.rank === 1
                        ? 'yellow.400'
                        : user.rank === 2
                        ? 'gray.300'
                        : user.rank === 3
                        ? 'orange.400'
                        : 'gray.400'
                    }
                    w="30px"
                  >
                    #{user.rank}
                  </Text>
                  <Text fontWeight="bold" flex={1}>
                    {user.name} {user.name === currentUser?.username && '(You)'}
                  </Text>
                  <HStack spacing={4}>
                    <Badge colorScheme="green" boxShadow="0 0 8px rgba(72, 187, 120, 0.5)">
                      {user.points} pts
                    </Badge>
                    <Badge colorScheme="red" boxShadow="glow.red">
                      {user.streak} days
                    </Badge>
                    <Text fontSize="sm" color="gray.400">
                      {user.focusTime}
                    </Text>
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Weekly Focus Chart */}
      <Card variant="glow" w="100%">
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Text fontWeight="bold" fontSize="lg" className="glow-text">
              <Calendar style={{ marginRight: '8px', display: 'inline' }} />
              Weekly Focus Trend
            </Text>
            
            <HStack spacing={4} justify="center">
              {weeklyData.map((day, index) => (
                <VStack key={index} spacing={2}>
                  <Text fontSize="xs" color="gray.400">{day.day}</Text>
                  <VStack spacing={1}>
                    <Progress
                      value={(day.focus / 6) * 100}
                      colorScheme="purple"
                      height="60px"
                      width="20px"
                      borderRadius="full"
                      bg="gray.800"
                      orientation="vertical"
                      boxShadow="inset 0 0 10px rgba(128, 90, 213, 0.2)"
                    />
                    <Text fontSize="xs" color="purple.300">{day.focus}h</Text>
                  </VStack>
                </VStack>
              ))}
            </HStack>

            <HStack justify="center" spacing={6} pt={4}>
              <HStack spacing={2}>
                <Box w="3" h="3" bg="purple.500" borderRadius="full" boxShadow="glow.purple" />
                <Text fontSize="sm" color="gray.400">Focus Time</Text>
              </HStack>
              <HStack spacing={2}>
                <Box w="3" h="3" bg="green.500" borderRadius="full" boxShadow="0 0 10px rgba(72, 187, 120, 0.5)" />
                <Text fontSize="sm" color="gray.400">Tasks Completed</Text>
              </HStack>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  )
}

export default Stats