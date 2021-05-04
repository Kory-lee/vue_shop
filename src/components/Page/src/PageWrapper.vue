<template>
  <div :class="getClass">
    <PageHeader
      v-if="content || $slots.headerContent || title || getHeaderSlots?.length"
      ref="headerRef"
      v-bind="$attrs"
      :ghost="ghost"
      :title="title"
    >
      <template #default>
        <template v-if="content">{{ content }}</template>
        <slot v-else name="headerContent" />
      </template>
      <template v-for="item in getHeaderSlots" #[item]="data" :key="item">
        <slot v-bind="data" :name="item" />
      </template>
    </PageHeader>
    <div class="overflow-hidden" :class="getContentClass" :style="getContentStyle">
      <slot />
    </div>
    <PageFooter v-if="getShowFooter" ref="footerRef">
      <template #left>
        <slot name="leftFooter"></slot>
      </template>
      <template #right>
        <slot name="rightFooter"></slot>
      </template>
    </PageFooter>
  </div>
</template>

<script lang="ts">
  import type { CSSProperties, PropType } from 'vue';

  import { PageHeader } from 'ant-design-vue';
  import { useProviderContext } from '../../Application';
  import { omit } from 'lodash-es';
  import { usePageContext } from '/@/hooks/component/usePageContext';
  import { nextTick, computed, defineComponent, ref, unref, watch } from 'vue';
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActived';
  import PageFooter from './PageFooter.vue';

  export default defineComponent({
    name: 'PageWrapper',
    components: { PageHeader, PageFooter },
    inheritAttrs: false,
    props: {
      title: { type: String, default: '' },
      dense: Boolean,
      ghost: Boolean,
      content: { type: String, default: '' },
      contentStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
      contentBackground: Boolean,
      contentFullHeight: Boolean,
      contentClass: { type: String, default: '' },
      fixedHeight: Boolean,
    },
    setup(props, { slots }) {
      const headerRef = ref<ComponentRef>(null),
        footerRef = ref<ComponentRef>(null),
        footerHeight = ref(0);

      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('page-wrapper');

      const { contentHeight, setPageHeight, pageHeight } = usePageContext();

      const getClass = computed(() => [prefixCls, { [`${prefixCls}-dense`]: props.dense }]);

      const getShowFooter = computed(() => slots?.leftFooter || slots?.rightFooter);

      const getHeaderSlots = computed(() =>
        Object.keys(omit(slots, 'default', 'leftFooter', 'rightFooter', 'headerContent'))
      );

      const getContentClass = computed(() => {
        const { contentBackground, contentClass } = props;
        return [
          `${prefixCls}-content`,
          contentClass,
          { [`${prefixCls}-content-bg`]: contentBackground },
        ];
      });

      const getContentStyle = computed(
        (): CSSProperties => {
          const { contentFullHeight, contentStyle, fixedHeight } = props;

          if (!contentFullHeight) return contentStyle;
          const height = `${unref(pageHeight)}px`;
          return {
            ...contentStyle,
            minHeight: height,
            ...(fixedHeight ? { height } : {}),
            paddingBottom: `${unref(footerHeight)}px`,
          };
        }
      );

      watch(
        () => [contentHeight?.value, getShowFooter.value],
        () => {
          calcContentHeight();
        },
        { flush: 'post', immediate: true }
      );

      onMountedOrActivated(() => {
        nextTick(() => calcContentHeight());
      });

      function calcContentHeight() {
        if (!props.contentFullHeight) return;
        //  fix: in contentHeight mode: delay getting footer and header dom element to get the correct height
        const footer = unref(footerRef),
          header = unref(headerRef);
        footerHeight.value = 0;
        const footerEl = footer?.$el;

        if (footerEl) footerHeight.value += footerEl?.offsetHeight ?? 0;

        let headerHeight = 0;
        const headerEl = header?.$el;
        if (headerEl) headerHeight += headerEl?.offsetHeight ?? 0;

        //  fix:subtract content's marginTop and marginBottom value
        let subTractHeight = 0,
          marginBottom = '0px',
          marginTop = '0px';

        const classElements = document.querySelectorAll(getPrefixCls('page-wrapper-content'));
        if (classElements?.length) {
          const contentEl = classElements[0];
          const cssStyle = getComputedStyle(contentEl);
          marginBottom = cssStyle?.marginBottom;
          marginTop = cssStyle?.marginTop;
        }
        if (marginBottom) subTractHeight += Number(marginBottom.replace(/[^\d]/g, ''));

        if (marginTop) subTractHeight += Number(marginTop.replace(/[^\d]/g, ''));

        setPageHeight?.(unref(contentHeight) - unref(footerHeight) - headerHeight - subTractHeight);
      }

      return {
        getClass,
        getShowFooter,
        getHeaderSlots,
        getContentClass,
        getContentStyle,
        pageHeight,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-page-wrapper';

  .@{prefix-cls} {
    position: relative;

    &-content {
      margin: 16px;

      &-bg {
        background-color: @component-background;
      }
    }

    &--dense &-content {
      margin: 0;
    }

    ::v-deep(.ant-page-header) {
      &:empty {
        padding: 0;
      }
    }
  }
</style>
