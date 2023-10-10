import type { IBaseScale } from '@visactor/vscale';
import type { LayoutItem } from '../../../model/layout-item';
import type { IPolarAxis, IPolarAxisCommonSpec, IPolarAxisCommonTheme } from './interface';
import type { IComponentOption } from '../../interface';
import { ComponentTypeEnum } from '../../interface';
import type { IPolarSeries } from '../../../series/interface';
import type { IPoint, IPolarOrientType, IPolarPoint, StringOrNumber } from '../../../typings';
import type { IEffect } from '../../../model/interface';
import { AxisComponent } from '../base-axis';
import type { ITick } from '../interface';
export declare abstract class PolarAxis<T extends IPolarAxisCommonSpec = IPolarAxisCommonSpec>
  extends AxisComponent<T>
  implements IPolarAxis
{
  static type: ComponentTypeEnum;
  type: ComponentTypeEnum;
  name: string;
  layoutType: LayoutItem['layoutType'];
  layoutZIndex: number;
  protected _tick: ITick | undefined;
  protected _center: IPoint | null;
  get center(): IPoint;
  protected _startAngle: number;
  get startAngle(): number;
  protected _endAngle: number;
  get endAngle(): number;
  protected _theme: IPolarAxisCommonTheme;
  protected _orient: IPolarOrientType;
  getOrient(): IPolarOrientType;
  protected _groupScales: IBaseScale[];
  getGroupScales(): IBaseScale[];
  protected _refAngleAxis: IPolarAxis;
  setRefAngleAxis(axes: IPolarAxis): this;
  private _axisStyle;
  private _gridStyle;
  static createAxis(spec: any, options: IComponentOption): IPolarAxis;
  static createComponent(spec: any, options: IComponentOption): IPolarAxis | IPolarAxis[];
  effect: IEffect;
  setAttrFromSpec(): void;
  setLayoutStartPosition(pos: Partial<IPoint>): void;
  onLayoutEnd(ctx: any): void;
  onRender(ctx: any): void;
  changeRegions(): void;
  protected _initData(): void;
  afterCompile(): void;
  protected updateScaleRange(): void;
  protected collectData(depth: number): {
    min: number;
    max: number;
    values: any[];
  }[];
  protected abstract computeDomain(
    data: {
      min: number;
      max: number;
      values: any[];
    }[]
  ): StringOrNumber[];
  protected updateSeriesScale(): void;
  protected getSeriesStatisticsField(s: IPolarSeries): string[];
  protected initGroupScales(): void;
  protected axisHelper(): {
    isContinuous: boolean;
    dataToPosition: (values: any[]) => number;
    coordToPoint: (point: IPolarPoint) => IPoint;
    pointToCoord: (point: IPoint) => IPolarPoint;
    center: () => IPoint;
    getScale: (depth: number) => IBaseScale;
    getAxisId: () => number;
  };
  dataToPosition(values: any[]): number;
  positionToData(position: IPoint): any;
  coordToPoint(point: IPolarPoint): IPoint;
  pointToCoord(point: IPoint): IPolarPoint;
  getCenter(): IPoint;
  getOuterRadius(): number;
  getInnerRadius(): number;
  tickValues(): number[];
  updateLayoutAttribute(): void;
  private _layoutAngleAxis;
  private _layoutRadiusAxis;
  private computeLayoutOuterRadius;
  private computeLayoutInnerRadius;
  private getRefLayoutRect;
  private getRefSeriesRadius;
  private _update;
}
