import { useState, useEffect } from 'react'
import { Box, Text, Button, HStack, VStack, Badge } from '@chakra-ui/react'
import { Play, Pause, RotateCcw } from 'lucide-react'

const Timer = () => {
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1)
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <VStack spacing={4} p={6} bg="white" borderRadius="xl" shadow="md">
      <Text fontSize="3xl" fontWeight="bold">{formatTime(seconds)}</Text>
      <Badge colorScheme={isActive ? 'green' : 'gray'}>
        {isActive ? 'Running' : 'Paused'}
      </Badge>
      <HStack spacing={4}>
        <Button
          leftIcon={isActive ? <Pause size={16} /> : <Play size={16} />}
          colorScheme={isActive ? 'yellow' : 'green'}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button
          leftIcon={<RotateCcw size={16} />}
          colorScheme="red"
          onClick={() => {
            setIsActive(false)
            setSeconds(0)
          }}
        >
          Reset
        </Button>
      </HStack>
    </VStack>
  )
}

export default Timer