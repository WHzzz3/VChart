import { PREFIX } from '../../constant/base';
import type { ISeriesOption } from '../interface/common';
import { DataView } from '@visactor/vdataset';
import { ChartEvent } from '../../constant/event';
import type { ITrigger } from '../../interaction/interface';
import type { ISeries } from '../interface/series';
import { AttributeLevel } from '../../constant';

import type { IMark, IMarkProgressiveConfig } from '../../mark/interface';
// eslint-disable-next-line no-duplicate-imports
import { MarkTypeEnum } from '../../mark/interface/type';
import type { ILineMark } from '../../mark/line';
import type { ISymbolMark } from '../../mark/symbol';
import type { ITextMark } from '../../mark/text';
import type {
  DirectionType,
  IInvalidType,
  InterpolateType,
  ILineMarkSpec,
  ISymbolMarkSpec,
  Maybe,
  Datum,
  IMarkTheme,
  ILayoutRect
} from '../../typings';
import { DEFAULT_LINEAR_INTERPOLATE, DEFAULT_SMOOTH_INTERPOLATE } from '../../typings/interpolate';
import { Direction } from '../../typings/space';
// eslint-disable-next-line no-duplicate-imports
import { DEFAULT_CLOSE_STROKE_JOIN } from '../../typings/line-stroke';
// eslint-disable-next-line no-duplicate-imports
import type { ISeriesMarkInfo, ISeriesMarkInitOption, ISeriesTooltipHelper } from '../interface';
import type { ILabelSpec, TransformedLabelSpec } from '../../component/label';
import { shouldMarkDoMorph } from '../../animation/utils';
import { DimensionEventEnum, type DimensionEventParams } from '../../event/events/dimension';
import type { EventCallback, EventParams } from '../../event/interface';
import { STATE_VALUE_ENUM } from '../../compile/mark/interface';
import { lineLikeSeriesMark } from './constant';
import type { ILabelMark } from '../../mark/label';
import type { Functional } from '@visactor/vrender-components';
import type { IRegion } from '../../region/interface';
import type { SeriesData } from '../base/series-data';
import { mergeSpec } from '../../util/spec';

export interface ILineLikeSeriesTheme {
  line?: Partial<IMarkTheme<ILineMarkSpec>>;
  point?: Partial<IMarkTheme<ISymbolMarkSpec>> & { visibleInActive?: boolean };
  label?: Partial<ILineLikeLabelSpec>;
}

export type ILineLikeLabelSpec = Omit<ILabelSpec, 'position'> & {
  /** 标签位置
   * @since 1.6.0
   * 支持以函数形式配置
   */
  position?: Functional<
    'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center'
  >;
};

export interface LineLikeSeriesMixin extends ISeries {
  _spec: any;
  _option: ISeriesOption;
  _seriesField: string;
  _theme: Maybe<ILineLikeSeriesTheme>;
  _tooltipHelper: ISeriesTooltipHelper;
  _invalidType: IInvalidType;
  _region: IRegion;
  _direction: DirectionType;
  _data: SeriesData;

  _lineMark: ILineMark;
  _symbolMark: ISymbolMark;
  _symbolActiveMark: ISymbolMark;
  _labelMark: ITextMark;
  _fieldX?: string[];
  _fieldY?: string[];
  _fieldZ?: string[];

  _createMark: (markInfo: ISeriesMarkInfo, option?: ISeriesMarkInitOption) => IMark;
  _getInvalidDefined: () => boolean;
  _getInvalidConnectType: () => IInvalidType;

  getLayoutRect: () => ILayoutRect;
}

export class LineLikeSeriesMixin {
  addSamplingCompile(): void {
    if (this._spec.sampling) {
      const { width, height } = this._region.getLayoutRect();
      const samplingTrans = [];
      const fieldsY = this._fieldY;
      const fieldsX = this._fieldX;

      samplingTrans.push({
        type: 'sampling',
        size: this._direction === Direction.horizontal ? height : width,
        factor: this._spec.samplingFactor,
        yfield: this._direction === Direction.horizontal ? fieldsX[0] : fieldsY[0],
        groupBy: this._seriesField,
        mode: this._spec.sampling
      });
      this._data.getProduct().transform(samplingTrans);
    }
  }

  addOverlapCompile(): void {
    if (this._spec.markOverlap) {
      const overlapTrans = [];
      overlapTrans.push({
        type: 'markoverlap',
        direction: this._direction === Direction.horizontal && this.coordinate === 'cartesian' ? 2 : 1,
        delta: this._spec.pointDis,
        deltaMul: this._spec.pointDisMul,
        groupBy: this._seriesField
      });
      this._symbolMark?.getProduct().transform(overlapTrans);
    }
  }

  reCompileSampling(): void {
    if (this._spec.sampling) {
      this.compile();
    }
  }

