import { useMemo } from 'react'
import { scaleTime } from '@visx/scale'
import { extent } from 'd3-array'

export const useTimeScale = <DATA extends unknown = unknown>(
  data: DATA[],
  xGetter: (data: DATA) => Date
) => {
  return useMemo(() => {
    const xDomain = extent(data, (datum) => xGetter(datum)) as [Date, Date]

    return scaleTime<number>({
      domain: xDomain,
      nice: true
    })
  }, [data, xGetter])
}

export type ScaleTime = ReturnType<typeof useTimeScale>
