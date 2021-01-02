import { RouterTransitionEnum } from '../enums/configEnum';
import { MenuModeEnum, MenuTypeEnum } from '../enums/menuEnums';
import type { LocaleType } from '../locales/types';
export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  collapsed: boolean;
  collapsedShowTitle: boolean;
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
}
export interface MultiTabsSetting {
  // 是否显示
  show: boolean;
  showQuick: boolean; //开启快速操作
  canDrag: boolean;
  showRefresh: true;
}
export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
  theme: ThemeEnum;

  showFullScreen: boolean; //全屏按钮
  useLockpage: boolean; //开启全屏功能
  showDoc: boolean; //文档按钮
  showNotice: boolean; //显示消息中心按钮
  showSearch: boolean;
}
export interface TransitionSetting {
  // whether to open thepage switching animation
  enable: boolean;
  // route basic switching animation
  basicTransition: RouterTransitionEnum;
  //whether  to open page switching loading
  openPageLoading: boolean;

  // whether to open the top progress bar
  openNProgress: boolean;
}
export interface LocaleSetting {
  show: boolean;
  lang: LocaleType;
  fallback: LocaleType;
  availableLocales: LocaleType[];
}

export interface ProjectConfig {
  locale: LocaleSetting;
  permissionCacheType: CacheTypeEnum;
  // 是否显示配置按钮
  showSettingButton: boolean;
  // 权限模式
  permissionMode: PermissionModeEnum;
  grayMode: boolean; // 网站灰色模式
  colorWeak: boolean; //是否开启色弱模式
  themeColor: string;
  fullContent: boolean; // 全屏显示主界面,不显示菜单及顶部
  contentMode: ContentMode; //区域宽度
  showLogo: boolean; // 是否显示logo
  showFooter: boolean;
  headerSetting: HeaderSetting;
  // 菜单类型
  menuSetting: MenuSetting;

  // 多标签设置
  multiTabsSetting: MultiTabsSetting;

  transitionSetting: TransitionSetting;
  // pageLayout是否开启keepAlive
  openKeepAlive: boolean;

  lockTime: number; // 锁屏时间
  showBreadCrumb: boolean; // 显示面包屑
  showBreadCrumbIcon: boolean; //显示面包屑图标
  useErrorHandle: boolean; // 使用error-handler-plugin
  useOpenBackTop: boolean; // 是否开启回到顶部
  canEmbedIFramePage: boolean; // 是否可以嵌入iframe页面
  closeMessageOnSwitch: boolean; // 切换页面的时候是否删除未关闭的message及notify
  // 切换页面的时候是否取消已经发送但是未相应的http请求
  removeAllHttpPending: boolean;
}

export interface GlobalConfig {
  title: string;
  apiUrl: string;
  shortName: string;
  uploadUrl?: string;
  urlPrefix?: string;
}

export interface GlobalEnvConfig {
  // 网站标题
  VITE_GLOBAL_APP_TITLE: string;
  VITE_GLOBAL_API_URL: string;
  VITE_GLOBAL_API_URL_PREFIX?: string;
  VITE_GLOBAL_APP_SHORT_NAME: string;
  VITE_GLOBAL_UPLOAD_URL?: string;
}

interface GLOBALWRAP {
  globalSetting: Readonly<GlobalConfig>;
}

interface ProjectSettingWrap {
  projectSetting: Readonly<ProjectConfig>;
}
