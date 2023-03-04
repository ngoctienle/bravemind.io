import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Share_Tech_Mono } from 'next/font/google'
import { Fragment, useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import { CopyrightStyles } from 'react-ts-tradingview-widgets'

import twclsx from '@/libs/twclsx'

import { DEFAULT_SYMBOL } from '@/constants/symbol.constant'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

const TickerTapeNoSSR = dynamic(() => import('react-ts-tradingview-widgets').then((w) => w.TickerTape), {
  ssr: false
})

const stylesWG: CopyrightStyles = {
  parent: {
    display: 'none'
  }
}

const share = Share_Tech_Mono({ weight: ['400'], subsets: ['latin'] })
const AnimatedCursor = dynamic(() => import('@/components/Animation/Cursor'))
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

export default function App({ Component, pageProps, router }: AppProps) {
  const pathName = router.pathname

  const hiddenWG = useMemo(() => {
    const excluded = ['/about', '/blog']
    const currentRouter = pathName
    return excluded.indexOf(currentRouter) !== -1
  }, [pathName])

  return (
    <Fragment>
      <ThemeProvider attribute='class' storageKey='theme'>
        <QueryClientProvider client={queryClient}>
          <AnimatedCursor />
          <Header font={share} />
          {!hiddenWG && (
            <TickerTapeNoSSR isTransparent displayMode='regular' copyrightStyles={stylesWG} symbols={DEFAULT_SYMBOL} />
          )}
          <main className={twclsx(`${share.className}`, 'h-screen')}>
            <Component {...pageProps} />
          </main>
          <Footer font={share} />
          <Toaster
            position='top-center'
            reverseOrder={true}
            toastOptions={{
              className: twclsx('rounded-md'),
              duration: 2500
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </Fragment>
  )
}
