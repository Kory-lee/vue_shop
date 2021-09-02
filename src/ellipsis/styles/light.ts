import { createTheme } from '/@/_mixins/use-theme';
import { commonLight } from '/@/_styles/common';

const ellipsisLight = createTheme({
  name: 'Ellipsis',
  common: commonLight,
});

export default ellipsisLight;
export type EllipsisTheme = typeof ellipsisLight;
