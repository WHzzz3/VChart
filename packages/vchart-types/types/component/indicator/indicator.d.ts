import type { IComponentOption } from '../interface';
import { ComponentTypeEnum } from '../interface/type';
import { BaseComponent } from '../base/base-component';
import type { IRegion } from '../../region/interface';
import type { IIndicator, IIndicatorSpec, IIndicatorTheme } from './interface';
import type { ILayoutType, Maybe } from '../../typings';
import type { IGraphic } from '@visactor/vrender-core';
export declare class Indicator<T extends IIndicatorSpec> extends BaseComponent<T> implements IIndicator {
    static type: ComponentTypeEnum;
    type: ComponentTypeEnum;
    name: string;
    layoutType: ILayoutType;
    layoutZIndex: number;
    layoutLevel: number;
    private _gap;
    private _activeDatum;
    private _displayData;
    private _title;
    private _content;
    private _indicatorComponent;
    private _cacheAttrs;
    protected _theme: Maybe<IIndicatorTheme>;
    static createComponent(spec: any, options: IComponentOption): import("../interface").IComponent[];
    created(): void;
    setAttrFromSpec(): void;
    onRender(ctx: any): void;
    changeRegions(regions: IRegion[]): void;
    protected initEvent(): void;
    private updateDatum;
    private initData;
    updateLayoutAttribute(): void;
    private _getIndicatorAttrs;
    private _createOrUpdateIndicatorComponent;
    private _createText;
    private _computeLayoutRadius;
    private isRelativeModel;
    getVRenderComponents(): IGraphic[];
    clear(): void;
}
export declare const registerIndicator: () => void;
