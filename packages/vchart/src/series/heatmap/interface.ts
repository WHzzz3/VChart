import type { ICartesianSeriesSpec, ICartesianSeriesTheme } from '../cartesian/interface';
import type { IMarkSpec, IMarkTheme } from '../../typings/spec/common';
import type { IRectMarkSpec } from '../../typings/visual';
import type { IAnimationSpec } from '../../animation/spec';
import type { HeatmapAppearPreset } from './animation';
import type { ILabelSpec } from '../../component/label';
import type { IMarkProgressiveConfig } from '../../mark/interface';

type HeatmapMarks = 'cell' | 'background' | 'label';

export interface IHeatmapSeriesSpec
  extends ICartesianSeriesSpec,
    IAnimationSpec<HeatmapMarks, HeatmapAppearPreset>,
    IMarkProgressiveConfig {
  /**
   *  系列类型
   */
  type: 'heatmap';

  /** 值 field */
  valueField?: string;

  /** 图元配置 */
  cell?: IMarkSpec<IRectMarkSpec>;

  /** 图元背景配置 */
  cellBackground?: IMarkSpec<IRectMarkSpec>;

  /** 标签配置*/
  label?: ILabelSpec & {
    /** 标签位置 */
    position?: 'inside' | 'inside-top' | 'inside-bottom' | 'inside-right' | 'inside-left';
  };
}

export interface IHeatmapSeriesTheme extends ICartesianSeriesTheme {
  cell?: Partial<IMarkTheme<IRectMarkSpec>>;
  cellBackground?: Partial<IMarkTheme<IRectMarkSpec>>;
}
