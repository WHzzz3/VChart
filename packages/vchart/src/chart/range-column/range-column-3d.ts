import { CartesianChart } from '../cartesian/cartesian';
import { ChartTypeEnum } from '../interface';
import { SeriesTypeEnum } from '../../series/interface';
import { Direction } from '../../typings';
import { VChart } from '../../core/vchart';
import type { IRangeColumn3dChartSpec } from './interface';
import { RangeColumn3dSeries } from '../../series/range-column/range-column-3d';
VChart.useSeries([RangeColumn3dSeries]);

export class RangeColumn3dChart extends CartesianChart {
  static readonly type: string = ChartTypeEnum.rangeColumn3d;
  static readonly view: string = 'singleDefault';
  readonly type: string = ChartTypeEnum.rangeColumn3d;
  readonly seriesType: string = SeriesTypeEnum.rangeColumn3d;

  protected _getDefaultSeriesSpec(spec: any): any {
    const series: any = {
      ...super._getDefaultSeriesSpec(spec),
      barGapInGroup: (spec as IRangeColumn3dChartSpec).barGapInGroup
    };
    series.bar3d = spec.bar3d;
    if (spec.direction === Direction.horizontal) {
      series.xField = spec.xField ?? [spec.minField, spec.maxField];
    } else {
      series.yField = spec.yField ?? [spec.minField, spec.maxField];
    }
    return series;
  }
}
