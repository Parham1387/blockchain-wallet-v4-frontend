import { EventType } from '@visx/event/lib/types'
import { Numeric } from 'd3-array'

import { ScaleLinear, ScaleTime } from 'components/Chart'

import { EdgeConstrains } from '../../types'

export type ShowTooltipArgs<DATA> = {
  data: DATA[]
  getX: (value: DATA) => Date
  getY: (value: DATA) => Numeric
  padding: EdgeConstrains
  xScale: ScaleTime
  yScale: ScaleLinear
}

export type ShowTooltipResult<DATA> = {
  hideTooltip: () => void
  isTooltipOpen: boolean
  padding?
  pointLeft?: number
  pointTop?: number
  showTooltip: (event: EventType) => void
  tooltipData?: DATA
  tooltipLeft: number
  tooltipTop: number
}
