import { MouseEventHandler, TouchEventHandler } from 'react'
import { EventType } from '@visx/event/lib/types'

type UseTooltipHandlersArgs = {
  hide: () => void
  show: (event: EventType) => void
}

export type UseTooltipHandlers = (args: UseTooltipHandlersArgs) => {
  onMouseLeave: MouseEventHandler<SVGRectElement>
  onMouseMove: MouseEventHandler<SVGRectElement>
  onTouchMove: TouchEventHandler<SVGRectElement>
  onTouchStart: TouchEventHandler<SVGRectElement>
}
