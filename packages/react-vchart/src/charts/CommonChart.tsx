import React from 'react';
import { ICommonChartSpec } from '@visactor/vchart';
import { BaseChartProps, createChart } from './BaseChart';

export interface CommonChartProps
  extends Omit<BaseChartProps, 'spec' | 'container' | 'type'>,
    Omit<ICommonChartSpec, 'type'> {}

export const CommonChart = createChart<React.PropsWithChildren<CommonChartProps>>('CommonChart', 'common');
