import { priceReducer } from '@/reducer/priceByBit.reducer'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { HiArrowNarrowRight, HiOutlineGift } from 'react-icons/hi'

import { wsByBit } from '@/libs/bybitClient'
import twclsx from '@/libs/twclsx'
import { generateNameIcons } from '@/libs/ultil'

import { TickerWS } from '@/types/ticker.type'

import { SYMBOL } from '@/constants/symbol.constant'

import Button from '@/components/common/Button'

export default function Home() {
  const [symbolPriceMap, dispatch] = useReducer(priceReducer, [])

  const checkLastPrice = useCallback(
    (ticker: TickerWS) => {
      dispatch({ type: 'update', payload: ticker })
    },
    [dispatch]
  )

  useEffect(() => {
    SYMBOL.map((item) => wsByBit.subscribeV5(`tickers.${item}`, 'spot', false))

    wsByBit.on('update', (res) => {
      checkLastPrice(res.data)
    })
  }, [checkLastPrice])

  const memoizedSymbolPriceMap = useMemo(() => symbolPriceMap, [symbolPriceMap])

  return (
    <>
      <section className='py-10'>
        <div className='container'>
          {memoizedSymbolPriceMap.map((item) => (
            <div className='text-base flex items-center gap-5 mb-5' key={item.price24hPcnt}>
              <p className='font-bold'>{item.symbol}</p>
              <Image
                src={`/cryptoicons/${generateNameIcons(item.symbol)}.png`}
                alt={item.symbol}
                width={32}
                height={32}
              />
              <p
                className={twclsx(
                  item.trend == 'stable' && 'text-light-black',
                  item.trend == 'decrease' && 'text-kline-down',
                  item.trend == 'increase' && 'text-kline-up',
                  'text-sm'
                )}
              >
                {item.lastPrice}
              </p>
              <p
                className={twclsx(
                  Number.parseFloat(item.price24hPcnt) < 0 && 'text-kline-down',
                  Number.parseFloat(item.price24hPcnt) > 0 && 'text-kline-up'
                )}
              >
                {(Number(item.price24hPcnt) * 100).toFixed(2) + '%'}
              </p>
            </div>
          ))}

          <div className='mt-10'>
            <h2 className='flex flex-col text-6xl font-extrabold gap-4 text-light-text-1 main-title'>
              <span>Navigate The Market</span>
              <span>With Confidence</span>
            </h2>
            <p className='mt-5 text-light-text-2 text-lg'>
              Learn ICT concepts with a community of like-minded individuals.
            </p>
          </div>
          <div className='mt-[50px]'>
            <div className='flex gap-2 items-center'>
              <HiOutlineGift className='w-4 h-4 md:w-5 md:h-5 text-light-blue' />
              <p className='text-sm text-light-text-1'>Start Your Trading Journey</p>
            </div>
            <Link href='/login' className='inline-block mt-4'>
              <Button
                className={twclsx(
                  'h-[60px] bg-light-blue transition-colors relative justify-start w-[200px] group hover:bg-light-blue-hover px-5 text-light-white rounded-lg'
                )}
              >
                Join Now
                <HiArrowNarrowRight className='w-4 h-4 md:w-5 md:h-5 text-light-white ml-5 transition-all group-hover:right-4 absolute top-1/2 -translate-y-1/2 right-5' />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
