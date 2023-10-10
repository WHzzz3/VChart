import { CartesianSeries } from '../cartesian/cartesian';
import type { SeriesMarkMap } from '../interface';
import { SeriesTypeEnum } from '../interface';
import type { ITreemapSeriesSpec } from './interface';
import type { PanEventParam, ZoomEventParam } from '../../event/interface';
import { DataView } from '@visactor/vdataset';
export declare class TreemapSeries extends CartesianSeries<any> {
  static readonly type: string;
  type: SeriesTypeEnum;
  static readonly mark: SeriesMarkMap;
  private _leafMark;
  private _nonLeafMark;
  private _labelMark;
  private _nonLeafLabelMark;
  protected _spec: ITreemapSeriesSpec;
  protected _categoryField: string;
  getCategoryField(): string;
  setCategoryField(f: string): string;
  protected _valueField: string;
  getValueField(): string;
  setValueField(f: string): string;
  private _maxDepth;
  private _matrix;
  private _viewBox;
  private _clickEnable;
  private _enableAnimationHook;
  setAttrFromSpec(): void;
  initData(): void;
  protected _addDataIndexAndKey(): void;
  protected _statisticRawData(): void;
  protected _createHierarchyDataStatistics(dataName: string, rawData: DataView[]): DataView;
  getStatisticFields(): {
    key: string;
    operations: import('../../data/transforms/dimension-statistics').StatisticOperations;
  }[];
  initMark(): void;
  initMarkStyle(): void;
  protected _initLeafMarkStyle(): void;
  protected _initNonLeafMarkStyle(): void;
  protected _initLabelMarkStyle(): void;
  protected _initNonLeafLabelMarkStyle(): void;
  initAnimation(): void;
  protected initEvent(): void;
  protected _getDataIdKey(): string;
  protected initTooltip(): void;
  private _shouldFilterElement;
  handlePan(event: PanEventParam): void;
  handleZoom(event: ZoomEventParam): void;
  getDimensionField(): string[];
  getMeasureField(): string[];
  onLayoutEnd(ctx: any): void;
  protected enableMarkAnimation(): void;
  protected disableMarkAnimation(): void;
  getDefaultShapeType(): string;
}
