import { HiDesktopComputer as Desktop, HiOutlineMoon as Moon, HiOutlineSun as Sun } from 'react-icons/hi'
import { IconType } from 'react-icons/lib'

type ThemeMenu = { value: string; name: string; icon: IconType }

export const MENU_THEME: ThemeMenu[] = [
  { name: 'System', icon: Desktop, value: 'system' },
  { name: 'Dark', icon: Moon, value: 'dark' },
  { name: 'Light', icon: Sun, value: 'light' }
]
