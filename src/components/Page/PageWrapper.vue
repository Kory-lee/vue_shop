<template>
  <div :class="getClass">
    <PageHeader
      v-if="content || $slots.headerContent || title"
      ref="headerRef"
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
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref, watch } from '@vue/runtime-core';
  import { PageHeader } from 'ant-design-vue';
  import { CSSProperties } from 'node_modules/vue-demi/lib';
  import { useProviderContext } from '../Application';
  import { omit } from '/@/utils/common';

  export default defineComponent({
    name: 'PageWrapper',
    components: { PageHeader },
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
      // TODO
      // const headerRef = ref<ComponentRef>(null);

      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('page-wrapper');

      const getClass = computed(() => [prefixCls, { [`${prefixCls}-dense`]: props.dense }]);

      const getShowFooter = computed(() => slots?.leftFooter || slots?.rightFooter);

      const getHeaderSlots = computed(() =>
        Object.keys(omit(slots, 'default', 'leftFooter', 'rightFooter', 'headerContent'))
      );

      const getContentClass = computed(
        (): CSSProperties => {
          const { contentBackground, contentClass } = props;
          return [
            `${prefixCls}-content`,
            contentClass,
            { [`${prefixCls}-content-bg`]: contentBackground },
          ];
        }
      );

      const getContentStyle = computed(() => {
        const { contentFullHeight, contentStyle, fixedHeight } = props;
        if (!contentFullHeight) return { ...contentStyle };
        const height = `${unref(pageHeight)}px`;
        return {
          ...contentStyle,
          minHeight: height,
          ...(fixedHeight ? { height } : {}),
          paddibngBottom: `${unref(footerHeight)}px`,
        };
      });

      // watch(()=>[contentHei])

      return { getClass, getShowFooter, getHeaderSlots, getContentClass, getContentStyle };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-page-wrapper';

  .@{prefix-cls} {
    position: relative;
  }
</style>
