import { useState, useEffect } from 'react'
import {
  VStack,
  HStack,
  Input,
  Button,
  Checkbox,
  Text,
  IconButton,
  Box,
  Badge,
  Card,
  CardBody,
  Progress,
  Flex,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  AvatarGroup,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon, StarIcon, AttachmentIcon, TimeIcon, BellIcon, DragHandleIcon } from '@chakra-ui/icons'
import { Zap, Trophy, Flame, Target, AlertCircle, Calendar, Users } from 'lucide-react'

const TaskList = ({ groupId, socket }) => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [editingTask, setEditingTask] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    const demo = [
      { id: '1', text: 'Complete React Hooks tutorial', completed: true, priority: 'high', assignedTo: ['Alex', 'Taylor'], dueDate: 'Today', points: 50 },
      { id: '2', text: 'Build Pomodoro timer component', completed: false, priority: 'high', assignedTo: ['Jordan'], dueDate: 'Tomorrow', points: 75 },
      { id: '3', text: 'Design study group UI', completed: false, priority: 'medium', assignedTo: ['Casey', 'Morgan'], dueDate: 'Dec 25', points: 100 },
      { id: '4', text: 'Setup MongoDB database', completed: true, priority: 'low', assignedTo: ['Riley'], dueDate: 'Yesterday', points: 60 },
      { id: '5', text: 'Implement WebSocket chat', completed: false, priority: 'high', assignedTo: ['Alex', 'Quinn'], dueDate: 'Today', points: 150 },
      { id: '6', text: 'Write API documentation', completed: false, priority: 'medium', assignedTo: ['Taylor'], dueDate: 'Next Week', points: 40 },
    ]
    setTasks(demo)
  }, [])

  const addTask = () => {
    if (!newTask.trim()) return
    const task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      priority: 'medium',
      assignedTo: [],
      dueDate: 'Today',
      points: 25,
    }
    setTasks(prev => [...prev, task])
    setNewTask('')
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const startEdit = (task) => {
    setEditingTask(task.id)
    setEditText(task.text)
  }

  const saveEdit = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, text: editText } : task
    ))
    setEditingTask(null)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red.500'
      case 'medium': return 'purple.500'
      case 'low': return 'gray.500'
      default: return 'gray.500'
    }
  }

  const getPriorityGlow = (priority) => {
    switch (priority) {
      case 'high': return '0 0 15px rgba(229, 62, 62, 0.6)'
      case 'medium': return '0 0 15px rgba(128, 90, 213, 0.6)'
      case 'low': return '0 0 10px rgba(160, 174, 192, 0.3)'
      default: return 'none'
    }
  }

  const completedCount = tasks.filter(t => t.completed).length
  const totalPoints = tasks.reduce((sum, task) => sum + (task.completed ? task.points : 0), 0)
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && !t.completed).length

  return (
    <VStack spacing={4} w="100%" className="glow-border" p={6} borderRadius="xl" bg="gray.900">
      <Flex w="100%" justify="space-between" align="center">
        <HStack spacing={3}>
          <Box p={2} bg="purple.700" borderRadius="lg" boxShadow="glow.purple">
            <Target size={20} />
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontSize="xl" fontWeight="bold" className="glow-text">
              Group Tasks
            </Text>
            <Text fontSize="sm" color="gray.400">
              Collaborate and track progress
            </Text>
          </VStack>
        </HStack>
        <HStack spacing={3}>
          <Badge colorScheme="purple" boxShadow="glow.purple" px={3} py={1}>
            {completedCount}/{tasks.length} done
          </Badge>
          <Badge colorScheme="red" boxShadow="glow.red" px={3} py={1}>
            <Flame size={12} style={{ marginRight: '4px' }} /> {highPriorityTasks} urgent
          </Badge>
          <Badge colorScheme="green" px={3} py={1} boxShadow="0 0 15px rgba(72, 187, 120, 0.5)">
            <Trophy size={12} style={{ marginRight: '4px' }} /> {totalPoints} pts
          </Badge>
        </HStack>
      </Flex>

      {/* Progress Bar */}
      <Box w="100%" pt={2}>
        <Progress
          value={(completedCount / tasks.length) * 100}
          colorScheme="purple"
          height="8px"
          borderRadius="full"
          bg="gray.800"
          boxShadow="inset 0 0 10px rgba(128, 90, 213, 0.2)"
        />
        <HStack justify="space-between" mt={1}>
          <Text fontSize="xs" color="gray.400">
            Group progress
          </Text>
          <Text fontSize="xs" color="purple.300" fontWeight="bold">
            {Math.round((completedCount / tasks.length) * 100)}% complete
          </Text>
        </HStack>
      </Box>

      {/* Add Task */}
      <HStack w="100%" spacing={2}>
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task (press Enter to add)..."
          borderColor="purple.600"
          borderWidth="2px"
          bg="gray.800"
          _focus={{
            borderColor: 'purple.400',
            boxShadow: '0 0 0 3px rgba(128, 90, 213, 0.2)',
          }}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          _placeholder={{ color: 'gray.400' }}
        />
        <Button
          leftIcon={<AddIcon />}
          colorScheme="purple"
          onClick={addTask}
          boxShadow="0 0 15px rgba(128, 90, 213, 0.5)"
          _hover={{ boxShadow: 'glow.purple' }}
        >
          Add
        </Button>
      </HStack>

      {/* Task List */}
      <VStack spacing={3} w="100%" align="stretch" maxH="400px" overflowY="auto" pr={2}>
        {tasks.map((task) => (
          <Card
            key={task.id}
            variant="glow"
            borderLeft="4px solid"
            borderColor={getPriorityColor(task.priority)}
            boxShadow={getPriorityGlow(task.priority)}
            opacity={task.completed ? 0.8 : 1}
          >
            <CardBody p={3}>
              <HStack spacing={3} align="start">
                <Checkbox
                  isChecked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  colorScheme={task.completed ? 'green' : task.priority === 'high' ? 'red' : 'purple'}
                  size="lg"
                  boxShadow={task.completed ? '0 0 10px rgba(72, 187, 120, 0.5)' : 'none'}
                />
                
                <Box flex={1}>
                  {editingTask === task.id ? (
                    <HStack>
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        size="sm"
                        autoFocus
                      />
                      <Button size="sm" onClick={() => saveEdit(task.id)} colorScheme="green">
                        Save
                      </Button>
                    </HStack>
                  ) : (
                    <Text
                      textDecoration={task.completed ? 'line-through' : 'none'}
                      color={task.completed ? 'gray.500' : 'white'}
                      fontSize="sm"
                      fontWeight={task.priority === 'high' ? 'bold' : 'normal'}
                    >
                      {task.text}
                    </Text>
                  )}
                  
                  <HStack spacing={4} mt={2}>
                    <Badge
                      colorScheme={task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'purple' : 'gray'}
                      fontSize="xx-small"
                      boxShadow={getPriorityGlow(task.priority)}
                    >
                      {task.priority.toUpperCase()}
                    </Badge>
                    
                    <HStack spacing={1}>
                      <Calendar size={12} />
                      <Text fontSize="xs" color="gray.400">{task.dueDate}</Text>
                    </HStack>
                    
                    <HStack spacing={1}>
                      <Zap size={12} color="#FFD700" />
                      <Text fontSize="xs" color="yellow.300">{task.points} pts</Text>
                    </HStack>
                    
                    {task.assignedTo.length > 0 && (
                      <HStack spacing={1}>
                        <Users size={12} />
                        <AvatarGroup size="xs" max={2}>
                          {task.assignedTo.map((person, idx) => (
                            <Avatar key={idx} name={person} size="xs" />
                          ))}
                        </AvatarGroup>
                      </HStack>
                    )}
                  </HStack>
                </Box>
                
                <HStack spacing={1}>
                  <Tooltip label="Edit task" hasArrow>
                    <IconButton
                      icon={<EditIcon />}
                      size="sm"
                      variant="ghost"
                      onClick={() => startEdit(task)}
                      _hover={{ bg: 'purple.700', boxShadow: 'glow.purple' }}
                    />
                  </Tooltip>
                  <Tooltip label="Delete task" hasArrow>
                    <IconButton
                      icon={<DeleteIcon />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => deleteTask(task.id)}
                      _hover={{ bg: 'red.700', boxShadow: 'glow.red' }}
                    />
                  </Tooltip>
                </HStack>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </VStack>

      {tasks.length === 0 && (
        <Box textAlign="center" py={8} className="glow-border" borderRadius="lg">
          <Target size={48} color="#805ad5" />
          <Text color="gray.400" mt={2}>No tasks yet. Add some to get started!</Text>
        </Box>
      )}
    </VStack>
  )
}

export default TaskList