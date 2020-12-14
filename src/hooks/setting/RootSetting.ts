import type { ProjectConfig } from '/@/types/config';

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSettting'
>;