  initLineMark(progressive?: IMarkProgressiveConfig, isSeriesMark?: boolean) {
    this._lineMark = this._createMark(lineLikeSeriesMark.line, {
      defaultMorphElementKey: this.getDimensionField()[0],
      groupKey: this._seriesField,
      isSeriesMark: isSeriesMark ?? true,
      progressive,
      customShape: this._spec.line?.customShape,
      stateSort: this._spec.line?.stateSort
    }) as ILineMark;
    return this._lineMark;
  }

  initLineMarkStyle(direction?: DirectionType, areaCurveType?: InterpolateType) {
    const lineMark = this._lineMark;
    if (lineMark) {
      this.setMarkStyle(
        lineMark,
        {
          stroke: this.getColorAttribute()
        },
        'normal',
        AttributeLevel.Series
      );
      if (this._invalidType !== 'zero') {
        this.setMarkStyle(
          lineMark,
          {
            defined: this._getInvalidDefined,
            connectedType: this._getInvalidConnectType()
          },
          'normal',
          AttributeLevel.Series
        );
      }
      this.event.on(ChartEvent.viewDataStatisticsUpdate, { filter: param => param.model === this }, () => {
        this.encodeDefined(lineMark, 'defined');
      });
      if (this.coordinate === 'polar') {
        // 极坐标系下需要关闭
        this.setMarkStyle(
          lineMark,
          {
            lineJoin: DEFAULT_CLOSE_STROKE_JOIN,
            curveType: DEFAULT_LINEAR_INTERPOLATE,
            closePath: true
          },
          'normal',
          AttributeLevel.Series
        );
      } else {
        const userCurveType = areaCurveType ?? this.getSpec().line?.style?.curveType;
        const curveType =
          userCurveType === DEFAULT_SMOOTH_INTERPOLATE
            ? direction === Direction.horizontal
              ? 'monotoneY'
              : 'monotoneX'
            : userCurveType;

        this.setMarkStyle(
          lineMark,
          {
            curveType
          },
          'normal',
          AttributeLevel.Built_In
        );
      }

      this.setMarkStyle(
        lineMark,
        {
          x: this.dataToPositionX.bind(this),
          y: this.dataToPositionY.bind(this),
          z: this._fieldZ ? this.dataToPositionZ.bind(this) : null
        },
        'normal',
        AttributeLevel.Series
      );
    }
    return lineMark;
  }

  protected _getEventElement(params: DimensionEventParams, reverse: boolean = false): Datum[] {
    // items 修改遍历方法从 mark
    let data: Datum[] = [];
    params.dimensionInfo.some(df => {
      df.data.some(dd => {
        if (dd.series === this) {
          data = dd.datum;
          return true;
        }
        return false;
      });
      return !data.length;
    });
    return data;
  }

  protected _dimensionTrigger(params: DimensionEventParams) {
    const elements = this._getEventElement(params);
    switch (params.action) {
      case 'enter':
        this._symbolActiveMark.getDataView().parse(elements);
        this._symbolActiveMark.getData().updateData(false);
        break;
      case 'leave':
        this._symbolActiveMark.getDataView().parse([]);
        this._symbolActiveMark.getData().updateData(false);
      case 'click':
      case 'move':
      default:
        break;
    }
  }

  initSymbolMark(progressive?: IMarkProgressiveConfig, isSeriesMark?: boolean) {
    const pointSpec = this._spec.point || {};

    if (pointSpec.visible !== false) {
      this._symbolMark = this._createMark(lineLikeSeriesMark.point, {
        morph: shouldMarkDoMorph(this._spec, lineLikeSeriesMark.point.name),
        defaultMorphElementKey: this.getDimensionField()[0],
        groupKey: this._seriesField,
        progressive,
        isSeriesMark: !!isSeriesMark,
        customShape: pointSpec.customShape,
        stateSort: pointSpec.stateSort
      }) as ISymbolMark;
    }

    if (this._spec.activePoint === true) {
      const activeData = new DataView(this._option.dataSet, { name: `${PREFIX}_series_${this.id}_active_point` });
      activeData.parse([]);
      this._symbolActiveMark = this._createMark(
        { name: `active_point`, type: MarkTypeEnum.symbol },
        {
          morph: false,
          groupKey: this._seriesField,
          isSeriesMark: false,
          dataView: activeData,
          parent: this._region.getInteractionMark(),
          customShape: pointSpec.customShape,
          stateSort: pointSpec.stateSort
        }
      ) as ISymbolMark;
      this._symbolActiveMark.setVisible(false);
    }

    return this._symbolMark;
  }

