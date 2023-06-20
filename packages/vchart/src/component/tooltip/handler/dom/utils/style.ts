import type { Maybe } from '@visactor/vutils';
import type { FontWeight, TextAlign } from '../../../../../typings';
import { isValid, merge, isArray } from '../../../../../util';
import type { ITooltipTheme } from '../../../interface';
import type { ITextStyle, ITooltipStyle } from '../../interface';
import type { ILabelStyle, IMargin, IShapeStyle, IDomTooltipStyle } from '../interface';
import type { TooltipAttributes } from '@visactor/vrender-components';

const DEFAULT_SHAPE_SPACING = 8;
const DEFAULT_KEY_SPACING = 26;
const DEFAULT_VALUE_SPACING = 0;

const getPixelPropertyStr = (num?: number | number[], defaultStr?: string) => {
  if (isValid(num)) {
    if (isArray(num)) {
      return num.map(n => `${n}px`).join(' ');
    }
    return `${num}px`;
  }
  return defaultStr ?? 'initial';
};

export function getDomStyles(style: ITooltipStyle, attributeCache?: Maybe<TooltipAttributes>): IDomTooltipStyle {
  const {
    panel: {
      fill: fillColor,
      shadow,
      shadowBlur,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      shadowSpread,
      cornerRadius,
      stroke: strokeColor,
      lineWidth
    },
    padding,
    key,
    value,
    title,
    shape,
    maxWidth,
    minWidth,
    enterable,
    spaceRow,
    transitionDuration
  } = style;

  const backgroundColor = fillColor as string;

  const styles = {
    panel: {
      width: getPixelPropertyStr(
        isValid(attributeCache?.panel?.width)
          ? attributeCache!.panel!.width - (padding.left ?? 0) - (padding.right ?? 0)
          : undefined
      ),
      height: getPixelPropertyStr(
        isValid(attributeCache?.panel?.height)
          ? attributeCache!.panel!.height - (padding.top ?? 0) - (padding.bottom ?? 0)
          : undefined
      ),
      paddingBottom: getPixelPropertyStr(padding.bottom),
      paddingLeft: getPixelPropertyStr(padding.left),
      paddingRight: getPixelPropertyStr(padding.right),
      paddingTop: getPixelPropertyStr(padding.top),
      borderColor: strokeColor,
      borderWidth: getPixelPropertyStr(lineWidth),
      borderRadius: getPixelPropertyStr(cornerRadius),
      backgroundColor: backgroundColor ? `${backgroundColor}` : 'transparent',
      boxShadow: shadow
        ? `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`
        : 'initial',
      maxWidth: getPixelPropertyStr(maxWidth),
      minWidth: getPixelPropertyStr(minWidth),
      pointerEvents: enterable ? 'auto' : 'none',
      transitionDuration: transitionDuration ? `${transitionDuration}ms` : 'initial',
      transitionProperty: transitionDuration ? 'transform' : 'initial',
      transitionTimingFunction: transitionDuration ? 'ease-out' : 'initial'
    },
    title: getLabelStyle(title),
    content: {},
    shapeColumn: {
      item: getShapeStyle(shape),
      width: getPixelPropertyStr(shape.size),
      marginRight: getPixelPropertyStr(shape.spacing ?? DEFAULT_SHAPE_SPACING)
    },
    keyColumn: {
      item: getLabelStyle(key),
      width: getPixelPropertyStr(attributeCache?.keyWidth),
      marginRight: getPixelPropertyStr(key.spacing ?? DEFAULT_KEY_SPACING)
    },
    valueColumn: {
      item: getLabelStyle(value),
      width: getPixelPropertyStr(attributeCache?.valueWidth),
      marginRight: getPixelPropertyStr(value.spacing ?? DEFAULT_VALUE_SPACING)
    }
  } as IDomTooltipStyle;

  if (isValid(spaceRow)) {
    const gapUnit = spaceRow / 2;
    ([styles.shapeColumn.item, styles.keyColumn.item, styles.valueColumn.item] as IMargin[]).forEach(obj => {
      obj.marginTop = getPixelPropertyStr(gapUnit);
      obj.marginBottom = obj.marginTop;
    });
    styles.content.marginTop = getPixelPropertyStr(-gapUnit);
    styles.content.marginBottom = styles.content.marginTop;
  } else {
    ([styles.content, styles.shapeColumn.item, styles.keyColumn.item, styles.valueColumn.item] as IMargin[]).forEach(
      obj => {
        obj.marginTop = 'initial';
        obj.marginBottom = 'initial';
      }
    );
  }
  return styles;
}

function getLabelStyle(labelStyle?: ITextStyle, defaultStyle?: Partial<ITextStyle>): ILabelStyle | undefined {
  if (!labelStyle) {
    return undefined;
  }
  const {
    fontFamily: labelFont,
    fontSize: labelFontSize,
    fill: labelColor,
    textAlign,
    lineHeight,
    fontWeight
  } = merge({}, defaultStyle, labelStyle) as ITextStyle;
  const styleObj: ILabelStyle = {};

  styleObj.fontFamily = labelFont;
  styleObj.fontSize = getPixelPropertyStr(labelFontSize);
  styleObj.color = labelColor as string;
  styleObj.textAlign = textAlign as TextAlign;
  styleObj.lineHeight = getPixelPropertyStr(lineHeight);
  styleObj.fontWeight = fontWeight as FontWeight;
  return styleObj;
}

function getShapeStyle(
  shapeStyle?: ITooltipTheme['shape'],
  defaultStyle?: Partial<ITooltipTheme['shape']>
): IShapeStyle | undefined {
  if (!shapeStyle) {
    return undefined;
  }
  const { size } = merge({}, defaultStyle, shapeStyle);
  const styleObj: IShapeStyle = {};

  styleObj.width = getPixelPropertyStr(size);
  styleObj.height = styleObj.width;
  return styleObj;
}
