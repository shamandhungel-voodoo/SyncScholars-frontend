import { useState, useEffect } from 'react'
import {
  VStack, HStack, Input, Button, Checkbox, 
  Text, IconButton, Box, Badge
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

const TaskList = ({ groupId, socket }) => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    const demo = [
      { id: '1', text: 'Complete React components', completed: false },
      { id: '2', text: 'Study algorithms', completed: true },
      { id: '3', text: 'Prepare presentation', completed: false },
    ]
    setTasks(demo)
  }, [])

  const addTask = () => {
    if (!newTask.trim()) return
    const task = { id: Date.now().toString(), text: newTask, completed: false }
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

  const completedCount = tasks.filter(t => t.completed).length

  return (
    <VStack spacing={4} w="100%" bg="white" p={6} borderRadius="2xl" shadow="xl">
      <HStack w="100%" justify="space-between">
        <Text fontSize="xl" fontWeight="bold">📝 Group Tasks</Text>
        <Badge colorScheme="blue">{completedCount}/{tasks.length} done</Badge>
      </HStack>

      <HStack w="100%">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={addTask}>
          Add
        </Button>
      </HStack>

      <VStack spacing={2} w="100%" align="stretch">
        {tasks.map(task => (
          <HStack
            key={task.id}
            p={3}
            bg={task.completed ? 'green.50' : 'white'}
            borderRadius="lg"
            border="1px solid"
            borderColor={task.completed ? 'green.200' : 'gray.200'}
          >
            <Checkbox
              isChecked={task.completed}
              onChange={() => toggleTask(task.id)}
              colorScheme="green"
            />
            <Text
              flex={1}
              textDecoration={task.completed ? 'line-through' : 'none'}
              color={task.completed ? 'gray.500' : 'inherit'}
            >
              {task.text}
            </Text>
            <IconButton
              icon={<DeleteIcon />}
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={() => deleteTask(task.id)}
            />
          </HStack>
        ))}
      </VStack>

      {tasks.length === 0 && (
        <Text color="gray.500" py={4}>No tasks yet. Add some!</Text>
      )}
    </VStack>
  )
}

export default TaskList