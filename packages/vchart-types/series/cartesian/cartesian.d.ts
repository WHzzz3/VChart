import type { DataView } from '@visactor/vdataset';
import type { ICartesianSeries } from '../interface';
import { BaseSeries } from '../base/base-series';
import type { IPoint } from '../../typings/coordinate';
import type { IBaseScale } from '@visactor/vscale';
import type { IAxisHelper, IAxisLocationCfg } from '../../component/axis/cartesian/interface';
import type { DirectionType } from '../../typings/space';
import type { Datum, StringOrNumber } from '../../typings';
import type { StatisticOperations } from '../../data/transforms/dimension-statistics';
import type { ICartesianSeriesSpec } from './interface';
export declare abstract class CartesianSeries<T extends ICartesianSeriesSpec = ICartesianSeriesSpec>
  extends BaseSeries<T>
  implements ICartesianSeries
{
  readonly coordinate: 'cartesian';
  protected _bandPosition: number;
  protected _scaleConfig: IAxisLocationCfg;
  protected _buildScaleConfig(): void;
  protected _fieldX: string[];
  get fieldX(): string[];
  setFieldX(f: string | string[]): void;
  protected _fieldY: string[];
  get fieldY(): string[];
  setFieldY(f: string | string[]): void;
  protected _fieldZ?: string[];
  get fieldZ(): string[] | undefined;
  setFieldZ(f?: string | string[]): void;
  protected _fieldX2: string;
  get fieldX2(): string;
  setFieldX2(f: string): void;
  protected _fieldY2: string;
  get fieldY2(): string;
  setFieldY2(f: string): void;
  protected _direction: DirectionType;
  get direction(): 'vertical' | 'horizontal';
  protected _scaleX: IBaseScale;
  get scaleX(): IBaseScale;
  setScaleX(s: IBaseScale): void;
  protected _scaleY: IBaseScale;
  get scaleY(): IBaseScale;
  setScaleY(s: IBaseScale): void;
  protected _scaleZ?: IBaseScale;
  get scaleZ(): IBaseScale;
  setScaleZ(s: IBaseScale): void;
  _xAxisHelper: IAxisHelper;
  getXAxisHelper(): IAxisHelper;
  setXAxisHelper(h: IAxisHelper): void;
  _yAxisHelper: IAxisHelper;
  getYAxisHelper(): IAxisHelper;
  setYAxisHelper(h: IAxisHelper): void;
  _zAxisHelper?: IAxisHelper;
  getZAxisHelper(): IAxisHelper;
  setZAxisHelper(h: IAxisHelper): void;
  protected _sortDataByAxis: boolean;
  get sortDataByAxis(): boolean;
  getStatisticFields(): {
    key: string;
    operations: StatisticOperations;
  }[];
  getGroupFields(): string[];
  getStackGroupFields(): string[];
  getStackValueField(): string;
  setValueFieldToStack(): void;
  setValueFieldToPercent(): void;
  setValueFieldToStackOffsetSilhouette(): void;
  onXAxisHelperUpdate(): void;
  onYAxisHelperUpdate(): void;
  onZAxisHelperUpdate(): void;
  setAttrFromSpec(): void;
  dataToPosition(datum: Datum): IPoint | null;
  protected _buildMarkAttributeContext(): void;
  valueToPosition(
    xValue: StringOrNumber | StringOrNumber[],
    yValue: StringOrNumber | StringOrNumber[]
  ): {
    x: number;
    y: number;
  };
  protected _axisPosition(helper: IAxisHelper, value: StringOrNumber | StringOrNumber[], datum?: any): number;
  valueToPositionX(value: StringOrNumber | StringOrNumber[], datum?: any): number;
  valueToPositionY(value: StringOrNumber | StringOrNumber[], datum?: any): number;
  dataToPositionX(datum: Datum): number;
  dataToPositionY(datum: Datum): number;
  dataToPositionZ(datum: Datum): number;
  dataToPositionX1(datum: Datum): number;
  dataToPositionY1(datum: Datum): number;
  positionToData(p: IPoint): IPoint | null;
  positionToDataX(xPos: number): any | null;
  positionToDataY(yPos: number): any | null;
  getRegionRectLeft(): number;
  getRegionRectRight(): number;
  afterInitMark(): void;
  getDimensionField(): string[];
  getMeasureField(): string[];
  viewDataUpdate(d: DataView): void;
  _sortDataInAxisDomain(): void;
}