  initSymbolMarkStyle() {
    const symbolMark = this._symbolMark;
    if (!symbolMark) {
      this._initSymbolActiveMarkAlone();
      return symbolMark;
    }
    // 设置基础样式
    this._initSymbolMark(symbolMark);

    // setStyle to active point
    if (this._symbolActiveMark && this._symbolMark.stateStyle.dimension_hover) {
      // active point will show
      this._symbolActiveMark.setVisible(true);
      this.event.on(DimensionEventEnum.dimensionHover, this._dimensionTrigger.bind(this) as EventCallback<EventParams>);
      // set style with referer
      for (const state in this._symbolMark.stateStyle) {
        this._symbolActiveMark.stateStyle[state] = {};
        for (const key in this._symbolMark.stateStyle[state]) {
          this._symbolActiveMark.stateStyle[state][key] = {
            style: null,
            level: AttributeLevel.Series,
            referer: symbolMark
          };
        }
      }
      // make sure activeMark in state
      this._symbolActiveMark.state.changeStateInfo({
        stateValue: STATE_VALUE_ENUM.STATE_DIMENSION_HOVER,
        filter: () => true
      });
    }

    return symbolMark;
  }

  private _initSymbolMark(symbolMark: ISymbolMark) {
    if (!symbolMark) {
      return;
    }
    this.setMarkStyle(
      symbolMark,
      {
        fill: this.getColorAttribute()
      },
      'normal',
      AttributeLevel.Series
    );
    if (this._invalidType !== 'zero') {
      this.setMarkStyle(
        symbolMark,
        {
          visible: this._getInvalidDefined
        },
        'normal',
        AttributeLevel.Series
      );
    }

    this.event.on(ChartEvent.viewDataStatisticsUpdate, { filter: param => param.model === this }, () => {
      this.encodeDefined(symbolMark, 'visible');
    });

    this.setMarkStyle(
      symbolMark,
      {
        x: this.dataToPositionX.bind(this),
        y: this.dataToPositionY.bind(this),
        z: this._fieldZ ? this.dataToPositionZ.bind(this) : null
      },
      'normal',
      AttributeLevel.Series
    );
  }

  private _initSymbolActiveMarkAlone() {
    const symbolMark = this._symbolActiveMark;
    if (!symbolMark) {
      return;
    }
    this._initSymbolMark(symbolMark);

    // 这里应该不能讲trigger-mark改为activeMark，activeMark数据会变，并且目前不支持selected等操作改变它的数据
    // this._trigger.registerMark(symbolMark);

    // setStyle to active point
    if (symbolMark && this._spec[lineLikeSeriesMark.point.name]?.state?.dimension_hover) {
      // active point will show
      symbolMark.setVisible(true);
      this.event.on(DimensionEventEnum.dimensionHover, this._dimensionTrigger.bind(this) as EventCallback<EventParams>);
      // set style with referer
      this.initMarkStyleWithSpec(
        symbolMark,
        mergeSpec({}, this._spec[lineLikeSeriesMark.point.name], { visible: true })
      );
      // make sure activeMark in state
      this._symbolActiveMark.state.changeStateInfo({
        stateValue: STATE_VALUE_ENUM.STATE_DIMENSION_HOVER,
        filter: () => true
      });
    }
  }

  initLabelMarkStyle(labelMark?: ILabelMark) {
    if (!labelMark) {
      return;
    }
    if (labelMark.getTarget()?.type !== 'symbol') {
      labelMark.setRule('line-data');
    }
    this.setMarkStyle(labelMark, {
      fill: this.getColorAttribute(),
      text: (datum: Datum) => {
        return datum[this.getStackValueField()];
      },
      z: this._fieldZ ? this.dataToPositionZ.bind(this) : null
    });

    if (this._invalidType !== 'zero') {
      this.setMarkStyle(
        labelMark,
        {
          visible: this._getInvalidDefined
        },
        'normal',
        AttributeLevel.Series
      );
    }

    this.event.on(ChartEvent.viewDataStatisticsUpdate, { filter: param => param.model === this }, () => {
      this.encodeDefined(labelMark, 'visible');
    });
  }

  initLineLabelMarkStyle(labelMark?: ILabelMark) {
    if (!labelMark) {
      return;
    }

    this.setMarkStyle(labelMark, {
      fill: this.getColorAttribute(),
      text: (datum: Datum) => {
        return datum[this.getSeriesField()];
      },
      z: this._fieldZ ? this.dataToPositionZ.bind(this) : null
    });
  }

  encodeDefined(mark: IMark, attr: string) {
    if (!mark) {
      return;
    }
    const statistics = this.getViewDataStatistics()?.latestData?.[this.getStackValueField()];
    if (this._invalidType === 'zero' || (statistics && statistics?.allValid)) {
      if (mark.stateStyle.normal?.[attr]?.style === true) {
        // no change
        return;
      }
      this.setMarkStyle(mark, { [attr]: true }, 'normal', AttributeLevel.Series);
    } else {
      if (mark.stateStyle.normal?.[attr]?.style !== true) {
        // no change
        return;
      }
      this.setMarkStyle(mark, { [attr]: this._getInvalidDefined }, 'normal', AttributeLevel.Series);
    }
    // if has produce, reCompile encode to set attribute to product
    if (mark.getProduct()) {
      mark.compileEncode();
    }
  }
}
