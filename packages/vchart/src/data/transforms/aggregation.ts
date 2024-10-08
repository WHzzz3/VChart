import type { DataView } from '@visactor/vdataset';
import type { IAggrType } from '../../component/marker/interface';
import type { ICartesianSeries } from '../../series/interface';
import type { Datum, StringOrNumber } from '../../typings';

import { isPlainObject, isValid } from '@visactor/vutils';
import { variance, average, min, max, sum, standardDeviation, median } from '../../util/math';

export type IOption = {
  field: string;
};

export type IOptionAggrField = {
  field: string;
  aggrType: IAggrType;
};

export type IOptionPos = IOptionAggrField | string | number | StringOrNumber[];

export type IOptionSeries = {
  getRelativeSeries: () => ICartesianSeries;
  getStartRelativeSeries: () => ICartesianSeries;
  getEndRelativeSeries: () => ICartesianSeries;
};

export type IOptionCallback = (
  relativeSeriesData: any,
  startRelativeSeriesData: any,
  endRelativeSeriesData: any,
  relativeSeries: ICartesianSeries,
  startRelative: ICartesianSeries,
  endRelative: ICartesianSeries
) => IOptionPos;

export type IOptionAggr = {
  x?: IOptionPos | IOptionCallback;
  y?: IOptionPos | IOptionCallback;
  getRefRelativeSeries?: () => ICartesianSeries;
} & IOptionSeries;

export const markerMin = (_data: Array<DataView>, opt: IOption) => {
  const data = _data[0].latestData as Datum[];

  return min(data, opt.field);
};
export const markerMax = (_data: Array<DataView>, opt: IOption) => {
  const data = _data[0].latestData as Datum[];

  return max(data, opt.field);
};

export function markerSum(_data: Array<DataView>, opt: IOption) {
  const data = _data[0].latestData;

  return sum(data, opt.field);
}
export function markerAverage(_data: Array<DataView>, opt: IOption) {
  const data = _data[0].latestData;

  return average(data, opt.field);
}

export function markerVariance(_data: Array<DataView>, opt: IOption) {
  const data = _data[0].latestData;

  return variance(data, opt.field);
}

export function markerStandardDeviation(_data: Array<DataView>, opt: IOption) {
  const data = _data[0].latestData;

  return standardDeviation(data, opt.field);
}

export function markerMedian(_data: Array<DataView>, opt: IOption) {
  const data = _data[0].latestData;

  return median(data, opt.field);
}

export function markerAggregation(_data: Array<DataView>, options: IOptionAggr[]) {
  const aggrMap = {
    min: markerMin,
    max: markerMax,
    sum: markerSum,
    average: markerAverage,
    variance: markerVariance,
    standardDeviation: markerStandardDeviation,
    median: markerMedian
  };
  const results: {
    x: StringOrNumber[] | StringOrNumber | IOptionCallback | null;
    y: StringOrNumber[] | StringOrNumber | IOptionCallback | null;
  }[] = [];
  options.forEach(option => {
    const result: {
      x: StringOrNumber[] | StringOrNumber | null;
      y: StringOrNumber[] | StringOrNumber | null;
      getRefRelativeSeries?: () => ICartesianSeries;
    } = { x: null, y: null };
    if (isValid(option.x)) {
      const x = option.x;
      if (isPlainObject(x)) {
        const { aggrType, field } = x as IOptionAggrField;
        result.x = aggrMap[aggrType](_data, { field: field });
      } else {
        result.x = x;
      }
    }
    if (isValid(option.y)) {
      const y = option.y;
      if (isPlainObject(y)) {
        const { aggrType, field } = y as IOptionAggrField;
        result.y = aggrMap[aggrType](_data, { field: field });
      } else {
        result.y = y;
      }
    }
    if (option.getRefRelativeSeries) {
      result.getRefRelativeSeries = option.getRefRelativeSeries;
    }
    results.push(result);
  });

  return results;
}
