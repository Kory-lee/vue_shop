import { colorIsDark, darken, lighten } from '/@/utils/color';
import { ThemeEnum } from '/@/enums/configEnum';
import { useConfigStore } from '/@/store/modules/config';
import { setCssVar } from '/@/logics/theme/utils';
import { unref } from 'vue';
import { getMenuBgColor } from '/@/hooks/setting/useMenuSetting';

const HEADER_BG_COLOR_VAR = '--header-bg-color';
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color';
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color';

const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color';
const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color';
const SIDER_LIGHTEN_BG_COLOR = '--sider-dark-lighten-bg-color';

export function updateHeaderBgColor(color?: string) {
  const configStore = useConfigStore();
  const isDarkMode = configStore.getDarkMode === ThemeEnum.DARK;
  if (!color) {
    if (isDarkMode) color = '#151515';
    else color = configStore.getHeaderSetting.bgColor;
  }
  setCssVar(HEADER_BG_COLOR_VAR, color);

  const hoverColor = lighten(color, 6);
  setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor);
  setCssVar(HEADER_MENU_ACTIVE_BG_COLOR_VAR, hoverColor);

  //Determine the depth of the color value and automatically switch the theme
  const isDark = colorIsDark(color);
  configStore.setProjectConfig({
    headerSetting: { theme: isDark || isDarkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT },
  });
}

// change the background color of the left menu
export function updateSidebarBgColor(color?: string) {
  const configStore = useConfigStore();

  const isDarkMode = configStore.getDarkMode === ThemeEnum.DARK;
  if (!color) {
    if (isDarkMode) color = '#212121';
    else color = unref(getMenuBgColor);
  }

  setCssVar(SIDER_DARK_BG_COLOR, color);
  setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color, 6));
  setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color, 5));

  // only when the background color is #fff, the theme of the menu will be changed to light
  const isLight = ['#fff', '#ffffff'].includes(color.toLowerCase());

  configStore.setProjectConfig({
    menuSetting: { theme: isLight && !isDarkMode ? ThemeEnum.LIGHT : ThemeEnum.DARK },
  });
}
