import type { ThemeCommonVars } from '/@/_styles/common';
import type { Theme } from '/@/_mixins/use-theme';

import sizeVariables from './_common';
import { commonLight } from '/@/_styles/common';
import { composite } from 'seemly';

export const self = (vars: ThemeCommonVars) => {
  const {
    cardColor,
    modalColor,
    popoverColor,
    lineHeight,
    dividerColor,
    tableHeaderColor,
    textColor1,
    textColor2,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontWeightStrong,
  } = vars;
  return {
    ...sizeVariables,
    modalColor,
    lineHeight,
    borderRadius,
    borderColor: composite(cardColor, dividerColor),
    borderColorModal: composite(modalColor, dividerColor),
    borderColorPopover: composite(popoverColor, dividerColor),
    tdColor: cardColor,
    tdColorModal: modalColor,
    tdColorPopover: popoverColor,
    thColor: composite(cardColor, tableHeaderColor),
    thColorModal: composite(modalColor, tableHeaderColor),
    thColorPopover: composite(popoverColor, tableHeaderColor),
    thTextColor: textColor1,
    tdTextColor: textColor2,
    thFontWeight: fontWeightStrong,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
  };
};

export type TableThemeVars = ReturnType<typeof self>;

const tableLight: Theme<'Table', TableThemeVars> = {
  name: 'Table',
  common: commonLight,
  self,
};

export default tableLight;
export type TableTheme = typeof tableLight;
