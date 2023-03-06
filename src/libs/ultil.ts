export const generateNameIcons = (symbol: string) => {
  const coinSymbol = symbol.replace('USDT', '').toLocaleLowerCase()
  return coinSymbol
}
