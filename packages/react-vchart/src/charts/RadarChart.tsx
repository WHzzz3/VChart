import { IRadarChartSpec } from '@visactor/vchart';
import { BaseChartProps, createChart } from './BaseChart';

export interface RadarChartProps
  extends Omit<BaseChartProps, 'spec' | 'container' | 'type'>,
    Omit<IRadarChartSpec, 'type'> {}

export const RadarChart = createChart<RadarChartProps>('RadarChart', 'radar');
