import { useState, useEffect } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Progress,
  useToast,
  Badge,
  CircularProgress,
  CircularProgressLabel,
  IconButton,
} from '@chakra-ui/react'
import { Play, Pause, RotateCcw, Coffee, Target, Volume2, VolumeX } from 'lucide-react'

const PomodoroTimer = ({ groupId, isHost, socket, onBreakStart }) => {
  const [timeLeft, setTimeLeft] = useState(1500) // 25 minutes
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState('study')
  const [cycles, setCycles] = useState(0)
  const [muted, setMuted] = useState(false)
  const toast = useToast()

  useEffect(() => {
    let interval
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            setIsRunning(false)
            
            if (mode === 'study') {
              setCycles(prev => prev + 1)
              onBreakStart()
              if (!muted) {
                new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3').play()
              }
              toast({
                title: 'Time for a break! ☕',
                description: 'Great focus session!',
                status: 'success',
                duration: 5000,
              })
            } else {
              if (!muted) {
                new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3').play()
              }
              toast({
                title: 'Break over! 🧠',
                description: 'Ready to focus again?',
                status: 'info',
                duration: 5000,
              })
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, mode, onBreakStart, muted])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = (timeLeft / (mode === 'study' ? 1500 : 300)) * 100

  const startTimer = () => {
    if (!isHost) {
      toast({ title: 'Only host can control', status: 'warning' })
      return
    }
    setIsRunning(true)
  }

  const pauseTimer = () => {
    if (!isHost) return
    setIsRunning(false)
  }

  const resetTimer = () => {
    if (!isHost) return
    setTimeLeft(mode === 'study' ? 1500 : 300)
    setIsRunning(false)
  }

  const switchMode = () => {
    setMode(prev => {
      const newMode = prev === 'study' ? 'break' : 'study'
      setTimeLeft(newMode === 'study' ? 1500 : 300)
      setIsRunning(false)
      return newMode
    })
  }

  return (
    <VStack spacing={6} p={6} bg="gray.900" borderRadius="lg" border="1px solid" borderColor="gray.800">
      <HStack w="100%" justify="space-between">
        <HStack>
          <Box p={2} borderRadius="lg" bg={mode === 'study' ? 'blue.900' : 'green.900'}>
            {mode === 'study' ? <Target color="#3182CE" /> : <Coffee color="#38A169" />}
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold">{mode === 'study' ? 'Focus Mode' : 'Break Time'}</Text>
            <Text fontSize="sm" color="gray.500">Session {cycles + 1}</Text>
          </VStack>
        </HStack>
        <HStack>
          <IconButton
            icon={muted ? <VolumeX /> : <Volume2 />}
            size="sm"
            variant="ghost"
            onClick={() => setMuted(!muted)}
            aria-label="Toggle sound"
          />
          <Badge colorScheme={isRunning ? 'green' : 'gray'}>
            {isRunning ? 'Live' : 'Paused'}
          </Badge>
        </HStack>
      </HStack>

      <Box position="relative" w="250px" h="250px">
        <CircularProgress
          value={progress}
          size="250px"
          color={mode === 'study' ? 'blue.500' : 'green.500'}
          thickness="8px"
          trackColor="gray.800"
        >
          <CircularProgressLabel>
            <VStack spacing={1}>
              <Text fontSize="4xl" fontWeight="bold" color="white">
                {formatTime(timeLeft)}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {mode === 'study' ? 'Stay focused!' : 'Take a break!'}
              </Text>
            </VStack>
          </CircularProgressLabel>
        </CircularProgress>
      </Box>

      <HStack spacing={3} w="100%" justify="center">
        <Button
          leftIcon={isRunning ? <Pause size={18} /> : <Play size={18} />}
          colorScheme={isRunning ? 'yellow' : 'green'}
          onClick={isRunning ? pauseTimer : startTimer}
          isDisabled={!isHost}
          flex={1}
          variant="solid"
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        
        <Button
          leftIcon={<RotateCcw size={18} />}
          colorScheme="red"
          onClick={resetTimer}
          isDisabled={!isHost}
          flex={1}
          variant="outline"
        >
          Reset
        </Button>
        
        <Button
          leftIcon={mode === 'study' ? <Coffee size={18} /> : <Target size={18} />}
          colorScheme="discord"
          onClick={switchMode}
          isDisabled={!isHost}
          flex={1}
          variant="ghost"
        >
          Switch
        </Button>
      </HStack>

      {!isHost && (
        <Text fontSize="sm" color="gray.500" textAlign="center">
          ⚡ Host controls the timer
        </Text>
      )}
    </VStack>
  )
}

export default PomodoroTimer