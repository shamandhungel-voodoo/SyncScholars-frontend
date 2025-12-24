import { Box, Container, VStack, HStack, Text, Link, Divider } from '@chakra-ui/react'
import { Cpu, Terminal, Code, Server, Database, Lock, Globe } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      as="footer"
      bg="white"
      borderTop="1px solid"
      borderColor="blue.200"
      py={8}
      mt="auto"
    >
      <Container maxW="container.xl">
        <VStack spacing={8} align="center">

          {/* Header */}
          <VStack spacing={2}>
            <HStack spacing={4}>
              <Terminal color="#2563EB" size={28} />
              <Text
                fontSize="2xl"
                fontWeight="900"
                fontFamily="'Rajdhani', sans-serif"
                color="blue.600"
                letterSpacing="2px"
              >
                SYSTEM SYNCSCHOLARS
              </Text>
              <Cpu color="#10B981" size={28} />
            </HStack>

            <Text color="gray.500" fontSize="sm" fontFamily="'Inter', sans-serif">
              &gt; VIRTUAL_STUDY_HUB_INTERFACE
            </Text>
          </VStack>

          <Divider borderColor="blue.100" />

          {/* Modules */}
          <HStack spacing={8} wrap="wrap" justify="center" fontSize="xs">
            {[
              { icon: Server, label: 'SERVER', status: 'ONLINE' },
              { icon: Database, label: 'DATABASE', status: 'ACTIVE' },
              { icon: Lock, label: 'SECURITY', status: 'ENABLED' },
              { icon: Globe, label: 'NETWORK', status: 'STABLE' },
              { icon: Code, label: 'SYSTEM', status: 'OPTIMAL' },
            ].map((m, i) => (
              <VStack key={i} spacing={1}>
                <m.icon size={20} color="#2563EB" />
                <Text color="blue.600">{m.label}</Text>
                <Text color="green.500">{m.status}</Text>
              </VStack>
            ))}
          </HStack>

          {/* Copyright */}
          <VStack spacing={1}>
            <Text color="blue.600" fontFamily="'Rajdhani', sans-serif">
              &gt; COPYRIGHT_{currentYear}_SYNCSCHOLARS
            </Text>
            <Text color="gray.500" fontSize="xs">
              DEVELOPED BY: SHAMAN DHUNGEL
            </Text>
          </VStack>

          {/* Links */}
          <HStack spacing={6} wrap="wrap" fontSize="xs">
            {[
              'TERMS_OF_SERVICE',
              'PRIVACY_POLICY',
              'SYSTEM_DOCS',
              'SUPPORT_PORTAL',
              'CONTACT_ADMIN',
            ].map((link, i) => (
              <Link
                key={i}
                href="#"
                color="blue.600"
                _hover={{ color: 'green.500' }}
              >
                &gt; {link}
              </Link>
            ))}
          </HStack>

          <Text color="gray.400" fontSize="2xs">
            &gt; BUILT_WITH: REACT • CHAKRA_UI • SOCKET.IO • MONGODB
          </Text>

        </VStack>
      </Container>
    </Box>
  )
}

export default Footer
