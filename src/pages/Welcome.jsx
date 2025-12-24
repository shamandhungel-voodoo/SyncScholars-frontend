import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const logoUrl =
  'https://res.cloudinary.com/dphier2de/image/upload/v1766409974/ChatGPT_Image_Dec_22_2025_06_07_10_PM_vevlzz.png'

const Welcome = () => {
  const navigate = useNavigate()

  const bg = useColorModeValue(
    'linear-gradient(135deg, #EEF2FF 0%, #ECFEFF 100%)',
    '#020617'
  )

  const textColor = useColorModeValue('gray.700', 'gray.300')

  return (
    <Box
      minH="100vh"
      bg={bg}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="container.md">
        <VStack spacing={10} textAlign="center">

          {/* LOGO – HERO BANNER */}
          <Image
            src={logoUrl}
            w="100%"
            maxW="520px"
            h={{ base: '110px', md: '140px' }}
            objectFit="contain"
          />

          {/* TEXT */}
          <VStack spacing={3}>
            <Heading size="2xl" fontWeight="800">
              Sync Scholars
            </Heading>
            <Text fontSize="lg" color={textColor}>
              A modern collaborative study platform designed for focus,
              productivity, and real learning.
            </Text>
          </VStack>

          {/* CTA */}
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
              Get Started
            </Button>
          </HStack>

        </VStack>
      </Container>
    </Box>
  )
}

export default Welcome
