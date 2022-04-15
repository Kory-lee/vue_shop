import { Theme } from '/@/_mixins/use-theme';
import { commonLight } from '/@/_styles/common';

export const self = () => ({});

export type FormThemeVars = ReturnType<typeof self>;

const formLight: Theme<'Form', FormThemeVars> = {
  name: 'Form',
  common: commonLight,
  self,
};

export default formLight;
export type FormTheme = typeof formLight;
