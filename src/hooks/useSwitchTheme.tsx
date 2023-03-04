import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

export const useSwitchTheme = () => {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)
  const [dropdownIsOpen, setDropdown] = useState<boolean>(false)

  const toggleDropdown = useCallback(() => setDropdown((prev) => (prev ? false : true)), [])
  const closeDropdown = useCallback(() => setDropdown(false), [])

  const changeTheme = useCallback(
    (value: string) => {
      return () => {
        setTheme(value)
        closeDropdown()
      }
    },
    [setTheme, closeDropdown]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  return {
    mounted,
    changeTheme,
    theme,
    systemTheme,
    dropdownIsOpen,
    toggleDropdown,
    closeDropdown
  }
}
