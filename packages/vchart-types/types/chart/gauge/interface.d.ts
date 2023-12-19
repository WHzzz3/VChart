import type { IPolarAxisSpec } from '../../component/axis/polar/interface';
import type { IGaugePointerSeriesSpec, IGaugeSeriesSpec } from '../../series/gauge';
import type { ILinearAxisSpec } from '../../component/axis/interface';
import type { ICircularProgressSeriesSpec } from '../../series/progress/circular/interface';
import type { IPolarChartSpec } from '../polar';
export interface IGaugeChartSpec extends Omit<IPolarChartSpec, 'axes'>, Omit<IGaugePointerSeriesSpec, 'data' | 'type' | 'morph'> {
    type: 'gauge';
    gauge?: Omit<IGaugeSeriesSpec, 'data'> | Omit<ICircularProgressSeriesSpec, 'data'>;
    axes?: (IPolarAxisSpec | ILinearAxisSpec)[];
}
