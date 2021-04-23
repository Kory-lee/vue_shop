<script lang="tsx">
  import { computed, CSSProperties, defineComponent, PropType, toRef, unref } from 'vue';
  import useSplitMenu from './useSplitMenu';
  import { Logo, useProviderContext } from '/@/components/Application';
  import { BasicMenu } from '/@/components/Menu';
  import { SimpleMenu } from '/@/components/SimpleMenu';
  import { MenuModeEnum, MenuSplitTypeEnum } from '/@/enums/menuEnum';
  import {
    getAccordion,
    getCollapsed,
    getCollapsedShowTitle,
    getIsHorizontal,
    getIsSidebarType,
    getMenuMode,
    getMenuTheme,
    getMenuType,
    getSplit,
  } from '/@/hooks/setting/useMenuSetting';
  import { getShowLogo } from '../../../hooks/setting/useRootSetting';
  import { useGo } from '/@/hooks/web/usePage';
  import { openWindow } from '/@/utils/common';
  import { isUrl } from '/@/utils/is';

  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      theme: { type: String as PropType<'light' | 'dark'>, default: 'light' },
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
        { menusRef } = useSplitMenu(toRef(props, 'splitType')),
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
        if (!unref(getIsShowLogo) && !unref(isMobile)) return null;

        return (
          <Logo
            showTitle={!unref(getCollapsed)}
            class={unref(getLogoClass)}
            theme={unref(getRealMenuTheme)}
          />
        );
      }

      const getComponentProps = computed(() => {
        const menus = unref(menusRef);
        return {
          menus,
          beforeClickFn: beforeMenuClickFn,
          items: menus,
          theme: unref(getRealMenuTheme),
          accordion: unref(getAccordion),
          collapse: unref(getCollapsed),
          getCollapsedShowTitle: unref(getCollapsedShowTitle),
          onMenuClick: handleMenuClick,
        };
      });

      function renderMenu() {
        const { menus, ...menuProps } = unref(getComponentProps);
        if (!menus?.length) return null;
        return !props.isHorizontal ? (
          <SimpleMenu {...menuProps} isSplitMenu={unref(getSplit)} />
        ) : (
          <BasicMenu
            {...menuProps}
            isHorizontal={props.isHorizontal}
            type={unref(getMenuType)}
            // showLogo={unref(getIsShowLogo)}
            mode={unref(getRealMenuMode)}
          />
        );
      }

      return () => (
        <>
          {renderHeader()}
          {unref(getUseScroll) ? (
            <span style={unref(getWrapperStyle)}>{renderMenu()}</span>
          ) : (
            renderMenu()
          )}
        </>
      );
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-menu';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  .@{prefix-cls} {
    &-logo {
      height: @header-height;
      padding: 10px 4px 10px 10px;

      img {
        width: @logo-width;
        height: @logo-width;
      }

      &--mobile {
        .@{logo-prefix-cls} {
          &__titile {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
