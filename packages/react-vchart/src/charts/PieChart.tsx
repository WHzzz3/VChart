import React from 'react';
import { IPieChartSpec } from '@visactor/vchart';
import { BaseChartProps, createChart } from './BaseChart';

export interface PieChartProps
  extends Omit<BaseChartProps, 'spec' | 'container' | 'type'>,
    Omit<IPieChartSpec, 'type'> {}

export const PieChart = createChart<React.PropsWithChildren<PieChartProps>>('PieChart', 'pie');
