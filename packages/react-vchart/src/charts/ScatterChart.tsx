import React from 'react';
import { IScatterChartSpec } from '@visactor/vchart';
import { BaseChartProps, createChart } from './BaseChart';

export interface ScatterChartProps
  extends Omit<BaseChartProps, 'spec' | 'container' | 'type'>,
    Omit<IScatterChartSpec, 'type'> {}

export const ScatterChart = createChart<React.PropsWithChildren<ScatterChartProps>>('ScatterChart', 'scatter');
