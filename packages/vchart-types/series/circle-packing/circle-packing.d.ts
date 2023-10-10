import type { ICirclePackingSeriesSpec } from './interface';
import type { Datum } from '../../typings';
import type { SeriesMarkMap } from '../interface';
import { SeriesTypeEnum } from '../interface';
import { CartesianSeries } from '../cartesian/cartesian';
export declare class CirclePackingSeries<
  T extends ICirclePackingSeriesSpec = ICirclePackingSeriesSpec
> extends CartesianSeries<T> {
  static readonly type: string;
  type: SeriesTypeEnum;
  static readonly mark: SeriesMarkMap;
  protected _categoryField: string;
  protected _valueField: string;
  private _layoutPadding;
  private _circlePacking;
  private _label;
  private _circlePackingMark;
  private _labelMark;
  private _drill?;
  setCategoryField(f: string): string;
  getCategoryField(): string;
  setValueField(f: string): string;
  getValueField(): string;
  getDimensionField(): string[];
  getMeasureField(): string[];
  setAttrFromSpec(): void;
  protected initData(): void;
  protected _addDataIndexAndKey(): void;
  initMark(): void;
  initMarkStyle(): void;
  private _initCirclePackingMark;
  private _initCirclePackingMarkStyle;
  private _initLabelMark;
  private _initLabelMarkStyle;
  getStatisticFields(): {
    key: string;
    operations: import('../../data/transforms/dimension-statistics').StatisticOperations;
  }[];
  protected initTooltip(): void;
  initAnimation(): void;
  initEvent(): void;
  onLayoutEnd(ctx: any): void;
  protected _noAnimationDataKey(datum: Datum, index: number): unknown | undefined;
}
