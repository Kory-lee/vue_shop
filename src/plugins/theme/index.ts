import { isHexColor } from '/@/utils/color';

const HEADER_BG_COLOR_VAR = '--header-bg-color';
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color';
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color';

const SIDEBAR_DARK_BG_COLOR = '--sidebar-dark-bg-color';
const SIDER_DARK_DARKEN_BG_COLOR = '--sidebar-dark-darken-bg-color';

export function setCssVar(prop: string, val: any, dom = document.documentElement) {
  dom.style.setProperty(prop, val);
}
export function updateHeaderBgColor(color: string) {
  if (!isHexColor(color)) return;
  setCssVar(HEADER_BG_COLOR_VAR, color);
}
