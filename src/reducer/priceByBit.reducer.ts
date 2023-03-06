import { SymbolPrice } from '@/types/symbol.type'
import { TickerWS } from '@/types/ticker.type'

type Action = { type: 'add'; payload: TickerWS } | { type: 'update'; payload: TickerWS }

export const priceReducer = (state: SymbolPrice, action: Action): SymbolPrice => {
  const { symbol, price24hPcnt, lastPrice } = action.payload

  const existingIndex = state.findIndex((item) => item.symbol === symbol)

  if (existingIndex === -1) {
    // New symbol
    return [...state, { symbol, price24hPcnt, lastPrice, trend: 'stable' }]
  } else {
    // Existing symbol
    const previousLastPrice = Number.parseFloat(state[existingIndex].lastPrice)
    const currentLastPrice = Number.parseFloat(lastPrice)
    console.log(previousLastPrice > currentLastPrice)
    const trend =
      currentLastPrice > previousLastPrice ? 'increase' : currentLastPrice < previousLastPrice ? 'decrease' : 'stable'
    const updatedItem = { ...state[existingIndex], price24hPcnt, lastPrice, trend }
    return [...state.slice(0, existingIndex), updatedItem, ...state.slice(existingIndex + 1)]
  }
}
