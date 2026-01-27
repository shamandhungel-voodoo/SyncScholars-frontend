import { useState } from 'react'
import {
  VStack,
  HStack,
  Text,
  Box,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Button,
  Badge,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  AvatarGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Progress,
} from '@chakra-ui/react'
import {
  BookOpen,
  FileText,
  Video,
  Link,
  Download,
  Share2,
  Star,
  Eye,
  MessageSquare,
  Calendar,
  User,
  Search,
  Filter,
  Plus,
  MoreVertical,
  ExternalLink,
  Bookmark,
  ThumbsUp,
} from 'lucide-react'

const Resources = ({ groupId }) => {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'React Hooks Complete Guide',
      type: 'pdf',
      author: 'Alex',
      date: '2 days ago',
      downloads: 142,
      likes: 89,
      size: '2.4 MB',
      color: 'purple',
      tags: ['react', 'hooks', 'guide'],
      isBookmarked: true,
    },
    {
      id: 2,
      title: 'WebSocket Implementation Tutorial',
      type: 'video',
      author: 'Taylor',
      date: '1 week ago',
      downloads: 76,
      likes: 45,
      size: '45 MB',
      color: 'red',
      tags: ['websocket', 'tutorial', 'real-time'],
      isBookmarked: false,
    },
    {
      id: 3,
      title: 'MongoDB Schema Design Patterns',
      type: 'link',
      author: 'Jordan',
      date: '3 days ago',
      downloads: 98,
      likes: 67,
      size: 'Web Link',
      color: 'blue',
      tags: ['mongodb', 'database', 'design'],
      isBookmarked: true,
    },
    {
      id: 4,
      title: 'TypeScript Best Practices',
      type: 'pdf',
      author: 'Casey',
      date: '5 days ago',
      downloads: 210,
      likes: 134,
      size: '1.8 MB',
      color: 'green',
      tags: ['typescript', 'best-practices'],
      isBookmarked: false,
    },
    {
      id: 5,
      title: 'Chakra UI Components Demo',
      type: 'code',
      author: 'Morgan',
      date: '1 day ago',
      downloads: 56,
      likes: 32,
      size: '3.2 MB',
      color: 'yellow',
      tags: ['chakra-ui', 'components', 'demo'],
      isBookmarked: true,
    },
    {
      id: 6,
      title: 'Node.js REST API Tutorial',
      type: 'video',
      author: 'Riley',
      date: '2 weeks ago',
      downloads: 187,
      likes: 98,
      size: '120 MB',
      color: 'orange',
      tags: ['nodejs', 'api', 'rest'],
      isBookmarked: false,
    },
  ])

  const toggleBookmark = (id) => {
    setResources(resources.map(resource =>
      resource.id === id
        ? { ...resource, isBookmarked: !resource.isBookmarked }
        : resource
    ))
  }

  const addResource = () => {
    const newResource = {
      id: resources.length + 1,
      title: 'New Study Material',
      type: 'pdf',
      author: 'You',
      date: 'Just now',
      downloads: 0,
      likes: 0,
      size: '0 MB',
      color: 'purple',
      tags: ['new'],
      isBookmarked: false,
    }
    setResources([newResource, ...resources])
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText size={20} />
      case 'video': return <Video size={20} />
      case 'link': return <Link size={20} />
      case 'code': return <BookOpen size={20} />
      default: return <FileText size={20} />
    }
  }

  const getColorScheme = (color) => {
    return color
  }

  return (
    <VStack spacing={6} w="100%" className="glow-border" p={6} borderRadius="xl" bg="gray.900">
      <Flex w="100%" justify="space-between" align="center">
        <HStack spacing={3}>
          <Box p={2} bg="purple.700" borderRadius="lg" boxShadow="glow.purple">
            <BookOpen size={20} />
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontSize="xl" fontWeight="bold" className="glow-text">
              Study Resources
            </Text>
            <Text fontSize="sm" color="gray.400">
              Share and access learning materials
            </Text>
          </VStack>
        </HStack>
        <Button
          leftIcon={<Plus />}
          colorScheme="purple"
          boxShadow="glow.purple"
          _hover={{ boxShadow: '0 0 30px rgba(128, 90, 213, 0.8)' }}
          onClick={addResource}
        >
          Add Resource
        </Button>
      </Flex>

      {/* Search and Filter */}
      <HStack w="100%" spacing={4}>
        <InputGroup flex={1}>
          <InputLeftElement pointerEvents="none">
            <Search size={16} color="gray.500" />
          </InputLeftElement>
          <Input
            placeholder="Search resources..."
            bg="gray.800"
            borderColor="purple.600"
            _focus={{ borderColor: 'purple.400' }}
          />
        </InputGroup>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<Filter />}
            colorScheme="purple"
            variant="outline"
            _hover={{ boxShadow: 'glow.purple' }}
          />
          <MenuList bg="gray.900" borderColor="purple.700" boxShadow="glow.purple">
            <MenuItem bg="gray.900" _hover={{ bg: 'purple.800' }}>All Resources</MenuItem>
            <MenuItem bg="gray.900" _hover={{ bg: 'purple.800' }}>PDF Files</MenuItem>
            <MenuItem bg="gray.900" _hover={{ bg: 'purple.800' }}>Videos</MenuItem>
            <MenuItem bg="gray.900" _hover={{ bg: 'purple.800' }}>Links</MenuItem>
            <MenuItem bg="gray.900" _hover={{ bg: 'purple.800' }}>Code</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      {/* Stats */}
      <SimpleGrid columns={4} spacing={4} w="100%">
        <Box textAlign="center" p={3} bg="gray.800/50" borderRadius="lg">
          <Text fontSize="2xl" fontWeight="bold" color="purple.300">{resources.length}</Text>
          <Text fontSize="xs" color="gray.400">Total</Text>
        </Box>
        <Box textAlign="center" p={3} bg="gray.800/50" borderRadius="lg">
          <Text fontSize="2xl" fontWeight="bold" color="red.300">
            {resources.reduce((sum, r) => sum + r.downloads, 0)}
          </Text>
          <Text fontSize="xs" color="gray.400">Downloads</Text>
        </Box>
        <Box textAlign="center" p={3} bg="gray.800/50" borderRadius="lg">
          <Text fontSize="2xl" fontWeight="bold" color="green.300">
            {resources.reduce((sum, r) => sum + r.likes, 0)}
          </Text>
          <Text fontSize="xs" color="gray.400">Likes</Text>
        </Box>
        <Box textAlign="center" p={3} bg="gray.800/50" borderRadius="lg">
          <Text fontSize="2xl" fontWeight="bold" color="yellow.300">
            {resources.filter(r => r.isBookmarked).length}
          </Text>
          <Text fontSize="xs" color="gray.400">Bookmarked</Text>
        </Box>
      </SimpleGrid>

      {/* Resources Grid */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
        {resources.map((resource) => (
          <Card
            key={resource.id}
            variant="glow"
            border="2px solid"
            borderColor={`${resource.color}.600`}
            _hover={{
              transform: 'translateY(-5px)',
              boxShadow: `0 0 30px var(--chakra-colors-${resource.color}-500)`,
            }}
            transition="all 0.3s"
          >
            <CardBody>
              <VStack spacing={3} align="stretch">
                <Flex justify="space-between" align="start">
                  <HStack spacing={3}>
                    <Box
                      p={2}
                      bg={`${resource.color}.700`}
                      borderRadius="lg"
                      boxShadow={`0 0 15px var(--chakra-colors-${resource.color}-500)`}
                    >
                      {getTypeIcon(resource.type)}
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold">{resource.title}</Text>
                      <HStack spacing={2}>
                        <Text fontSize="sm" color="gray.400">
                          <User size={12} style={{ marginRight: '4px', display: 'inline' }} />
                          {resource.author}
                        </Text>
                        <Text fontSize="sm" color="gray.400">
                          <Calendar size={12} style={{ marginRight: '4px', display: 'inline' }} />
                          {resource.date}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  <IconButton
                    icon={resource.isBookmarked ? <Bookmark fill="currentColor" /> : <Bookmark />}
                    size="sm"
                    variant="ghost"
                    colorScheme={resource.isBookmarked ? 'yellow' : 'gray'}
                    onClick={() => toggleBookmark(resource.id)}
                    aria-label="Bookmark"
                  />
                </Flex>

                <HStack spacing={2}>
                  {resource.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      colorScheme={getColorScheme(resource.color)}
                      fontSize="xx-small"
                      boxShadow={`0 0 8px var(--chakra-colors-${resource.color}-500)`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </HStack>

                <Flex justify="space-between" align="center" pt={2}>
                  <HStack spacing={4}>
                    <Tooltip label="Downloads" hasArrow>
                      <HStack spacing={1}>
                        <Download size={14} />
                        <Text fontSize="sm">{resource.downloads}</Text>
                      </HStack>
                    </Tooltip>
                    <Tooltip label="Likes" hasArrow>
                      <HStack spacing={1}>
                        <ThumbsUp size={14} />
                        <Text fontSize="sm">{resource.likes}</Text>
                      </HStack>
                    </Tooltip>
                    <Tooltip label="Size" hasArrow>
                      <HStack spacing={1}>
                        <FileText size={14} />
                        <Text fontSize="sm">{resource.size}</Text>
                      </HStack>
                    </Tooltip>
                  </HStack>
                  
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<MoreVertical />}
                      size="sm"
                      variant="ghost"
                      _hover={{ bg: 'gray.700' }}
                    />
                    <MenuList bg="gray.900" borderColor="purple.700" boxShadow="glow.purple">
                      <MenuItem bg="gray.900" _hover={{ bg: 'purple.800' }}>
                        <Download size={14} style={{ marginRight: '8px' }} /> Download
                      </MenuItem>
                      <MenuItem bg="gray.900" _hover={{ bg: 'purple.800' }}>
                        <Share2 size={14} style={{ marginRight: '8px' }} /> Share
                      </MenuItem>
                      <MenuItem bg="gray.900" _hover={{ bg: 'purple.800' }}>
                        <ExternalLink size={14} style={{ marginRight: '8px' }} /> Open
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </VStack>
            </CardBody>
            
            <CardFooter pt={0}>
              <Button
                leftIcon={<Download />}
                colorScheme={getColorScheme(resource.color)}
                size="sm"
                w="100%"
                boxShadow={`0 0 15px var(--chakra-colors-${resource.color}-500)`}
                _hover={{ boxShadow: `0 0 25px var(--chakra-colors-${resource.color}-500)` }}
              >
                Download Resource
              </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      {resources.length === 0 && (
        <Box textAlign="center" py={8} className="glow-border" borderRadius="lg">
          <BookOpen size={48} color="#805ad5" />
          <Text color="gray.400" mt={2}>No resources yet. Add some study materials!</Text>
        </Box>
      )}
    </VStack>
  )
}

export default Resources