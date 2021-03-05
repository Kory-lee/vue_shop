import { PropType } from 'vue';
import { ThemeEnum } from '/@/enums/configEnum';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnums';
import { MenuType } from '/@/router/types';

export const basicProps = {
  items: { type: Array as PropType<MenuType[]>, default: () => [] },
  collapsedShowTitle: Boolean,
  // 最好是4的倍数
  inlineIndex: { type: Number, default: 20 },
  mode: { type: String as PropType<MenuModeEnum>, default: MenuModeEnum.INLINE },
  type: { type: String as PropType<MenuTypeEnum>, default: MenuTypeEnum.MIX },
  theme: { type: String as PropType<ThemeEnum>, default: ThemeEnum.DARK },
  inlineCollapsed: Boolean,
  mixSidebar: Boolean,
  isHorizontal: Boolean,
  accordion: { type: Boolean, default: true },
  beforeClickFn: { type: Function as PropType<(key: string) => Promise<boolean>> },
};

export const itemProps = {
  item: { type: Object as PropType<MenuType>, default: () => ({}) },
  level: Number,
  theme: { type: String as PropType<'dark' | 'light'> },
  showTitle: Boolean,
  isHorizontal: Boolean,
};

export const contentProps = {
  item: { type: Object as PropType<MenuType>, default: null },
  showTitle: { type: Boolean, default: true },
  level: { type: Number, default: 0 },
  isHorizontal: { type: Boolean, default: true },
};
