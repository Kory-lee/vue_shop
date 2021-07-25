import { Theme } from '../../_mixins/use-theme';
import commonVars from './_common';

const self = () => commonVars;
export type SpaceThemeVars = ReturnType<typeof self>;
const spaceLight: Theme<'Space', SpaceThemeVars> = {
  name: 'Space',
  self,
};

export default spaceLight;
export type SpaceTheme = typeof spaceLight;
