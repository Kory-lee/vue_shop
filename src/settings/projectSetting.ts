import { primaryColor } from '../../build/config/themeConfig';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  ThemeEnum,
} from '../enums/configEnum';
import { MenuModeEnum, MenuTypeEnum, MixSidebarTriggerEnum, TriggerEnum } from '../enums/menuEnum';
import { ProjectConfig } from '../types/config';
import { SIDE_BAR_BG_COLOR_LIST } from '/@/settings/styleSetting';

const setting: ProjectConfig = {
  showSettingButton: true,

  showDarkModeToggle: true,

  settingButtonPosition: SettingButtonPositionEnum.AUTO,

  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  //Permission-related cache is stored in sessionStorage or localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,

  themeColor: primaryColor,

  grayMode: false,

  colorWeak: false,
  // whether to cancel the menu,the top,the multi-tab page display,for possible embedded in other system
  fullContent: false,

  contentMode: ContentEnum.FULL,

  showLogo: true,
  showFooter: false,

  headerSetting: {
    bgColor: '#ffffff',
    fixed: true,
    show: true,
    theme: ThemeEnum.LIGHT,
    useLockPage: true,
    showFullScreen: true,
    showDoc: true,
    showNotice: true,
    showSearch: true,
  },
  menuSetting: {
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    fixed: true,
    collapsed: false,
    collapsedShowTitle: false,
    // whether it can be dragged
    //Only limited to the opening of the left menu, the mouse has a drag bar on the right side of the menu
    canDrag: true,
    show: true,
    hidden: false,
    menuWidth: 210,
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDEBAR,
    theme: ThemeEnum.DARK,
    split: false,
    topMenuAlign: 'center',
    trigger: TriggerEnum.HEADER,
    accordion: true,
    closeMixSidebarOnChange: false,
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    mixSideFixed: false,
  },
  multipleTabsSetting: {
    cache: false,
    show: true,
    canDrag: true,
    showQuick: true,
    showRefresh: true,
    showFold: true,
  },
  transitionSetting: {
    enable: true,
    basicTransition: RouterTransitionEnum.FADE_SLIDE,
    openPageLoading: true,
  },
  openKeepAlive: true,
  lockTime: 0,
  showBreadCrumb: true,
  showBreadCrumbIcon: false,

  useErrorHandle: true,

  useOpenBackTop: true,
  canEmbedIFramePage: true,

  //whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: true,

  // whether to cancel the http request that has been sent but not responded when switching the interface
  // IF it is enabled, I want overwrite a single interface,can be set in a separate interface
  removeAllHttpPending: true,
};
export default setting;
