import { IconButton, useColorMode } from '@chakra-ui/react'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === 'dark' ? <Sun /> : <Moon />}
      onClick={toggleColorMode}
      variant="outline"
    />
  )
}

export default ThemeToggle
