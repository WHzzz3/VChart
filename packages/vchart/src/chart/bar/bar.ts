import { SeriesTypeEnum } from '../../series/interface';
import { CartesianChart } from '../cartesian/cartesian';
import { ChartTypeEnum } from '../interface';

export class BarChart extends CartesianChart {
  static readonly type: string = ChartTypeEnum.bar;
  static readonly view: string = 'singleDefault';
  readonly type: string = ChartTypeEnum.bar;
  readonly seriesType: string = SeriesTypeEnum.bar;
}

export class Bar3dChart extends CartesianChart {
  static readonly type: string = ChartTypeEnum.bar3d;
  static readonly view: string = 'singleDefault';
  readonly type: string = ChartTypeEnum.bar3d;
  readonly seriesType: string = SeriesTypeEnum.bar3d;
}
