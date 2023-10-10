import { CartesianSeries } from '../cartesian/cartesian';
import type { Maybe, Datum } from '../../typings';
import type { IMark } from '../../mark/interface';
import { SeriesTypeEnum } from '../interface/type';
import type { IDotSeriesSpec } from '../dot/interface';
import type { ILinkSeriesSpec, ILinkSeriesTheme } from './interface';
import type { SeriesMarkMap } from '../interface';
export declare class LinkSeries<T extends ILinkSeriesSpec = ILinkSeriesSpec> extends CartesianSeries<T> {
  static readonly type: string;
  type: SeriesTypeEnum;
  static readonly mark: SeriesMarkMap;
  protected _theme: Maybe<ILinkSeriesTheme>;
  protected _fromField?: string;
  getFromField(): string;
  setFromField(field: string): void;
  protected _toField?: string;
  getToField(): string;
  setToField(field: string): void;
  protected _dotTypeField?: string;
  getDotTypeField(): string;
  setDotTypeField(field: string): void;
  protected _dotSeriesSpec?: IDotSeriesSpec;
  getDotSeriesSpec(): IDotSeriesSpec;
  setDotSeriesSpec(spec: IDotSeriesSpec): void;
  protected _getDotData(): any;
  initData(): void;
  setAttrFromSpec(): void;
  private _clipMark;
  private _containerMark;
  private _linkMark;
  private _arrowMark;
  initMark(): void;
  initMarkStyle(): void;
  afterInitMark(): void;
  dataToPositionXFrom(datum: Datum): number;
  dataToPositionYFrom(datum: Datum): number;
  dataToPositionXTo(datum: Datum): number;
  dataToPositionYTo(datum: Datum): number;
  dataToPositionArrowYTo(datum: Datum, arrowSize: number): number;
  dataToOpacity(datum: Datum): number;
  isPositionYFromHigher(datum: Datum): boolean;
  isPositionXOuterRange(datum: Datum, field: string): boolean;
  getDefaultColorDomain(): any;
  getColorAttribute(): {
    scale: any;
    field: string;
  };
  protected initTooltip(): void;
  protected onMarkTreePositionUpdate(marks: IMark[]): void;
  getDotInfoData(): import('../../compile/mark/mark-data').MarkData;
}
