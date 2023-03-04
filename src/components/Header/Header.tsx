import { NextFont } from 'next/dist/compiled/@next/font'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

/* import { useWindowScrollY } from '@/hooks/useScrollY' */
import twclsx from '@/libs/twclsx'

import { ROUTE } from '@/constants/route.constant'

import SwitcherTheme from '@/components/SwitcherTheme'

interface HeaderProps {
  font: NextFont
}

export default function Header({ font }: HeaderProps) {
  const router = useRouter()
  /* const y = useWindowScrollY() */

  return (
    <header
      className={twclsx(
        `${font.className}`,
        'sticky top-0 inset-x-0',
        'border-b border-b-transparent transition-colors',
        'bg-theme-50 dark:bg-theme-900',
        'supports-[backdrop-filter:blur(0px)]:bg-theme-50/60 dark:supports-[backdrop-filter:blur(0px)]:bg-theme-900/60',
        'supports-[backdrop-filter:blur(0px)]:backdrop-blur-xl',
        'border-b-theme-200 dark:border-b-theme-400'
      )}
    >
      <div className='container'>
        <div className='flex justify-between items-center'>
          <NextLink href='/' className={twclsx('text-xl font-bold max-w-max')}>
            <h1 className='max-w-max'>&lt;BraveMind /&gt;</h1>
          </NextLink>
          <div className='flex items-center gap-4'>
            {ROUTE.map((item) => {
              return (
                <NextLink href={item.path} key={item.path} className={twclsx('py-4 px-3 text-base')}>
                  <p
                    className={twclsx(
                      router.pathname === item.path
                        ? 'dark:border-theme-50 border-theme-900 font-medium'
                        : 'border-transparent',
                      'border-b-2 border-dashed transition-colors'
                    )}
                  >
                    {item.name}
                  </p>
                </NextLink>
              )
            })}
            <SwitcherTheme />
          </div>
        </div>
      </div>
    </header>
  )
}
