import { SymbolWG } from '@/types/symbol.type'

type SymbolWGs = SymbolWG[]

export const DEFAULT_SYMBOL: SymbolWGs = [
  {
    proName: 'BYBIT:BTCUSDT.P',
    title: 'BTC/USDT'
  },
  {
    proName: 'BYBIT:ETHUSDT.P',
    title: 'ETH/USDT'
  },
  {
    proName: 'BYBIT:OPUSDT.P',
    title: 'OP/USDT'
  },
  {
    proName: 'FOREXCOM:SPXUSD',
    title: 'S&P 500'
  },
  {
    proName: 'FOREXCOM:NSXUSD',
    title: 'Nasdaq 100'
  },
  {
    proName: 'FOREXCOM:EURUSD',
    title: 'EUR/USD'
  }
]
