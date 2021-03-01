<script lang="tsx">
  import { computed, CSSProperties, defineComponent, h, PropType, toRef, unref } from 'vue';
  import { useSplitMenu } from './utils';
  import { Logo } from '/@/components/Application';
  import { useProviderContext } from '../../../components/Application/src/Provider/useAppContext';
  import { BasicMenu } from '/@/components/Menu';
  import { SimpleMenu } from '/@/components/SimpleMenu';
  import { MenuModeEnum, MenuSplitTypeEnum } from '/@/enums/menuEnums';
  import {
    getAccordion,
    getCollapsed,
    getCollapsedShowTitle,
    getIsHorizontal,
    getIsSidebarType,
    getMenuMode,
    getMenuTheme,
    getMenuType,
  } from '../../../hooks/setting/MenuSetting';
  import { getShowLogo } from '/@/hooks/setting/RootSetting';
  import { useGo } from '/@/hooks/web/usePage';
  import { openWindow } from '/@/utils/common';
  import { isUrl } from '/@/utils/is';

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

      function renderMenu() {
        // const menus = unref(menusRef);
        const menus = [
          {
            path: '/home/welcome',
            name: 'routes.dashboard.welcome',
            icon: 'bx:bx-home',
          },
          {
            name: 'routes.dashboard.dashboard',
            path: '/dashboard',
            icon: 'bx:bx-home',
          },
          {
            name: 'routes.demo.permission.permission',
            path: '/permission',
            icon: 'carbon:user-role',
          },
          {
            name: 'routes.demo.feat.feat',
            path: '/feat',
            icon: 'ic:outline-featured-play-list',
          },
          {
            name: 'routes.demo.page.page',
            path: '/page-demo',
            icon: 'mdi:page-next-outline',
          },
          {
            name: 'routes.demo.comp.comp',
            path: '/comp',
            icon: 'ic:outline-settings-input-component',
          },
          {
            name: 'routes.demo.charts.charts',
            path: '/charts',
            icon: 'vaadin:spline-area-chart',
          },
          {
            name: 'routes.demo.iframe.frame',
            path: '/frame',
            icon: 'mdi:page-next-outline',
          },
        ];
        // console.log(menus);
        if (!menus || !menus.length) return null;
        return !props.isHorizontal ? (
          <SimpleMenu
            beforeClickFn={beforeMenuClickFn}
            items={menus}
            theme={unref(getRealMenuTheme)}
            accordion={unref(getAccordion)}
            collapse={unref(getCollapsed)}
            collapsedShowTitle={unref(getCollapsedShowTitle)}
            onMenuClick={handleMenuClick}
          />
        ) : (
          <BasicMenu
            beforeClickFn={beforeMenuClickFn}
            isHorizontal={props.isHorizontal}
            type={unref(getMenuType)}
            collapsedShowTitle={unref(getCollapsedShowTitle)}
            // showLogo={unref(getIsShowLogo)}
            mode={unref(getRealMenuMode)}
            theme={unref(getRealMenuTheme)}
            items={menus}
            accordion={unref(getAccordion)}
            onMenuClick={handleMenuClick}
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
