import icon from './src/index.vue';
import svgIcon from './src/SvgIcon.vue';
import { withInstall } from '/@/utils';

export const Icon = withInstall(icon);
export const SvgIcons = withInstall(svgIcon);

export default Icon;
