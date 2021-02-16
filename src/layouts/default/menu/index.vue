<script lang="tsx">
  import { computed, CSSProperties, defineComponent, PropType, unref } from 'vue';
  import { useProviderContext } from '/@/components/Application/Provider/useAppContext';
  import { MenuModeEnum, MenuSplitTypeEnum } from '/@/enums/menuEnums';
  import {
    getCollapsed,
    getIsHorizontal,
    getIsSidebarType,
    getMenuMode,
    getMenuTheme,
  } from '/@/hooks/setting/menuSetting';
  import { getShowLogo } from '/@/hooks/setting/RootSetting';
  import { useGo } from '/@/hooks/web/usePage';
  import { openWindow } from '/@/utils/common';
  import { isUrl } from '/@/utils/is';
  import { Logo } from '/@/components/Application/index';

  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      theme: { type: String as PropType<'light' | 'dark'> },
      splitType: {
        type: Number as PropType<MenuSplitTypeEnum>,
        default: MenuSplitTypeEnum.NONE,
      },
      isHorizontal: Boolean,
      menuMode: {
        type: [String] as PropType<Nullable<MenuModeEnum>>,
        default: '',
      },
    },
    setup(props) {
      const go = useGo(),
        { isMobile, getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('layout-menu'),
        getRealMenuMode = computed(() =>
          unref(isMobile) ? MenuModeEnum.INLINE : props.menuMode || unref(getMenuMode)
        ),
        getRealMenuTheme = computed(() => props.theme || unref(getMenuTheme)),
        getIsShowLogo = computed(() => unref(getShowLogo) && unref(getIsSidebarType)),
        getUseScroll = computed(
          () =>
            !unref(getIsHorizontal) &&
            (unref(getIsSidebarType) ||
              props.splitType === MenuSplitTypeEnum.LEFT ||
              props.splitType === MenuSplitTypeEnum.NONE)
        ),
        getWrapperStyle = computed(
          (): CSSProperties => ({ height: `calc(100% - ${unref(getIsShowLogo) ? '48px' : '0px'})` })
        ),
        getLogoClass = computed(() => [
          `${prefixCls}-logo`,
          unref(getRealMenuTheme),
          {
            [`${prefixCls}--mobile`]: unref(isMobile),
          },
        ]);

      function handleMenuClick(path: string) {
        go(path);
      }
      async function beforeMenuClickFn(path: string) {
        if (!isUrl(path)) return true;
        openWindow(path);
        return false;
      }

      function renderHeader() {
        if (!unref(isMobile) && !unref(isMobile)) return null;
        return (
          <Logo
            showTitle={!unref(getCollapsed)}
            class={unref(getLogoClass)}
            theme={unref(getRealMenuTheme)}
          />
        );
      }

      function renderMenu() {}
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-menu';
</style>
