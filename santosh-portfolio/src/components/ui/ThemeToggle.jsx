import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { isDark, setIsDark } = useTheme()

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded-lg text-zinc-500 hover:text-teal-500 dark:text-zinc-400 dark:hover:text-teal-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
