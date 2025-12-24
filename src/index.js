import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.jsx'

// Simple theme without complex animations
const theme = extendTheme({
  colors: {
    neon: {
      cyan: '#00f3ff',
      pink: '#ff00ff',
      purple: '#9d00ff',
    }
  },
  styles: {
    global: {
      body: {
        bg: '#0a0a0f',
        color: 'white',
        margin: 0,
        padding: 0,
      },
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          bg: 'linear-gradient(45deg, #ff00ff, #00f3ff)',
          color: 'white',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 20px rgba(0, 243, 255, 0.3)',
          },
        }
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)