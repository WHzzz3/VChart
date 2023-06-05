import type { ICommonChartSpec } from '../../chart/common';
import type { IGaugeChartSpec } from '../../chart/gauge/interface';
import type { IHeatmapChartSpec } from '../../chart/heatmap';
import type { IRangeAreaChartSpec } from '../../chart/range-area';
import type { ISankeyChartSpec } from '../../chart/sankey';
import type { ITreemapChartSpec } from '../../chart/treemap';
import type { IWaterfallChartSpec } from '../../chart/waterfall';
import type { IAreaChartSpec } from '../../chart/area/interface';
import type { ILineChartSpec } from '../../chart/line/interface';
import type { IBarChartSpec } from '../../chart/bar/interface';
import type { IHistogramChartSpec } from '../../chart/histogram/interface';
import type { IRangeColumnChartSpec } from '../../chart/range-column/interface';
import type { IMapChartSpec } from '../../chart/map/interface';
import type { IPieChartSpec } from '../../chart/pie/interface';
import type { IRadarChartSpec } from '../../chart/radar/interface';
import type { IRoseChartSpec } from '../../chart/rose/interface';
import type { IScatterChartSpec } from '../../chart/scatter/interface';
import type { ISequenceChartSpec } from '../../chart/sequence/interface';
import type { ICircularProgressChartSpec } from '../../chart/progress/circular/interface';
import type { ILinearProgressChartSpec } from '../../chart/progress/linear/interface';
import type { IWordCloudChartSpec } from '../../chart/word-cloud/interface';
import type { IFunnelChartSpec } from '../../chart/funnel/interface';
import type { IBoxPlotChartSpec } from '../../chart/boxplot/interface';
import type { ISunburstChartSpec } from '../../chart/sunburst/interface';
import type { ICirclePackingChartSpec } from '../../chart/circle-packing/interface';

export interface ChartSpecMap {
  readonly common: ICommonChartSpec;
  readonly area: IAreaChartSpec;
  readonly line: ILineChartSpec;
  readonly bar: IBarChartSpec;
  // readonly bar3d: IBar3DChartSpec;
  readonly histogram: IHistogramChartSpec;
  // readonly histogram3d: IHistogram3DChartSpec;
  readonly rangeColumn: IRangeColumnChartSpec;
  // readonly rangeColumn3d: IRangeColumn3DChartSpec;
  readonly rangeArea: IRangeAreaChartSpec;
  readonly map: IMapChartSpec;
  readonly pie: IPieChartSpec;
  // readonly pie3d: IPie3DChartSpec;
  readonly radar: IRadarChartSpec;
  readonly rose: IRoseChartSpec;
  readonly scatter: IScatterChartSpec;
  readonly sequence: ISequenceChartSpec;
  readonly circleProgress: ICircularProgressChartSpec;
  readonly linearProgress: ILinearProgressChartSpec;
  readonly wordCloud: IWordCloudChartSpec;
  // readonly wordCloud3d: IWordCloud3DChartSpec;
  readonly funnel: IFunnelChartSpec;
  // readonly funnel3d: IFunnel3DChartSpec;
  readonly waterfall: IWaterfallChartSpec;
  readonly boxplot: IBoxPlotChartSpec;
  readonly gauge: IGaugeChartSpec;
  readonly sankey: ISankeyChartSpec;
  readonly treemap: ITreemapChartSpec;
  readonly sunburst: ISunburstChartSpec;
  readonly circlePacking: ICirclePackingChartSpec;
  readonly heatmap: IHeatmapChartSpec;
}

export type ISpec = ChartSpecMap[keyof ChartSpecMap];
