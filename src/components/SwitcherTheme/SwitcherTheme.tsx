import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { HiCheck, HiOutlineMoon as Moon, HiOutlineSun as Sun } from 'react-icons/hi'

import { useSwitchTheme } from '@/hooks/useSwitchTheme'

import twclsx from '@/libs/twclsx'

import { MENU_THEME } from '@/constants/menuTheme.constant'

import Spinner from '@/components/Animation/Spinner'
import Button from '@/components/common/Button'

export default function SwitcherTheme() {
  const { theme, systemTheme, changeTheme, mounted } = useSwitchTheme()

  if (!mounted) {
    return (
      <Button
        title='Switch theme'
        className={twclsx(
          'inline-flex items-center justify-center',
          'w-9 h-9 md:w-10 md:h-10 rounded',
          'bg-primary-100 dark:bg-theme-700'
        )}
      >
        <Spinner spinnerSize='xs' containerSize='full' containerStyle='bg-transparent dark:bg-transparent' />
        <span className='sr-only'>Switch theme</span>
      </Button>
    )
  }

  return (
    <Menu as='div' className='relative z-40'>
      <Menu.Button
        title='Theme menu button'
        className={twclsx(
          'inline-flex items-center justify-center',
          'w-9 h-9 md:w-10 md:h-10 rounded',
          'bg-primary-100 dark:bg-theme-700'
        )}
      >
        {(theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) && (
          <Moon className={twclsx('w-4 h-4 md:w-5 md:h-5', 'text-white')} />
        )}
        {(theme === 'light' || (theme === 'system' && systemTheme === 'light')) && (
          <Sun className={twclsx('w-4 h-4 md:w-5 md:h-5', 'text-primary-700')} />
        )}
        <span className='sr-only'>Click to see option to switch theme</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          as='div'
          className={twclsx(
            'absolute top-[50px] md:top-[50px]',
            'w-40 right-0 p-1.5',
            'rounded-md origin-top-right shadow-lg',
            'ring-1 focus:outline-none',
            'ring-black/5 bg-white',
            'dark:shadow-none dark:bg-theme-700'
          )}
        >
          <ul className='flex flex-col w-full'>
            {MENU_THEME.map((item) => {
              return (
                <Menu.Item as='li' key={item.value} onClick={changeTheme(item.value)} className='first:mt-0 mt-1'>
                  {({ active }) => (
                    <Button
                      className={twclsx(
                        'justify-start px-1.5 h-9 md:h-10 space-x-2.5 w-full transition',
                        active && 'bg-active/30 rounded',
                        theme === item.value && 'bg-active/30'
                      )}
                    >
                      <item.icon className='w-4 h-4 md:w-5 md:h-5' />
                      <span className={twclsx('text-xs md:text-sm')}>{item.name}</span>
                      {theme === item.value && <HiCheck className='w-3 h-3' />}
                    </Button>
                  )}
                </Menu.Item>
              )
            })}
          </ul>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
