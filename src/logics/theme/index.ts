import { ThemeEnum } from '/@/enums/appEnum';
import configStore from '/@/store/modules/config';
import { colorIsDark, darken, isHexColor, lighten } from '/@/utils/color';

const HEADER_BG_COLOR_VAR = '--header-bg-color';
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color';
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color';

const SIDEBAR_DARK_BG_COLOR = '--sidebar-dark-bg-color';
const SIDEBAR_DARK_DARKEN_BG_COLOR = '--sidebar-dark-darken-bg-color';

export function setCssVar(prop: string, val: any, dom = document.documentElement) {
  dom.style.setProperty(prop, val);
}
export function updateHeaderBgColor(color: string) {
  if (!isHexColor(color)) return;
  setCssVar(HEADER_BG_COLOR_VAR, color);
  const hoverColor = lighten(color, 6);
  setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor);
  setCssVar(HEADER_MENU_ACTIVE_BG_COLOR_VAR, hoverColor);

  const isDark = colorIsDark(color);
  configStore.commitProjectConfigState({
    headerSetting: { theme: isDark ? ThemeEnum.DARK : ThemeEnum.LIGHT },
  });
}
export const updateSidebarBgColor = (color: string) => {
  if (isHexColor(color)) return;
  setCssVar(SIDEBAR_DARK_BG_COLOR, color);
  setCssVar(SIDEBAR_DARK_DARKEN_BG_COLOR, darken(color, 6));
};
