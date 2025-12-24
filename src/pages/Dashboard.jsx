import { useState } from "react";
import {
  Container,
  Grid,
  GridItem,
  Card,
  CardBody,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Input,
  InputGroup,
  InputRightElement,
  Avatar,
  AvatarGroup,
  Heading,
  Box,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Copy, Users, Plus, Clock, Trophy, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle";

const MotionCard = motion(Card);

const logoUrl =
  "https://res.cloudinary.com/dphier2de/image/upload/v1766409974/ChatGPT_Image_Dec_22_2025_06_07_10_PM_vevlzz.png";

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [groupCode, setGroupCode] = useState("WEBDEV");

  const pageBg = useColorModeValue(
    "linear-gradient(135deg, #EEF2FF 0%, #ECFEFF 100%)",
    "#020617"
  );

  const cardBg = useColorModeValue("white", "#020617");

  return (
    <Box minH="100vh" bg={pageBg}>
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="stretch">
          {/* HEADER */}
          <MotionCard
            bg={cardBg}
            borderLeft="6px solid"
            borderColor="blue.500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CardBody>
              <HStack justify="space-between" align="center">
                {/* TEXT LOGO */}
                <VStack align="start" spacing={0}>
                  <Text
                    fontSize={{ base: "2xl", md: "3xl" }}
                    fontWeight="900"
                    letterSpacing="1px"
                    color="blue.500"
                  >
                    SyncScholars
                  </Text>
                  <Text fontSize="sm" color="green.500" fontWeight="600">
                    Virtual Study Dashboard
                  </Text>
                </VStack>

                {/* ACTIONS */}
                <HStack spacing={3}>
                  <ThemeToggle />
                  <Button variant="outline" onClick={onLogout}>
                    Logout
                  </Button>
                  <Button
                    leftIcon={<Plus />}
                    colorScheme="blue"
                    onClick={() => navigate("/study/NEW")}
                  >
                    Create Group
                  </Button>
                </HStack>
              </HStack>
            </CardBody>
          </MotionCard>

          {/* STATS */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={6}>
            {[
              {
                icon: <Clock />,
                label: "Study Time",
                value: "25h 30m",
                color: "blue",
              },
              {
                icon: <Trophy />,
                label: "Streak",
                value: "7 Days",
                color: "green",
              },
              {
                icon: <Users />,
                label: "Sessions",
                value: "42",
                color: "teal",
              },
            ].map((s, i) => (
              <GridItem key={i}>
                <MotionCard
                  bg={cardBg}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  borderTop="4px solid"
                  borderColor={`${s.color}.400`}
                >
                  <CardBody>
                    <HStack spacing={4}>
                      <Box color={`${s.color}.500`}>{s.icon}</Box>
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" color="gray.500">
                          {s.label}
                        </Text>
                        <Text fontSize="xl" fontWeight="bold">
                          {s.value}
                        </Text>
                      </VStack>
                    </HStack>
                  </CardBody>
                </MotionCard>
              </GridItem>
            ))}
          </Grid>

          {/* JOIN GROUP */}
          <MotionCard
            bg={cardBg}
            borderLeft="6px solid"
            borderColor="green.500"
            whileHover={{ scale: 1.01 }}
          >
            <CardBody>
              <VStack spacing={4}>
                <Heading size="sm" color="green.600">
                  Join Active Group
                </Heading>
                <InputGroup>
                  <Input
                    value={groupCode}
                    onChange={(e) => setGroupCode(e.target.value)}
                  />
                  <InputRightElement>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => navigator.clipboard.writeText(groupCode)}
                    >
                      <Copy size={16} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Button
                  w="100%"
                  colorScheme="green"
                  onClick={() => navigate(`/study/${groupCode}`)}
                >
                  Join Group
                </Button>
              </VStack>
            </CardBody>
          </MotionCard>

          {/* GROUP LIST */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={6}>
            {["Web Dev Masters", "Data Science"].map((g, i) => (
              <MotionCard
                key={i}
                bg={cardBg}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                borderTop="4px solid"
                borderColor="blue.300"
              >
                <CardBody>
                  <VStack align="stretch" spacing={3}>
                    <Badge colorScheme="green" w="fit-content">
                      Active
                    </Badge>
                    <Heading size="sm">{g}</Heading>
                    <AvatarGroup size="sm">
                      <Avatar />
                      <Avatar />
                      <Avatar />
                    </AvatarGroup>
                    <Button
                      rightIcon={<ArrowRight />}
                      colorScheme="blue"
                      variant="outline"
                    >
                      Enter Group
                    </Button>
                  </VStack>
                </CardBody>
              </MotionCard>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Dashboard;
