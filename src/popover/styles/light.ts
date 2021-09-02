import { commonLight, ThemeCommonVars } from '/@/_styles/common';
import _common from './_common';
import { Theme } from '/@/_mixins/use-theme';

export const self = (vars: ThemeCommonVars) => {
  const { boxShadow2, popoverColor, textColor2, borderRadius, fontSize, dividerColor } = vars;
  return {
    ..._common,
    fontSize,
    borderRadius,
    color: popoverColor,
    dividerColor,
    textColor: textColor2,
    boxShadow: boxShadow2,
  };
};

export type PopoverThemeVars = ReturnType<typeof self>;

const popoverLight: Theme<'Popover', PopoverThemeVars> = {
  name: 'Popover',
  common: commonLight,
  self,
};

export type PopoverTheme = typeof popoverLight;

export default popoverLight;
