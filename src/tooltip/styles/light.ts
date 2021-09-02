import { commonLight, ThemeCommonVars } from '/@/_styles/common';
import { createTheme } from '/@/_mixins/use-theme';
import { popoverLight } from '/@/popover/styles';
import commonVars from './_common';

const self = (vars: ThemeCommonVars) => {
  const { borderRadius, boxShadow2: boxShadow, baseColor: textColor } = vars;
  return {
    ...commonVars,
    borderRadius,
    boxShadow,
    textColor,
    color: 'rgba(0, 0, 0, .85)',
  };
};

const tooltipLight = createTheme({
  name: 'Tooltip',
  common: commonLight,
  peers: {
    Popover: popoverLight,
  },
  self,
});

export default tooltipLight;

export type TooltipTheme = typeof tooltipLight;
