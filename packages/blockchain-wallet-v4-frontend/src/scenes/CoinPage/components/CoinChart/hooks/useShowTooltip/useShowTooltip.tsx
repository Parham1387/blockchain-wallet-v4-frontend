import { useCallback, useMemo, useState } from 'react'
import { localPoint } from '@visx/event'
import { EventType } from '@visx/event/lib/types'
import { useTooltip } from '@visx/tooltip'
import { bisector } from 'd3-array'

import { ShowTooltipArgs, ShowTooltipResult } from './types'

export const useShowTooltip = <DATA extends unknown = unknown>({
  data,
  getX,
  getY,
  padding,
  xScale,
  yScale
}: ShowTooltipArgs<DATA>): ShowTooltipResult<DATA> => {
  const [pointPosition, setPointPosition] = useState<{ left: number; top: number } | undefined>()

  const {
    hideTooltip,
    showTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0
  } = useTooltip<DATA>()

  const isTooltipOpen = useMemo(() => !!tooltipData, [tooltipData])

  const handleShowTooltip = useCallback(
    (event: EventType) => {
      const { x, y } = localPoint(event) || { x: 0, y: 0 }

      const bisectDate = bisector<DATA, Date>((d) => getX(d)).left

      const x0 = xScale.invert(x)

      const index = bisectDate(data, x0, 1)

      const d0 = data[index - 1]
      const d1 = data[index]
      let d = d0

      if (d1 && getX(d1)) {
        d = x0.valueOf() - getX(d0).valueOf() > getX(d1).valueOf() - x0.valueOf() ? d1 : d0
      }

      showTooltip({
        tooltipData: d,
        tooltipLeft: xScale(getX(d)) + padding.left,
        tooltipTop: y + padding.top
      })

      setPointPosition({
        left: xScale(getX(d)) + padding.left,
        top: yScale(getY(d)) + padding.top
      })
    },
    [setPointPosition, padding]
  )

  const handleHideTooltip = useCallback(() => {
    setPointPosition(undefined)
    hideTooltip()
  }, [setPointPosition, hideTooltip])

  return {
    hideTooltip: handleHideTooltip,
    isTooltipOpen,
    pointLeft: pointPosition?.left,
    pointTop: pointPosition?.top,
    showTooltip: handleShowTooltip,
    tooltipData,
    tooltipLeft,
    tooltipTop
  }
}
