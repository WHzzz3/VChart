import { SeriesTypeEnum } from '../../series/interface/type';
import { Direction } from '../../typings';
import { CartesianChart } from '../cartesian/cartesian';
import { ChartTypeEnum } from '../interface/type';
import { setDefaultCrosshairForCartesianChart } from '../util';
import type { IBoxPlotChartSpec } from './interface';
import { VChart } from '../../core/vchart';
import { BoxPlotSeries, registerBoxplotSeries } from '../../series/box-plot/box-plot';
import { Factory } from '../../core/factory';

export class BoxPlotChart extends CartesianChart {
  static readonly type: string = ChartTypeEnum.boxPlot;
  static readonly view: string = 'singleDefault';
  readonly type: string = ChartTypeEnum.boxPlot;
  readonly seriesType: string = SeriesTypeEnum.boxPlot;

  protected _getDefaultSeriesSpec(spec: IBoxPlotChartSpec): any {
    const dataFields = [spec.maxField, spec.medianField, spec.q1Field, spec.q3Field, spec.minField, spec.outliersField];
    const seriesSpec = {
      ...super._getDefaultSeriesSpec(spec),
      boxPlot: spec.boxPlot,
      direction: spec.direction ?? Direction.vertical,
      minField: spec.minField,
      maxField: spec.maxField,
      q1Field: spec.q1Field,
      medianField: spec.medianField,
      q3Field: spec.q3Field,
      outliersField: spec.outliersField,
      outliersStyle: spec.outliersStyle
    };
    seriesSpec[seriesSpec.direction === Direction.vertical ? 'yField' : 'xField'] = dataFields;

    return seriesSpec;
  }

  transformSpec(spec: IBoxPlotChartSpec): void {
    super.transformSpec(spec);
    if (!spec.axes) {
      spec.axes = [
        {
          orient: 'bottom'
        },
        {
          orient: 'left'
        }
      ];
    }
    setDefaultCrosshairForCartesianChart(spec);
  }
}

export const registerBoxplotChart = () => {
  registerBoxplotSeries();
  Factory.registerChart(BoxPlotChart.type, BoxPlotChart);
};
