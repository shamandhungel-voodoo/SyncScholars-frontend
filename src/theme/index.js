import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    purple: {
      50: '#faf5ff',
      100: '#e9d8fd',
      200: '#d6bcfa',
      300: '#b794f4',
      400: '#9f7aea',
      500: '#805ad5',
      600: '#6b46c1',
      700: '#553c9a',
      800: '#44337a',
      900: '#322659',
      950: '#1a1038',
    },
    red: {
      50: '#fff5f5',
      100: '#fed7d7',
      200: '#feb2b2',
      300: '#fc8181',
      400: '#f56565',
      500: '#e53e3e',
      600: '#c53030',
      700: '#9b2c2c',
      800: '#822727',
      900: '#63171b',
      950: '#3b0a0e',
    },
    glow: {
      purple: '0 0 20px rgba(128, 90, 213, 0.6)',
      red: '0 0 20px rgba(229, 62, 62, 0.6)',
      white: '0 0 20px rgba(255, 255, 255, 0.4)',
    }
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'Consolas', monospace",
  },
  components: {
    Button: {
      variants: {
        glowPurple: {
          bg: 'purple.500',
          color: 'white',
          _hover: {
            bg: 'purple.600',
            transform: 'translateY(-2px)',
            boxShadow: 'glow.purple',
          },
          _active: {
            bg: 'purple.700',
          },
        },
        glowRed: {
          bg: 'red.500',
          color: 'white',
          _hover: {
            bg: 'red.600',
            transform: 'translateY(-2px)',
            boxShadow: 'glow.red',
          },
          _active: {
            bg: 'red.700',
          },
        },
      },
    },
    Card: {
      variants: {
        glow: {
          container: {
            bg: 'gray.900',
            border: '1px solid',
            borderColor: 'purple.700',
            borderRadius: '12px',
            boxShadow: '0 0 20px rgba(128, 90, 213, 0.3)',
            _hover: {
              boxShadow: 'glow.purple',
              transform: 'translateY(-5px)',
              transition: 'all 0.3s',
            },
          },
        },
      },
    },
    Menu: {
      parts: ['list', 'item'],
      baseStyle: {
        list: {
          bg: 'gray.900',
          border: '1px solid',
          borderColor: 'purple.700',
          boxShadow: '0 0 20px rgba(128, 90, 213, 0.5)',
        },
        item: {
          bg: 'gray.900',
          color: 'white',
          _hover: {
            bg: 'purple.800',
          },
          _focus: {
            bg: 'purple.800',
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.950',
        color: 'white',
        fontFamily: "'Inter', sans-serif",
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(128, 90, 213, 0.1) 0%, transparent 50%), radial-gradient(circle at 0% 0%, rgba(229, 62, 62, 0.1) 0%, transparent 50%)',
      },
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: 'gray.900',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'linear-gradient(45deg, purple.500, red.500)',
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: 'linear-gradient(45deg, purple.600, red.600)',
      },
      '.glow-text': {
        textShadow: '0 0 10px rgba(128, 90, 213, 0.8), 0 0 20px rgba(128, 90, 213, 0.5)',
      },
      '.glow-border': {
        boxShadow: '0 0 15px rgba(128, 90, 213, 0.4), inset 0 0 10px rgba(128, 90, 213, 0.2)',
      },
    },
  },
})