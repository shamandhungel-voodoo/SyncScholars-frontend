import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Badge,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Image,
  MenuGroup,
  MenuDivider,
  Stack,
  useToast,
  Divider,
  Center,
} from "@chakra-ui/react";
import {
  Menu as MenuIcon,
  LogOut,
  User,
  Settings,
  Bell,
  MessageSquare,
  Users,
  Home,
  Volume2,
  VolumeX,
  Video,
  ScreenShare,
  Target,
  Clock,
  CheckSquare,
  Gamepad2,
  BarChart3,
  BookOpen,
  ChevronRight,
  Plus,
  X,
  Zap,
  Flame,
  Crown,
  Star,
  Eye,
  EyeOff,
  UserCircle,
  Calculator,
  Award,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isNotificationsOpen,
    onOpen: onNotificationsOpen,
    onClose: onNotificationsClose,
  } = useDisclosure();
  const toast = useToast();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [muteAll, setMuteAll] = useState(false);

  const logoUrl =
    "https://res.cloudinary.com/dphier2de/image/upload/v1766409974/ChatGPT_Image_Dec_22_2025_06_07_10_PM_vevlzz.png";

  useEffect(() => {
    // Demo notifications
    const demoNotifications = [
      {
        id: 1,
        type: "timer",
        title: "Study Session Complete!",
        message: "Great job! You completed a 25-minute focus session.",
        time: "2 minutes ago",
        read: false,
        icon: <Clock size={16} color="#805ad5" />,
        color: "purple",
      },
      {
        id: 2,
        type: "achievement",
        title: "New Achievement Unlocked!",
        message: 'You earned the "Study Warrior" badge for 7-day streak.',
        time: "1 hour ago",
        read: false,
        icon: <Crown size={16} color="#D69E2E" />,
        color: "yellow",
      },
      {
        id: 3,
        type: "group",
        title: "New Member Joined",
        message: 'Alex joined your study group "Web Dev Masters".',
        time: "3 hours ago",
        read: true,
        icon: <Users size={16} color="#4299E1" />,
        color: "blue",
      },
      {
        id: 4,
        type: "task",
        title: "Task Due Tomorrow",
        message: '"Complete React Components" is due tomorrow.',
        time: "5 hours ago",
        read: true,
        icon: <CheckSquare size={16} color="#38A169" />,
        color: "green",
      },
      {
        id: 5,
        type: "game",
        title: "Break Game Challenge",
        message: "Taylor beat your high score in Word Race!",
        time: "1 day ago",
        read: true,
        icon: <Gamepad2 size={16} color="#E53E3E" />,
        color: "red",
      },
    ];
    setNotifications(demoNotifications);
    setUnreadCount(demoNotifications.filter((n) => !n.read).length);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/");
    toast({
      title: "Logged out successfully",
      status: "info",
      duration: 3000,
      position: "top",
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
    toast({
      title: "All notifications marked as read",
      status: "success",
      duration: 2000,
      position: "top",
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    toast({
      title: "All notifications cleared",
      status: "info",
      duration: 2000,
      position: "top",
    });
  };

  const addDemoNotification = () => {
    const newNotification = {
      id: Date.now(),
      type: "demo",
      title: "Demo Notification",
      message: "This is a demo notification to show how notifications work.",
      time: "Just now",
      read: false,
      icon: <Zap size={16} color="#805ad5" />,
      color: "purple",
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setUnreadCount((prev) => prev + 1);

    // Show desktop notification if supported
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("StudyCord Notification", {
        body: "Demo notification added!",
        icon: logoUrl,
      });
    }

    toast({
      title: "Demo Notification Added",
      description: "Check your notifications panel",
      status: "success",
      duration: 3000,
      position: "top",
    });
  };

  const toggleMuteAll = () => {
    setMuteAll(!muteAll);
    toast({
      title: muteAll ? "🔊 Notifications unmuted" : "🔇 Notifications muted",
      status: "info",
      duration: 2000,
      position: "top",
    });
  };

  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          toast({
            title: "Notifications enabled",
            description: "You will receive desktop notifications",
            status: "success",
            duration: 3000,
          });
        }
      });
    }
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: <Home size={18} />,
      path: "/dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      label: "Messages",
      icon: <MessageSquare size={18} />,
      path: "/messages",
      onClick: () => navigate("/messages"),
    },
  ];

  return (
    <>
      <Box
        bg="gray.900"
        borderBottom="1px solid"
        borderColor="purple.800"
        position="sticky"
        top="0"
        zIndex="1000"
        backdropFilter="blur(10px)"
      >
        <Flex h="16" alignItems="center" justifyContent="space-between" px={4}>
          {/* Logo and Mobile Menu */}
          <HStack spacing={4}>
            <IconButton
              icon={<MenuIcon />}
              variant="ghost"
              aria-label="Open menu"
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              color="purple.300"
              _hover={{ bg: "purple.800", boxShadow: "0 0 15px rgba(128, 90, 213, 0.5)" }}
            />
            <HStack
              spacing={2}
              cursor="pointer"
              onClick={() => navigate("/dashboard")}
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
              alignItems="center"
            >
              <Image
                src={logoUrl}
                alt="StudyCord Logo"
                height="60px"
                width="auto"
                maxHeight="75px"
                maxWidth="300px"
                objectFit="contain"
              />
              <Badge
                colorScheme="purple"
                variant="solid"
                fontSize="xs"
                px={2}
                py={0.5}
                boxShadow="0 0 8px rgba(128, 90, 213, 0.5)"
                ml={1}
              >
                BETA
              </Badge>
            </HStack>
          </HStack>

          {/* Desktop Navigation */}
          <HStack spacing={4} display={{ base: "none", md: "flex" }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                leftIcon={item.icon}
                size="sm"
                onClick={item.onClick}
                _hover={{
                  bg: "purple.800",
                  transform: "translateY(-2px)",
                  boxShadow: "0 0 15px rgba(128, 90, 213, 0.5)",
                }}
                color={
                  location.pathname === item.path ? "purple.300" : "gray.300"
                }
                borderBottom={
                  location.pathname === item.path ? "2px solid" : "none"
                }
                borderColor="purple.500"
                transition="all 0.2s"
              >
                {item.label}
              </Button>
            ))}
          </HStack>

          {/* Right Side */}
          <HStack spacing={3}>
            {/* Notification Bell with Badge */}
            <Menu
              isOpen={isNotificationsOpen}
              onOpen={onNotificationsOpen}
              onClose={onNotificationsClose}
              placement="bottom-end"
            >
              <MenuButton
                as={IconButton}
                icon={<Bell size={18} />}
                variant="ghost"
                aria-label="Notifications"
                position="relative"
                _hover={{ bg: "purple.800", boxShadow: "0 0 15px rgba(128, 90, 213, 0.5)" }}
                color="white"
              >
                {unreadCount > 0 && (
                  <Badge
                    position="absolute"
                    top="0"
                    right="0"
                    colorScheme="red"
                    borderRadius="full"
                    fontSize="xs"
                    minW="5"
                    h="5"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    boxShadow="0 0 8px rgba(245, 101, 101, 0.5)"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </MenuButton>
              <MenuList 
                bg="gray.800" 
                borderColor="purple.700"
                maxW="400px" 
                maxH="500px" 
                overflowY="auto"
              >
                <MenuGroup title="Notifications" px={3} pt={2} color="white">
                  <HStack justify="space-between" px={3} pb={2}>
                    <Badge colorScheme="purple" boxShadow="0 0 8px rgba(128, 90, 213, 0.5)">
                      {unreadCount} unread
                    </Badge>
                    <HStack spacing={2}>
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAllAsRead();
                        }}
                        _hover={{ bg: "purple.800" }}
                        color="white"
                      >
                        Mark all read
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearAllNotifications();
                        }}
                        _hover={{ bg: "red.800" }}
                        color="white"
                      >
                        Clear all
                      </Button>
                    </HStack>
                  </HStack>
                </MenuGroup>
                <MenuDivider borderColor="gray.700" />

                {notifications.length === 0 ? (
                  <VStack py={8} px={4} spacing={3}>
                    <Bell size={32} color="#718096" />
                    <Text color="gray.500" textAlign="center">
                      No notifications yet
                    </Text>
                  </VStack>
                ) : (
                  <VStack
                    spacing={0}
                    align="stretch"
                    maxH="350px"
                    overflowY="auto"
                  >
                    {notifications.map((notification) => (
                      <MenuItem
                        key={notification.id}
                        bg={notification.read ? "gray.900" : "purple.900/30"}
                        borderLeft={notification.read ? "none" : "3px solid"}
                        borderColor={notification.color + ".500"}
                        py={3}
                        px={4}
                        _hover={{ bg: "purple.800/50" }}
                        color="white"
                      >
                        <HStack spacing={3} align="start" w="full">
                          <Box
                            p={2}
                            bg={`${notification.color}.900/30`}
                            borderRadius="lg"
                            boxShadow={`0 0 10px var(--chakra-colors-${notification.color}-500)`}
                          >
                            {notification.icon}
                          </Box>
                          <Stack spacing={1} flex={1}>
                            <Text fontSize="sm" fontWeight="bold">
                              {notification.title}
                            </Text>
                            <Text fontSize="xs" color="gray.400">
                              {notification.message}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              {notification.time}
                            </Text>
                          </Stack>
                          {!notification.read && (
                            <Box
                              w="2"
                              h="2"
                              bg={`${notification.color}.500`}
                              borderRadius="full"
                              boxShadow={`0 0 8px var(--chakra-colors-${notification.color}-500)`}
                            />
                          )}
                        </HStack>
                      </MenuItem>
                    ))}
                  </VStack>
                )}

                <MenuDivider borderColor="gray.700" />
                <VStack spacing={1} p={3}>
                  <Button
                    size="sm"
                    w="full"
                    colorScheme="purple"
                    leftIcon={<Zap size={14} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      addDemoNotification();
                      onNotificationsClose();
                    }}
                    boxShadow="0 0 15px rgba(128, 90, 213, 0.5)"
                    _hover={{ boxShadow: "0 0 20px rgba(128, 90, 213, 0.8)" }}
                  >
                    Add Demo Notification
                  </Button>
                  <Button
                    size="sm"
                    w="full"
                    variant="outline"
                    leftIcon={
                      muteAll ? <EyeOff size={14} /> : <Eye size={14} />
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMuteAll();
                    }}
                    colorScheme={muteAll ? "red" : "gray"}
                    color="white"
                  >
                    {muteAll ? "Notifications Muted" : "Mute Notifications"}
                  </Button>
                  <Button
                    size="xs"
                    w="full"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      requestNotificationPermission();
                    }}
                    color="white"
                  >
                    Enable Desktop Notifications
                  </Button>
                </VStack>
              </MenuList>
            </Menu>

            {/* User Menu with Math Genius Calculator Icon */}
            <Menu>
              <MenuButton>
                <HStack spacing={2}>
                  {/* Math Genius Calculator Icon */}
                  <Center
                    w="40px"
                    h="40px"
                    borderRadius="lg"
                    bg="purple.700"
                    border="2px solid"
                    borderColor="purple.500"
                    boxShadow="0 0 15px rgba(128, 90, 213, 0.6)"
                    _hover={{
                      boxShadow: "0 0 20px rgba(128, 90, 213, 0.8)",
                      transform: "scale(1.05)",
                      borderColor: "purple.300",
                    }}
                    transition="all 0.2s"
                    position="relative"
                    overflow="hidden"
                    _before={{
                      content: '""',
                      position: "absolute",
                      top: "-50%",
                      left: "-50%",
                      width: "200%",
                      height: "200%",
                      background: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
                      transform: "rotate(45deg)",
                      animation: "shine 2s infinite",
                    }}
                  >
                    <Calculator size={22} color="#e0e0e0" />
                  </Center>
                  <VStack
                    align="start"
                    spacing={0}
                    display={{ base: "none", md: "flex" }}
                  >
                    <Text fontSize="sm" fontWeight="medium" color="white">
                      Alex Johnson
                    </Text>
                    <Text fontSize="xs" color="purple.200">
                      MATH GENIUS
                    </Text>
                  </VStack>
                </HStack>
              </MenuButton>
              <MenuList bg="gray.800" borderColor="purple.700">
                <MenuGroup title="Math Genius" color="white">
                  <MenuItem 
                    icon={<Calculator size={16} color="#805ad5" />}
                    bg="gray.800"
                    _hover={{ bg: "gray.700" }}
                    color="white"
                  >
                    View Math Profile
                  </MenuItem>
                  <MenuItem 
                    icon={<BookOpen size={16} color="#805ad5" />}
                    bg="gray.800"
                    _hover={{ bg: "gray.700" }}
                    color="white"
                  >
                    Math Tools
                  </MenuItem>
                  <MenuItem 
                    icon={<Award size={16} color="#805ad5" />}
                    bg="gray.800"
                    _hover={{ bg: "gray.700" }}
                    color="white"
                  >
                    Math Achievements
                  </MenuItem>
                </MenuGroup>
                <MenuDivider borderColor="gray.700" />
                <MenuGroup title="Account" color="white">
                  <MenuItem 
                    icon={<User size={16} color="#805ad5" />}
                    bg="gray.800"
                    _hover={{ bg: "gray.700" }}
                    color="white"
                  >
                    View Profile
                  </MenuItem>
                  <MenuItem 
                    icon={<Settings size={16} color="#805ad5" />}
                    bg="gray.800"
                    _hover={{ bg: "gray.700" }}
                    color="white"
                  >
                    Settings
                  </MenuItem>
                </MenuGroup>
                <MenuDivider borderColor="gray.700" />
                <MenuItem
                  icon={<LogOut size={16} color="#805ad5" />}
                  color="white"
                  onClick={handleLogout}
                  _hover={{ bg: "red.900", color: "white" }}
                  bg="gray.800"
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
        <DrawerContent
          bg="gray.900"
          borderRight="2px solid"
          borderColor="purple.700"
          boxShadow="20px 0 40px rgba(0, 0, 0, 0.5)"
        >
          <DrawerCloseButton color="white" />
          <DrawerHeader
            borderBottom="2px solid"
            borderColor="purple.700"
            bg="gray.900"
          >
            <HStack spacing={3}>
              <Image
                src={logoUrl}
                alt="StudyCord Logo"
                height="53px"
                width="auto"
                maxHeight="66px"
                objectFit="contain"
              />
              <Text fontSize="lg" fontWeight="bold" color="white">
                StudyCord
              </Text>
              <Badge
                colorScheme="purple"
                variant="solid"
                fontSize="xs"
                px={2}
                py={0.5}
                boxShadow="0 0 8px rgba(128, 90, 213, 0.5)"
              >
                BETA
              </Badge>
            </HStack>
          </DrawerHeader>
          <DrawerBody py={6}>
            <VStack spacing={2} align="stretch">
              {/* Mobile User Profile with Calculator Icon */}
              <HStack spacing={3} p={4} bg="purple.900/30" borderRadius="lg" mb={4}>
                <Center
                  w="48px"
                  h="48px"
                  borderRadius="lg"
                  bg="purple.700"
                  border="2px solid"
                  borderColor="purple.500"
                  boxShadow="0 0 15px rgba(128, 90, 213, 0.6)"
                >
                  <Calculator size={28} color="#e0e0e0" />
                </Center>
                <VStack align="start" spacing={0}>
                  <Text fontSize="md" fontWeight="bold" color="white">
                    Alex Johnson
                  </Text>
                  <Text fontSize="xs" color="purple.200">
                    MATH GENIUS
                  </Text>
                  <Badge colorScheme="purple" fontSize="xs" mt={1}>
                    Level 12
                  </Badge>
                </VStack>
              </HStack>

              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={item.icon}
                  onClick={() => {
                    item.onClick();
                    onClose();
                  }}
                  bg={
                    location.pathname === item.path
                      ? "purple.900"
                      : "transparent"
                  }
                  color={
                    location.pathname === item.path ? "purple.300" : "gray.300"
                  }
                  borderLeft={
                    location.pathname === item.path ? "4px solid" : "none"
                  }
                  borderColor="purple.500"
                  _hover={{
                    bg: "purple.800",
                    color: "white",
                    transform: "translateX(4px)",
                  }}
                  transition="all 0.2s"
                  py={4}
                  pl={4}
                >
                  {item.label}
                </Button>
              ))}

              <Divider my={4} borderColor="purple.800" />

              <VStack spacing={3} align="stretch" pt={4}>
                <Text fontSize="xs" color="gray.500" px={4}>
                  MATH TOOLS
                </Text>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={<Calculator size={16} />}
                  onClick={() => {
                    navigate('/math-tools');
                    onClose();
                  }}
                  py={3}
                  pl={4}
                  color="white"
                >
                  Calculator
                </Button>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={<BookOpen size={16} />}
                  onClick={() => {
                    navigate('/textbooks');
                    onClose();
                  }}
                  py={3}
                  pl={4}
                  color="white"
                >
                  Textbooks
                </Button>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={<Target size={16} />}
                  onClick={() => {
                    navigate('/practice-tests');
                    onClose();
                  }}
                  py={3}
                  pl={4}
                  color="white"
                >
                  Practice Tests
                </Button>
              </VStack>

              <Divider my={4} borderColor="purple.800" />

              <VStack spacing={3} align="stretch" pt={4}>
                <Text fontSize="xs" color="gray.500" px={4}>
                  NOTIFICATIONS
                </Text>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={<Bell size={16} />}
                  onClick={() => {
                    onNotificationsOpen();
                    onClose();
                  }}
                  py={3}
                  pl={4}
                  color="white"
                >
                  <HStack justify="space-between" w="full">
                    <Text>Notifications</Text>
                    {unreadCount > 0 && (
                      <Badge
                        colorScheme="red"
                        borderRadius="full"
                        minW="5"
                        h="5"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        boxShadow="0 0 8px rgba(245, 101, 101, 0.5)"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </HStack>
                </Button>

                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={<User size={16} />}
                  onClick={() => {
                    navigate('/profile');
                    onClose();
                  }}
                  py={3}
                  pl={4}
                  color="white"
                >
                  Profile
                </Button>

                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={<Settings size={16} />}
                  onClick={() => {
                    navigate('/settings');
                    onClose();
                  }}
                  py={3}
                  pl={4}
                  color="white"
                >
                  Settings
                </Button>
              </VStack>

              <Divider my={4} borderColor="purple.800" />

              <Button
                w="full"
                leftIcon={<LogOut size={16} />}
                colorScheme="red"
                variant="outline"
                color="white"
                onClick={() => {
                  handleLogout();
                  onClose();
                }}
                mt="auto"
                boxShadow="0 0 15px rgba(229, 62, 62, 0.5)"
                _hover={{ boxShadow: "0 0 20px rgba(229, 62, 62, 0.8)", color: "white" }}
              >
                Logout
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Notifications Panel for Mobile */}
      <Drawer
        placement="right"
        onClose={onNotificationsClose}
        isOpen={isNotificationsOpen}
        size="sm"
      >
        <DrawerOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
        <DrawerContent
          bg="gray.900"
          borderLeft="2px solid"
          borderColor="purple.700"
          boxShadow="-20px 0 40px rgba(0, 0, 0, 0.5)"
        >
          <DrawerHeader
            borderBottom="2px solid"
            borderColor="purple.700"
            bg="gray.900"
          >
            <HStack justify="space-between">
              <HStack spacing={3}>
                <Bell size={20} color="#805ad5" />
                <Text fontWeight="bold" color="white">Notifications</Text>
              </HStack>
              <Badge colorScheme="purple" boxShadow="0 0 8px rgba(128, 90, 213, 0.5)">
                {unreadCount} unread
              </Badge>
            </HStack>
            <DrawerCloseButton color="white" />
          </DrawerHeader>
          <DrawerBody py={0}>
            {notifications.length === 0 ? (
              <VStack py={12} px={4} spacing={4}>
                <Bell size={48} color="#718096" />
                <Text color="gray.500" textAlign="center">
                  No notifications yet
                </Text>
                <Button
                  colorScheme="purple"
                  leftIcon={<Zap size={16} />}
                  onClick={addDemoNotification}
                  boxShadow="0 0 15px rgba(128, 90, 213, 0.5)"
                  mt={4}
                >
                  Add Demo Notification
                </Button>
              </VStack>
            ) : (
              <VStack spacing={0} align="stretch">
                {notifications.map((notification) => (
                  <Box
                    key={notification.id}
                    p={4}
                    borderBottom="1px solid"
                    borderBottomColor="gray.800"
                    bg={notification.read ? "gray.900" : "purple.900/20"}
                    sx={{
                      borderLeft: notification.read ? "none" : "4px solid",
                      borderLeftColor: notification.read
                        ? undefined
                        : `${notification.color}.500`,
                    }}
                  >
                    <HStack spacing={3} align="start">
                      <Box
                        p={2}
                        bg={`${notification.color}.900/30`}
                        borderRadius="lg"
                      >
                        {notification.icon}
                      </Box>
                      <Stack spacing={1} flex={1}>
                        <Text fontSize="sm" fontWeight="bold" color="white">
                          {notification.title}
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          {notification.message}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {notification.time}
                        </Text>
                      </Stack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
          </DrawerBody>
          <Box
            p={4}
            borderTop="2px solid"
            borderColor="purple.700"
            bg="gray.900"
          >
            <VStack spacing={2}>
              <Button
                size="sm"
                w="full"
                variant="outline"
                onClick={addDemoNotification}
                leftIcon={<Plus size={14} />}
                colorScheme="purple"
                color="white"
              >
                Add Demo
              </Button>
              <Button
                size="sm"
                w="full"
                variant="outline"
                onClick={markAllAsRead}
                colorScheme="green"
                color="white"
              >
                Mark All Read
              </Button>
              <Button
                size="sm"
                w="full"
                variant="outline"
                onClick={clearAllNotifications}
                colorScheme="red"
                color="white"
              >
                Clear All
              </Button>
            </VStack>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;