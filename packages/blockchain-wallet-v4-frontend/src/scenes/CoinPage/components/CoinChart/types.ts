import { Numeric } from 'd3-array'

export type EdgeConstrains = {
  bottom: number
  left: number
  right: number
  top: number
}

export type CoinData = { [key: string]: Numeric }

export type CoinChartProps<
  DATA extends CoinData,
  X extends keyof DATA = keyof DATA,
  Y extends keyof DATA = keyof DATA
> = {
  backgroundColor: string
  data: DATA[]
  numTicks?: number
  padding?: EdgeConstrains
  primaryColor: string
  textColor: string
  x: X
  xFormatter?: (x: DATA[X]) => string
  y: Y
  yFormatter?: (y: DATA[Y]) => string
}
