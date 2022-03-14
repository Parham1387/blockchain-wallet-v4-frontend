import React from 'react'
import { TooltipWithBounds as VisxTooltipWithBounds } from '@visx/tooltip'

import { TooltipCard } from './styles'
import { TooltipComponent } from './types'

export const Tooltip: TooltipComponent = ({ children, left, top }) => {
  return (
    <VisxTooltipWithBounds
      top={top}
      left={left}
      offsetLeft={28}
      offsetTop={-16}
      style={{
        boxShadow: 'none',
        pointerEvents: 'none',
        position: 'absolute'
      }}
    >
      <TooltipCard>{children}</TooltipCard>
    </VisxTooltipWithBounds>
  )
}
