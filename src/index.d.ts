declare module 'bravemind.io' {
  /* Coords Type for Mouse Event */
  export type Coords = {
    x: number
    y: number
  }
  /* Animated Type */
  export type AnimatedCursorType = {
    color?: string
    outerAlpha?: number
    innerSize?: number
    outerSize?: number
    outerScale?: number
    innerScale?: number
  }
}
