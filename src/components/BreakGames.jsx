import { useState, useEffect } from 'react'
import {
  Box, VStack, HStack, Button, Text, 
  Input, useToast, Badge, Card, CardBody, CardHeader,
  Heading, Progress, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalCloseButton, useDisclosure,
  Flex, IconButton, SimpleGrid, Stat, StatLabel, StatNumber,
  StatHelpText, Image,
} from '@chakra-ui/react'
import { Gamepad2, Trophy, Clock, X, RefreshCw, Check, AlertCircle, Zap, Flame, Target, Star, Crown, Dice5, Puzzle, Brain } from 'lucide-react'
import Confetti from 'react-confetti'

const BreakGames = ({ groupId, isActive, onGameEnd }) => {
  const [activeGame, setActiveGame] = useState(null)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [showConfetti, setShowConfetti] = useState(false)
  const [streak, setStreak] = useState(0)
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const games = [
    {
      id: 'quiz',
      name: 'Brain Quiz',
      emoji: '🧠',
      description: 'Tech knowledge challenge',
      color: 'purple',
      icon: <Brain />,
      players: 8,
    },
    {
      id: 'word-race',
      name: 'Word Race',
      emoji: '🏁',
      description: 'Type fast programming terms',
      color: 'red',
      icon: <Zap />,
      players: 6,
    },
    {
      id: 'memory',
      name: 'Memory Match',
      emoji: '🎯',
      description: 'Match programming pairs',
      color: 'pink',
      icon: <Puzzle />,
      players: 4,
    },
    {
      id: 'trivia',
      name: 'Group Trivia',
      emoji: '🏆',
      description: 'Team-based quiz',
      color: 'yellow',
      icon: <Crown />,
      players: 12,
    },
  ]

  const quizQuestions = [
    {
      id: 1,
      question: "What does MERN stand for?",
      options: ["MongoDB, Express, React, Node.js", "MySQL, Express, Ruby, Node.js", "MongoDB, Express, Ruby, Node"],
      answer: 0,
      points: 10,
    },
    {
      id: 2,
      question: "Which hook is for side effects in React?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      answer: 1,
      points: 15,
    },
    {
      id: 3,
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Apple Programming Interface", "Advanced Programming Interface"],
      answer: 0,
      points: 8,
    },
    {
      id: 4,
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: 3,
      points: 12,
    },
  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  useEffect(() => {
    if (activeGame && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && activeGame) {
      endGame()
    }
  }, [activeGame, timeLeft])

  const startGame = (gameId) => {
    setActiveGame(gameId)
    setTimeLeft(60)
    setScore(0)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    onOpen()
  }

  const endGame = () => {
    if (score > highScore) {
      setHighScore(score)
      setStreak(streak + 1)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      toast({
        title: "🎮 New High Score!",
        description: `You scored ${score} points! Streak: ${streak + 1}`,
        status: "success",
        duration: 5000,
      })
    } else if (score > 0) {
      toast({
        title: "Game Complete! 🎉",
        description: `You scored ${score} points!`,
        status: "success",
        duration: 3000,
      })
    }
    setTimeout(() => {
      setActiveGame(null)
      onClose()
      if (onGameEnd) onGameEnd()
    }, 2000)
  }

  const handleQuizAnswer = (index) => {
    setSelectedAnswer(index)
    const question = quizQuestions[currentQuestion]
    if (index === question.answer) {
      setScore(prev => prev + question.points)
      toast({
        title: "Correct! 🎯",
        description: `+${question.points} points`,
        status: "success",
        duration: 1000,
      })
    } else {
      toast({
        title: "Wrong!",
        description: `The correct answer was: ${question.options[question.answer]}`,
        status: "error",
        duration: 2000,
      })
    }
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer(null)
      } else {
        endGame()
      }
    }, 1500)
  }

  const renderGame = () => {
    if (!activeGame) {
      return (
        <VStack spacing={6}>
          <Text fontSize="lg" textAlign="center" className="glow-text">Take a break and play!</Text>
          <SimpleGrid columns={2} spacing={4} w="100%">
            {games.map(game => (
              <Card
                key={game.id}
                onClick={() => startGame(game.id)}
                cursor="pointer"
                variant="glow"
                border="2px solid"
                borderColor={`${game.color}.600`}
                bg="gray.900"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: `0 0 30px var(--chakra-colors-${game.color}-500)`,
                }}
                transition="all 0.3s"
              >
                <CardBody>
                  <VStack spacing={3}>
                    <Box
                      p={3}
                      bg={`${game.color}.700`}
                      borderRadius="lg"
                      boxShadow={`0 0 20px var(--chakra-colors-${game.color}-500)`}
                    >
                      {game.icon}
                    </Box>
                    <VStack spacing={1}>
                      <Text fontWeight="bold" fontSize="lg">{game.name}</Text>
                      <Text fontSize="sm" color="gray.400">{game.description}</Text>
                    </VStack>
                    <Badge colorScheme={game.color} boxShadow={`0 0 10px var(--chakra-colors-${game.color}-500)`}>
                      {game.players} players
                    </Badge>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      )
    }

    if (activeGame === 'quiz') {
      const question = quizQuestions[currentQuestion]
      return (
        <VStack spacing={6} w="100%">
          <HStack w="100%" justify="space-between">
            <Badge colorScheme="purple" boxShadow="glow.purple" px={3} py={1}>
              Question {currentQuestion + 1}/{quizQuestions.length}
            </Badge>
            <HStack spacing={3}>
              <Badge colorScheme="green" boxShadow="0 0 10px rgba(72, 187, 120, 0.5)" px={3} py={1}>
                <Target size={12} style={{ marginRight: '4px' }} /> Score: {score}
              </Badge>
              <Badge colorScheme="red" boxShadow="glow.red" px={3} py={1}>
                <Clock size={12} style={{ marginRight: '4px' }} /> {timeLeft}s
              </Badge>
            </HStack>
          </HStack>
          
          <Card variant="glow" w="100%" p={6}>
            <CardBody>
              <VStack spacing={6}>
                <Text fontSize="xl" fontWeight="bold" textAlign="center" className="glow-text">
                  {question.question}
                </Text>
                <Text fontSize="sm" color="purple.300" textAlign="center">
                  Worth {question.points} points
                </Text>
                
                <VStack spacing={3} w="100%">
                  {question.options.map((option, idx) => (
                    <Button
                      key={idx}
                      w="100%"
                      h="60px"
                      variant={selectedAnswer === idx ? (idx === question.answer ? 'solid' : 'outline') : 'ghost'}
                      colorScheme={selectedAnswer === idx ? (idx === question.answer ? 'green' : 'red') : 'gray'}
                      onClick={() => handleQuizAnswer(idx)}
                      isDisabled={selectedAnswer !== null}
                      borderWidth="2px"
                      fontSize="lg"
                      _hover={{
                        transform: 'scale(1.02)',
                        boxShadow: idx === question.answer
                          ? '0 0 20px rgba(72, 187, 120, 0.5)'
                          : '0 0 20px rgba(128, 90, 213, 0.5)',
                      }}
                      transition="all 0.2s"
                    >
                      {option}
                      {selectedAnswer === idx && idx === question.answer && (
                        <Check size={20} style={{ marginLeft: '8px' }} />
                      )}
                    </Button>
                  ))}
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          <Progress
            value={((currentQuestion + 1) / quizQuestions.length) * 100}
            colorScheme="purple"
            w="100%"
            height="8px"
            borderRadius="full"
            bg="gray.800"
            boxShadow="inset 0 0 10px rgba(128, 90, 213, 0.2)"
          />
        </VStack>
      )
    }

    return (
      <VStack spacing={6} w="100%">
        <Card variant="glow" w="100%" p={6}>
          <CardBody>
            <VStack spacing={6}>
              <Text fontSize="2xl" fontWeight="bold" className="glow-text">
                Type: <Text as="span" color="red.400" className="glow-text">"REACT"</Text>
              </Text>
              <Text color="gray.400" textAlign="center">
                Type the word as fast as you can to earn points!
              </Text>
              
              <Input
                placeholder="Type here..."
                size="lg"
                fontSize="xl"
                textAlign="center"
                borderColor="purple.600"
                borderWidth="2px"
                _focus={{
                  borderColor: 'purple.400',
                  boxShadow: '0 0 0 3px rgba(128, 90, 213, 0.2)',
                }}
                onChange={(e) => {
                  if (e.target.value.toUpperCase() === "REACT") {
                    setScore(prev => prev + 15)
                    setStreak(prev => prev + 1)
                    toast({
                      title: "Perfect! ⚡",
                      description: "+15 points!",
                      status: "success",
                      duration: 1000,
                    })
                    e.target.value = ""
                  }
                }}
              />

              <HStack spacing={6} pt={4}>
                <Stat textAlign="center">
                  <StatLabel color="gray.400">Score</StatLabel>
                  <StatNumber color="green.400" className="glow-text">{score}</StatNumber>
                  <StatHelpText>
                    <Badge colorScheme="green" fontSize="xs">
                      +15 per word
                    </Badge>
                  </StatHelpText>
                </Stat>
                <Stat textAlign="center">
                  <StatLabel color="gray.400">Streak</StatLabel>
                  <StatNumber color="yellow.400" className="glow-text">{streak}</StatNumber>
                  <StatHelpText>
                    <Badge colorScheme="yellow" fontSize="xs">
                      Combo bonus
                    </Badge>
                  </StatHelpText>
                </Stat>
                <Stat textAlign="center">
                  <StatLabel color="gray.400">Time</StatLabel>
                  <StatNumber color="red.400" className="glow-text">{timeLeft}s</StatNumber>
                  <StatHelpText>
                    <Badge colorScheme="red" fontSize="xs">
                      Hurry up!
                    </Badge>
                  </StatHelpText>
                </Stat>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    )
  }

  return (
    <>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />}
      
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
        <ModalContent bg="gray.900" border="2px solid" borderColor="purple.700" boxShadow="0 0 40px rgba(128, 90, 213, 0.5)">
          <ModalHeader bg="purple.900" color="white" borderBottom="2px solid" borderColor="purple.700">
            <HStack justify="space-between">
              <Heading size="md" className="glow-text">🎮 Break Games</Heading>
              {activeGame && (
                <HStack>
                  <Badge colorScheme="green" boxShadow="0 0 10px rgba(72, 187, 120, 0.5)" px={3} py={1}>
                    <Trophy size={12} style={{ marginRight: '4px' }} /> {score} pts
                  </Badge>
                  <Badge colorScheme="red" boxShadow="glow.red" px={3} py={1}>
                    <Flame size={12} style={{ marginRight: '4px' }} /> {timeLeft}s
                  </Badge>
                </HStack>
              )}
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={6}>{renderGame()}</ModalBody>
        </ModalContent>
      </Modal>

      <Card variant="glow" w="100%">
        <CardBody>
          <VStack spacing={4}>
            <Heading size="md" className="glow-text">🎮 Break Games</Heading>
            {isActive ? (
              <>
                <Progress value={(timeLeft/60)*100} colorScheme="purple" height="12px" borderRadius="full" />
                <Button
                  onClick={onOpen}
                  colorScheme="purple"
                  w="100%"
                  size="lg"
                  boxShadow="glow.purple"
                  _hover={{ boxShadow: '0 0 30px rgba(128, 90, 213, 0.8)' }}
                >
                  {activeGame ? 'Continue Game' : 'Play Games'}
                </Button>
                <HStack spacing={4} w="100%">
                  <Stat>
                    <StatLabel color="gray.400">High Score</StatLabel>
                    <StatNumber color="purple.300">{highScore}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel color="gray.400">Streak</StatLabel>
                    <StatNumber color="red.300">{streak}</StatNumber>
                  </Stat>
                </HStack>
              </>
            ) : (
              <>
                <Text textAlign="center" color="gray.400">
                  Games unlock during break time!
                </Text>
                <Button
                  onClick={onOpen}
                  colorScheme="purple"
                  variant="outline"
                  w="100%"
                  boxShadow="0 0 15px rgba(128, 90, 213, 0.3)"
                  _hover={{ boxShadow: 'glow.purple' }}
                >
                  Preview Games
                </Button>
              </>
            )}
          </VStack>
        </CardBody>
      </Card>
    </>
  )
}

export default BreakGames