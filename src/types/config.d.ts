import { CacheTypeEnum } from '/@/enums/cacheEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  ThemeEnum,
} from '../enums/configEnum';
import { MenuModeEnum, MenuTypeEnum, MixSidebarTriggerEnum, TriggerEnum } from '../enums/menuEnum';

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko';

export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  collapsed: boolean;
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  theme: ThemeEnum;
  topMenuAlign: 'start' | 'center' | 'end';
  trigger: TriggerEnum;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MixSidebarTriggerEnum;
  mixSideFixed: boolean;
}

export interface MultipleTabsSetting {
  cache: boolean;
  show: boolean;
  showQuick: boolean;
  canDrag: boolean;
  showRefresh: true;
  showFold: boolean;
}
export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
  theme: ThemeEnum;

  showFullScreen: boolean; //全屏按钮
  useLockPage: boolean; //开启全屏功能
  showDoc: boolean; //文档按钮
  showNotice: boolean; //显示消息中心按钮
  showSearch: boolean;
}

export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean;
  // Route basic switching animation
  basicTransition: RouterTransitionEnum;
  // Whether to open page switching loading
  openPageLoading: boolean;
}

export interface ProjectConfig {
  permissionCacheType: CacheTypeEnum;
  // 是否显示配置按钮
  showSettingButton: boolean;
  //whether to show theme switch button
  showDarkModeToggle: boolean;

  settingButtonPosition: SettingButtonPositionEnum;
  // 权限模式
  permissionMode: PermissionModeEnum;
  // 网站灰色模式
  grayMode: boolean;
  //是否开启色弱模式
  colorWeak: boolean;
  themeColor: string;
  // 全屏显示主界面,不显示菜单及顶部
  fullContent: boolean;
  //区域宽度
  contentMode: ContentEnum;
  // 是否显示logo
  showLogo: boolean;
  showFooter: boolean;

  headerSetting: HeaderSetting;
  // 菜单类型
  menuSetting: MenuSetting;

  // 多标签设置
  multipleTabsSetting: MultipleTabsSetting;

  transitionSetting: TransitionSetting;
  // pageLayout是否开启keepAlive
  openKeepAlive: boolean;

  lockTime: number; // 锁屏时间
  showBreadCrumb: boolean; // 显示面包屑
  //显示面包屑图标
  showBreadCrumbIcon: boolean;
  // 使用error-handler-plugin
  useErrorHandle: boolean;
  // 是否开启回到顶部
  useOpenBackTop: boolean;
  // 是否可以嵌入iframe页面
  canEmbedIFramePage: boolean;
  // 切换页面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: boolean;
  // 切换页面的时候是否取消已经发送但是未相应的http请求
  removeAllHttpPending: boolean;
}

export interface GlobalConfig {
  title: string;
  apiUrl: string;
  shortName: string;
  uploadUrl?: string;
  prefixUrl?: string;
}

export interface GlobalEnvConfig {
  // 网站标题
  VITE_GLOBAL_APP_TITLE: string;
  //service interface url
  VITE_GLOBAL_API_URL: string;
  VITE_GLOBAL_API_PREFIX_URL?: string;
  VITE_GLOBAL_APP_SHORT_NAME: string;
  // Upload url
  VITE_GLOBAL_UPLOAD_URL?: string;
}
