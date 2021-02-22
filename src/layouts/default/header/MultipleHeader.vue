<template>
  <div :style="getPlaceholderDomStyle" v-if="getIsShowPlaceholderDom"></div>
  <div :style="getWrapStyle" :class="getClass">
    <LayoutHeader v-if="getShowInsetHeaderRef" />
    <!-- MultipleT -->
  </div>
</template>

<script lang="ts">
  import { computed, CSSProperties, defineComponent, unref } from 'vue';
  import { headerHeightRef } from '../content/contentViewHeight';
  import LayoutHeader from './index.vue';
  import { useProviderContext } from '../../../components/Application/src/Provider/useAppContext';
  import {
    getFixed,
    getHeaderTheme,
    getShowFullHeaderRef,
    getShowHeader,
    getShowInsetHeaderRef,
  } from '../../../hooks/setting/HeaderSetting';
  import { getCalcContentWidth, getSplit } from '/@/hooks/setting/menuSetting';
  import { getShowMultipleTab } from '/@/hooks/setting/MultipleTabSetting';
  import { getFullContent } from '/@/hooks/web/useFullContent';
  const HEADER_HEIGHT = 48,
    TABS_HEIGHT = 32;
  export default defineComponent({
    name: 'LayoutMultipleHeader',
    components: { LayoutHeader },
    setup() {
      const { isMobile, getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('layout-multiple-header'),
        getShowTabs = computed(() => unref(getShowMultipleTab) && !unref(getFullContent)),
        getIsShowPlaceholderDom = computed(() => unref(getFixed) || unref(getShowFullHeaderRef)),
        getWrapStyle = computed(
          (): CSSProperties => {
            const style: CSSProperties = {};
            if (unref(getFixed))
              style.width = unref(isMobile) ? '100%' : unref(getCalcContentWidth);
            if (unref(getShowFullHeaderRef)) style.top = `${HEADER_HEIGHT}px`;
            return style;
          }
        ),
        getIsFixed = computed(() => unref(getFixed) || unref(getShowFullHeaderRef)),
        getPlaceholderDomStyle = computed(
          (): CSSProperties => {
            let height = 0;
            if (
              (unref(getShowFullHeaderRef) || !unref(getSplit)) &&
              unref(getShowHeader) &&
              !unref(getFullContent)
            )
              height += HEADER_HEIGHT;
            if (unref(getShowMultipleTab) && !unref(getFullContent)) height += TABS_HEIGHT;
            headerHeightRef.value = height;
            return { height: `${height}px` };
          }
        ),
        getClass = computed(() => [
          prefixCls,
          `${prefixCls}--${unref(getHeaderTheme)}`,
          { [`${prefixCls}--fixed`]: unref(getIsFixed) },
        ]);
      return {
        getClass,
        prefixCls,
        getPlaceholderDomStyle,
        getIsFixed,
        getWrapStyle,
        getIsShowPlaceholderDom,
        getShowTabs,
        getShowInsetHeaderRef,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-multiple-header';

  .@{prefix-cls} {
    // margin-left: 1px;
    transition: width 0.2s;
    flex: 0 0 auto;

    &--dark {
      margin-left: 0;
    }

    &--fixed {
      position: fixed;
      top: 0;
      z-index: @multiple-tab-fixed-z-index;
      width: 100%;
    }
  }
</style>
