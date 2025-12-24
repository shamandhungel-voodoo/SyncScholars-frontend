import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  HStack,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Users, Clock, MessageSquare, BarChart3 } from 'lucide-react'

const logoUrl =
  'https://res.cloudinary.com/dphier2de/image/upload/v1766409974/ChatGPT_Image_Dec_22_2025_06_07_10_PM_vevlzz.png'

const Home = () => {
  const navigate = useNavigate()

  const bg = useColorModeValue(
    'linear-gradient(135deg, #F8FAFF 0%, #ECFEFF 100%)',
    '#020617'
  )

  const cardBg = useColorModeValue('white', 'gray.900')
  const textMuted = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box minH="100vh" bg={bg}>
      <Container maxW="container.xl" py={20}>
        <VStack spacing={16}>

          {/* HERO */}
          <VStack spacing={6} textAlign="center">
            <Image
              src={logoUrl}
              maxW="520px"
              w="100%"
              h={{ base: '110px', md: '140px' }}
              objectFit="contain"
            />

            <Heading size="2xl" fontWeight="800">
              Study Smarter. Together.
            </Heading>

            <Text fontSize="lg" color={textMuted} maxW="600px">
              SyncScholars helps you stay focused with real-time study rooms,
              shared timers, and distraction-free collaboration.
            </Text>

            <HStack spacing={4}>
              <Button
                size="lg"
                colorScheme="blue"
                px={8}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                size="lg"
                variant="outline"
                px={8}
                onClick={() => navigate('/register')}
              >
                Create Account
              </Button>
            </HStack>
          </VStack>

          {/* FEATURES */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="100%">
            {[
              { icon: Users, title: 'Group Study', desc: 'Join focused study rooms with friends.' },
              { icon: Clock, title: 'Study Timers', desc: 'Pomodoro and session tracking built-in.' },
              { icon: MessageSquare, title: 'Live Chat', desc: 'Discuss instantly without switching apps.' },
              { icon: BarChart3, title: 'Analytics', desc: 'Track consistency and productivity.' },
            ].map((f, i) => (
              <Box
                key={i}
                bg={cardBg}
                p={8}
                borderRadius="xl"
                boxShadow="sm"
                _hover={{ boxShadow: 'md', transform: 'translateY(-4px)' }}
                transition="all 0.25s ease"
              >
                <VStack spacing={4} align="start">
                  <Box color="blue.500">
                    <f.icon size={28} />
                  </Box>
                  <Heading size="md">{f.title}</Heading>
                  <Text fontSize="sm" color={textMuted}>
                    {f.desc}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

        </VStack>
      </Container>
    </Box>
  )
}

export default Home
