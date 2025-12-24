import { useState, useEffect } from 'react'
import { 
  Box, VStack, HStack, Text, Button, Progress, 
  useToast, Badge, CircularProgress, CircularProgressLabel 
} from '@chakra-ui/react'
import { Play, Pause, RotateCcw, Coffee, Target } from 'lucide-react'

const PomodoroTimer = ({ groupId, isHost, socket, onBreakStart }) => {
  const [timeLeft, setTimeLeft] = useState(1500) // 25 minutes
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState('study')
  const [cycles, setCycles] = useState(0)
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
              toast({
                title: 'Study complete! ☕',
                description: 'Time for a break',
                status: 'success',
                duration: 5000,
              })
            } else {
              toast({
                title: 'Break over! 🧠',
                description: 'Back to studying',
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
  }, [isRunning, timeLeft, mode, onBreakStart])

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
    <VStack spacing={6} p={8} bg="white" borderRadius="2xl" shadow="xl">
      <HStack w="100%" justify="space-between">
        <HStack>
          <Box p={2} borderRadius="lg" bg={mode === 'study' ? 'blue.50' : 'green.50'}>
            {mode === 'study' ? <Target color="#3182CE" /> : <Coffee color="#38A169" />}
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold">{mode === 'study' ? 'Focus Mode' : 'Break Time'}</Text>
            <Text fontSize="sm" color="gray.500">Cycle {cycles}</Text>
          </VStack>
        </HStack>
        <Badge colorScheme={isRunning ? 'green' : 'gray'}>{isRunning ? 'Live' : 'Paused'}</Badge>
      </HStack>

      <Box position="relative" w="250px" h="250px">
        <CircularProgress value={progress} size="250px" color={mode === 'study' ? 'blue.500' : 'green.500'}>
          <CircularProgressLabel>
            <VStack spacing={1}>
              <Text fontSize="4xl" fontWeight="bold">{formatTime(timeLeft)}</Text>
              <Text fontSize="sm" color="gray.500">{mode === 'study' ? 'Study time' : 'Break time'}</Text>
            </VStack>
          </CircularProgressLabel>
        </CircularProgress>
      </Box>

      <HStack spacing={4} w="100%" justify="center">
        <Button
          leftIcon={isRunning ? <Pause size={18} /> : <Play size={18} />}
          colorScheme={isRunning ? 'yellow' : 'green'}
          onClick={isRunning ? pauseTimer : startTimer}
          isDisabled={!isHost}
          flex={1}
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        
        <Button leftIcon={<RotateCcw size={18} />} colorScheme="red" onClick={resetTimer} isDisabled={!isHost} flex={1}>
          Reset
        </Button>
        
        <Button
          leftIcon={mode === 'study' ? <Coffee size={18} /> : <Target size={18} />}
          colorScheme="purple"
          onClick={switchMode}
          isDisabled={!isHost}
          flex={1}
        >
          Switch
        </Button>
      </HStack>

      {!isHost && <Text fontSize="sm" color="gray.500">Host controls the timer</Text>}
    </VStack>
  )
}

export default PomodoroTimer