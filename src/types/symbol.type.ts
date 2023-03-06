export type SymbolWG = {
  proName: string
  title: string
}

export type SymbolPrice = {
  symbol: string
  price24hPcnt: string
  lastPrice: string
  trend: 'increase' | 'decrease' | 'stable' | string
}[]
