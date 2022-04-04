<template>
  <span :class="`${prefixCls}__extra-fold`" @click="handleFold">
    <Icon :icon="getIcon" />
  </span>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue-demi';
  import { useProviderContext } from '/@/components/Application';
  import { Icon } from '/@/components/Icon';
  import { getShowHeader, setHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { getShowMenu, setMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { triggerWindowResize } from '/@/utils/event';

  export default defineComponent({
    name: 'FoldButton',
    components: { Icon },
    setup() {
      const { getPrefixCls } = useProviderContext();
      const prefixCls = getPrefixCls('multiple-tabs-content');

      const getIsUnFold = computed(() => !unref(getShowMenu) && !unref(getShowHeader));
      const getIcon = computed(() =>
        unref(getIsUnFold) ? 'codicon:screen-normal' : 'codicon:screen-full'
      );

      function handleFold() {
        const isUnFold = unref(getIsUnFold);
        setMenuSetting({
          show: isUnFold,
          hidden: !isUnFold,
        });
        setHeaderSetting({ show: isUnFold });
        triggerWindowResize();
      }
      return { prefixCls, getIcon, handleFold };
    },
  });
</script>
