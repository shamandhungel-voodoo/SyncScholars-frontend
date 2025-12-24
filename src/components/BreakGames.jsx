import { useState, useEffect } from 'react'
import {
  Box, VStack, HStack, Button, Text, 
  Input, useToast, Badge, Card, CardBody, CardHeader,
  Heading, Progress, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react'
import { Gamepad2, Trophy, Clock, X, RefreshCw, Check, AlertCircle } from 'lucide-react'
import Confetti from 'react-confetti'

const BreakGames = ({ groupId, isActive, onGameEnd }) => {
  const [activeGame, setActiveGame] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [showConfetti, setShowConfetti] = useState(false)
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const games = [
    {
      id: 'quiz',
      name: 'Quick Quiz',
      emoji: '🧠',
      description: 'Tech knowledge challenge',
      color: 'blue'
    },
    {
      id: 'word-race',
      name: 'Word Race',
      emoji: '🏁',
      description: 'Type fast programming terms',
      color: 'green'
    }
  ]

  const quizQuestions = [
    {
      id: 1,
      question: "What does MERN stand for?",
      options: ["MongoDB, Express, React, Node.js", "MySQL, Express, Ruby, Node.js"],
      answer: 0
    },
    {
      id: 2,
      question: "Which hook is for side effects in React?",
      options: ["useState", "useEffect", "useContext"],
      answer: 1
    }
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
    if (score > 0) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
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
    if (index === quizQuestions[currentQuestion].answer) {
      setScore(prev => prev + 10)
      toast({ title: "Correct! 🎯", status: "success", duration: 1000 })
    } else {
      toast({ title: "Wrong!", status: "error", duration: 1000 })
    }
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer(null)
      } else {
        endGame()
      }
    }, 1000)
  }

  const renderGame = () => {
    if (!activeGame) {
      return (
        <VStack spacing={6}>
          <Text fontSize="lg" textAlign="center">Take a break and play!</Text>
          <VStack spacing={4} w="100%">
            {games.map(game => (
              <Card key={game.id} onClick={() => startGame(game.id)} cursor="pointer" _hover={{ bg: 'gray.50' }}>
                <CardBody>
                  <HStack>
                    <Text fontSize="2xl">{game.emoji}</Text>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold">{game.name}</Text>
                      <Text fontSize="sm" color="gray.500">{game.description}</Text>
                    </VStack>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        </VStack>
      )
    }

    if (activeGame === 'quiz') {
      const question = quizQuestions[currentQuestion]
      return (
        <VStack spacing={6} w="100%">
          <HStack w="100%" justify="space-between">
            <Badge colorScheme="blue">Question {currentQuestion + 1}/{quizQuestions.length}</Badge>
            <Badge colorScheme="green">Score: {score}</Badge>
          </HStack>
          
          <Text fontSize="xl" fontWeight="bold">{question.question}</Text>
          
          <VStack spacing={3} w="100%">
            {question.options.map((option, idx) => (
              <Button
                key={idx}
                w="100%"
                variant={selectedAnswer === idx ? (idx === question.answer ? 'solid' : 'outline') : 'ghost'}
                colorScheme={selectedAnswer === idx ? (idx === question.answer ? 'green' : 'red') : 'gray'}
                onClick={() => handleQuizAnswer(idx)}
                isDisabled={selectedAnswer !== null}
              >
                {option}
              </Button>
            ))}
          </VStack>
        </VStack>
      )
    }

    return (
      <VStack spacing={6}>
        <Text fontSize="2xl">Type: <Text as="span" color="green.500">"REACT"</Text></Text>
        <Input 
          placeholder="Type here..."
          onChange={(e) => {
            if (e.target.value.toUpperCase() === "REACT") {
              setScore(prev => prev + 5)
              toast({ title: "Good! 🎯", status: "success", duration: 1000 })
              e.target.value = ""
            }
          }}
        />
      </VStack>
    )
  }

  return (
    <>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />}
      
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="blue.500" color="white">
            <HStack justify="space-between">
              <Heading size="md">🎮 Break Games</Heading>
              {activeGame && (
                <HStack>
                  <Badge colorScheme="green">{score} pts</Badge>
                  <Badge colorScheme="red">{timeLeft}s</Badge>
                </HStack>
              )}
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={6}>{renderGame()}</ModalBody>
        </ModalContent>
      </Modal>

      <Card>
        <CardBody>
          <VStack spacing={4}>
            <Heading size="md">🎮 Break Games</Heading>
            {isActive ? (
              <>
                <Progress value={(timeLeft/60)*100} colorScheme="blue" />
                <Button onClick={onOpen} colorScheme="purple" w="100%">
                  {activeGame ? 'Continue Game' : 'Play Games'}
                </Button>
              </>
            ) : (
              <>
                <Text textAlign="center" color="gray.600">
                  Games unlock during break time!
                </Text>
                <Button onClick={onOpen} colorScheme="blue">
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