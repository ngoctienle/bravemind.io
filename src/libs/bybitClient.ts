import { WebsocketClient } from 'bybit-api'

export const wsByBit = new WebsocketClient({
  market: 'v5',
  key: process.env.BYBIT_KEY,
  secret: process.env.BYBIT_SECRECT
})
