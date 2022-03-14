import React, { useCallback } from 'react'
import useMeasure from 'react-use-measure'
import { curveBasis } from '@visx/curve'
import { LinearGradient } from '@visx/gradient'
import { Group } from '@visx/group'
import { Bar, Circle } from '@visx/shape'
import { Numeric } from 'd3-array'

import { Text } from 'blockchain-info-components'
import {
  AnimatedLinePath,
  AxisBottom,
  Tooltip,
  useLast,
  useLinearScale,
  useTimeScale,
  useTooltipHandlers
} from 'components/Chart'
import { PaddingAll } from 'components/Padding'

import { useShowTooltip } from './hooks'
import { CoinChartProps, CoinData, EdgeConstrains } from './types'

const defaultPdding: EdgeConstrains = {
  bottom: 16,
  left: 32,
  right: 32,
  top: 16
}

export const CoinChart = <DATA extends CoinData = CoinData>({
  data,
  numTicks,
  primaryColor,
  textColor,
  x,
  xFormatter,
  y,
  yFormatter,
  padding = defaultPdding
}: CoinChartProps<DATA>) => {
  const [ref, { height, width }] = useMeasure()
  const getX = useCallback((dataItem: DATA): Date => new Date(dataItem[x].valueOf()), [x])
  const getY = useCallback((dataItem: DATA): Numeric => dataItem[y]!, [y])

  const lastDataPoint: DATA = useLast(data)
  const xScale = useTimeScale(data, getX)
  const yScale = useLinearScale(data, getY)

  const gap = 12
  const bottomAxisHeight = 44

  const innerWidth = width - (padding.left + padding.right)
  const innerHeight = height - gap - bottomAxisHeight - (padding.top + padding.bottom)

  xScale.range([0, innerWidth])
  yScale.range([innerHeight, 0])

  const {
    hideTooltip,
    isTooltipOpen,
    pointLeft,
    pointTop,
    showTooltip,
    tooltipData,
    tooltipLeft,
    tooltipTop
  } = useShowTooltip({
    data,
    getX,
    getY,
    padding,
    xScale,
    yScale
  })

  const tooltipHandlers = useTooltipHandlers({
    hide: hideTooltip,
    show: showTooltip
  })

  return (
    <>
      <svg ref={ref} width='100%' height='100%' viewBox={`0 0 ${width} ${height}`}>
        <LinearGradient
          id='coin_chart_linear_gradient'
          from={primaryColor}
          to={primaryColor}
          rotate='-90'
          fromOpacity={0.1}
        />

        <LinearGradient
          id='coin_chart_line_background_linear_gradient'
          from='rgba(12, 108, 242, 0.08)'
          to='rgba(12, 108, 242, 0)'
        />

        <Group left={padding.left} top={padding.top} width={innerWidth} height={innerHeight}>
          <AnimatedLinePath
            curve={!isTooltipOpen ? curveBasis : undefined}
            data={data}
            x={(dataItem) => xScale(getX(dataItem))}
            y={(dataItem) => yScale(getY(dataItem))}
            stroke='url(#coin_chart_linear_gradient)'
            strokeWidth={4}
            {...tooltipHandlers}
          />

          {/* <AreaClosed
          curve={curveCardinal}
          data={data}
          x={(dataItem) => xScale(getX(dataItem))}
          y={(dataItem) => yScale(getY(dataItem))}
          yScale={yScale}
          strokeWidth={0}
          fill='url(#coin_chart_line_background_linear_gradient)'
        /> */}

          {!isTooltipOpen && (
            <Group left={xScale(getX(lastDataPoint))} top={yScale(getY(lastDataPoint))}>
              <Circle fill={primaryColor} r={4} />
              <Circle fill={primaryColor} r={8} opacity={0.1} />
              <Circle fill={primaryColor} r={16} opacity={0.1} />
            </Group>
          )}

          <AxisBottom
            scale={xScale}
            numTicks={numTicks}
            tickFormat={(xValue) => xFormatter?.(xValue as DATA[keyof DATA]) ?? xValue.toString()}
            top={height - bottomAxisHeight}
            textColor={textColor}
          />
        </Group>

        <Bar
          x={padding.left}
          y={padding.top}
          width={innerWidth}
          height={innerHeight}
          fill='transparent'
          {...tooltipHandlers}
        />

        {isTooltipOpen && (
          <Group top={pointTop} left={pointLeft}>
            <Circle fill={primaryColor} r={4} />
          </Group>
        )}
      </svg>

      {!!tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft}>
          <PaddingAll size={12}>
            <Text size='12px' lineHeight='16px' color='white' weight={600}>
              {xFormatter?.(tooltipData[x])}
            </Text>

            <Text size='12px' lineHeight='16px' color='white' weight={600}>
              {yFormatter?.(tooltipData[y])}
            </Text>
          </PaddingAll>
        </Tooltip>
      )}
    </>
  )
}

export type CoinChartComponent = typeof CoinChart
