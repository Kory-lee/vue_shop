import { primaryColor, themeMode } from '../../build/config/themeConfig';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  RouterTransitionEnum,
  ThemeEnum,
} from '../enums/configEnum';
import { MenuModeEnum, MenuTypeEnum, MixSidebarTriggerEnum, TriggerEnum } from '../enums/menuEnums';
import { ProjectConfig } from '../types/config';
import { isProdMode } from '/@/utils/env';

const setting: ProjectConfig = {
  showSettingButton: true,

  permissionMode: PermissionModeEnum.ROLE,
  permissionCacheType: CacheTypeEnum.LOCAL,

  // color
  themeColor: primaryColor,
  themeMode: themeMode,

  grayMode: true,

  colorWeak: false,
  // whether to cancel the menu,the top,the multi-tab page display,for possible embedded in other system
  fullContent: false,
  contentMode: ContentEnum.FULL,

  showLogo: true,
  showFooter: false,
  locale: {
    show: true,
    lang: 'zh_CN',
    fallback: 'zh_CN',
    availableLocales: ['zh_CN', 'en'],
  },
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
    bgColor: '#001529',
    fixed: true,
    collapsed: false,
    collapsedShowTitle: false,
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
  multiTabsSetting: {
    show: true,
    canDrag: true,
    showQuick: true,
    showRefresh: true,
    showFold: true,
  },
  transitionSetting: {
    enable: true,
    basicTransition: RouterTransitionEnum.FADE_SIDE,
    openPageLoading: true,
    openNProgress: false,
  },
  openKeepAlive: true,
  lockTime: 0,
  showBreadCrumb: true,
  showBreadCrumbIcon: false,
  //TODO
  useErrorHandle: isProdMode(),
  useOpenBackTop: true,
  canEmbedIFramePage: true,
  closeMessageOnSwitch: true,

  // whether to cancel the http request that has been sent but not responded when switching the interface
  // IF it is enabled, I want overwrite a single interface,can be set in a separate interface
  removeAllHttpPending: true,
};
export default setting;
