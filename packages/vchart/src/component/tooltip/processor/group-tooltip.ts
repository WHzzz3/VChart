import type { BaseEventParams } from '../../../event/interface';
import type { TooltipActiveType } from '../../../typings';
import type { TooltipHandlerParams } from '../interface';
import type { GroupTooltipInfo, MouseEventData } from './interface';
import { BaseTooltipProcessor } from './base';
import { array, isNil } from '@visactor/vutils';
import type { ISeries } from '../../../series/interface';

export class GroupTooltipProcessor extends BaseTooltipProcessor {
  activeType: TooltipActiveType = 'group';

  /** 触发对应类型的 tooltip */
  showTooltip(info: GroupTooltipInfo, params: BaseEventParams, changePositionOnly: boolean) {
    const { datum, series, dimensionInfo } = info;
    const tooltipData = [{ datum: array(datum), series }];
    const newParams: TooltipHandlerParams = {
      ...(params as any),
      dimensionInfo: this._preprocessDimensionInfo(dimensionInfo),
      changePositionOnly,
      tooltip: this.component
    };
    return this._showTooltipByHandler(tooltipData, newParams);
  }

  /** 判断是否应该触发 tooltip */
  shouldHandleTooltip(params: BaseEventParams, mouseEventData: Partial<MouseEventData>): boolean {
    const { tooltipInfo: info } = mouseEventData;
    if (isNil(info)) {
      return false;
    }

    const helper = (params.model as ISeries)?.tooltipHelper;
    if (!helper?.activeType.includes('group')) {
      return false;
    }
    return true;
  }

  /** 获取触发 tooltip 需要的信息 */
  getMouseEventData(params: BaseEventParams): MouseEventData {
    let info: GroupTooltipInfo | undefined;
    let ignore: boolean | undefined;

    // 处理mark info
    if (params.model?.modelType === 'series') {
      const series = params.model as ISeries;
      const helper = series.tooltipHelper;
      const activeTriggers = helper?.activeTriggerSet.group;
      const ignoreTriggers = helper?.ignoreTriggerSet.group;
      if (activeTriggers?.has(params.model) || activeTriggers?.has(params.mark)) {
        info = {
          mark: params.mark,
          datum: array(params.datum),
          series,
          dimensionInfo: this._getDimensionInfo(params)
        };
      } else if (ignoreTriggers?.has(params.model) || ignoreTriggers?.has(params.mark)) {
        ignore = true;
      }
    }

    return {
      tooltipInfo: info,
      ignore
    };
  }
}
