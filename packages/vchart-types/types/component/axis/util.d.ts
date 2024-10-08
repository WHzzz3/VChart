import type { IOrientType, IPolarOrientType } from '../../typings';
import type { AxisType, ICommonAxisSpec, ILinearAxisSpec } from './interface';
import type { IModelOption } from '../../model/interface';
export declare const DEFAULT_TITLE_STYLE: {
    left: {
        textAlign: string;
        textBaseline: string;
    };
    right: {
        textAlign: string;
        textBaseline: string;
    };
    radius: {};
    angle: {};
};
export declare function transformAxisLineStyle(lineCfg: any): any;
export declare function getAxisLabelOffset(axisSpec: ICommonAxisSpec): number;
export declare function getLinearAxisSpecDomain(axisSpec: ILinearAxisSpec, defaultDomain?: {
    min?: number;
    max?: number;
}): {
    min: number;
    max: number;
};
export declare function isValidCartesianAxis(spec: any): boolean;
export declare function isValidPolarAxis(spec: any): boolean;
export declare const getCartesianAxisTheme: (orient: IOrientType, type: AxisType, option: Partial<IModelOption>) => any;
export declare const getPolarAxisTheme: (orient: IPolarOrientType, type: AxisType, option: Partial<IModelOption>) => any;
