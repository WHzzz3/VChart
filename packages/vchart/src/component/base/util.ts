import type { IChart } from '../../chart/interface';
import type { ITheme } from '../../theme';
import { getOrient } from '../axis/cartesian/util';
import { getCartesianAxisTheme, getPolarAxisTheme } from '../axis/util';
import { getCartesianCrosshairTheme, getPolarCrosshairTheme } from '../crosshair/util';
import { ComponentTypeEnum } from '../interface';
import { getLayout } from '../legend/util';

export function getComponentThemeFromGlobalTheme(
  type: ComponentTypeEnum,
  theme: ITheme,
  componentSpec: any,
  chart: IChart
) {
  switch (type) {
    case ComponentTypeEnum.cartesianBandAxis:
      return getCartesianAxisTheme(getOrient(componentSpec), 'band', theme);
    case ComponentTypeEnum.cartesianLinearAxis:
      return getCartesianAxisTheme(getOrient(componentSpec), 'linear', theme);
    case ComponentTypeEnum.cartesianLogAxis:
      return getCartesianAxisTheme(getOrient(componentSpec), 'log', theme);
    case ComponentTypeEnum.cartesianSymlogAxis:
      return getCartesianAxisTheme(getOrient(componentSpec), 'symlog', theme);
    case ComponentTypeEnum.cartesianAxis:
    case ComponentTypeEnum.cartesianTimeAxis:
      return getCartesianAxisTheme(getOrient(componentSpec), undefined, theme);
    case ComponentTypeEnum.polarBandAxis:
      return getPolarAxisTheme(componentSpec.orient, 'band', theme);
    case ComponentTypeEnum.polarLinearAxis:
      return getPolarAxisTheme(componentSpec.orient, 'linear', theme);
    case ComponentTypeEnum.polarAxis:
      return getPolarAxisTheme(componentSpec.orient, undefined, theme);
    case ComponentTypeEnum.cartesianCrosshair:
      return getCartesianCrosshairTheme(theme, chart);
    case ComponentTypeEnum.polarCrosshair:
      return getPolarCrosshairTheme(theme, chart);
    case ComponentTypeEnum.colorLegend:
      return theme.component?.colorLegend[getLayout(componentSpec)];
    case ComponentTypeEnum.sizeLegend:
      return theme.component?.sizeLegend[getLayout(componentSpec)];
    default:
      return theme.component?.[type];
  }
}
