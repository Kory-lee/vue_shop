<template>
  <Dropdown :drop-menu-list="getDropMenuList" :trigger="getTrigger" @menu-event="handleMenuEvent">
    <div v-if="getIsTabs" :class="`${prefixCls}__info`" @contextmenu="handleContext">
      <span class="ml-1">{{ getTitle }}</span>
    </div>
    <span v-else :class="`${prefixCls}__extra-quick`" @click="handleContext">
      <Icon icon="ion:chevron-down" />
    </span>
  </Dropdown>
</template>

<script lang="ts">
  import type { RouteLocationNormalized } from 'vue-router';

  import { defineComponent, PropType } from 'vue';
  import Dropdown from '/@/components/Dropdown';
  import Icon from '/@/components/Icon';
  import { useProviderContext } from '/@/components/Application';
  import { useI18n } from 'vue-i18n';
  import { computed } from 'vue-demi';
  import { useTabDropdown } from '/@/layouts/default/tabs/useTabDropdown';

  export default defineComponent({
    name: 'TabContent',
    components: { Dropdown, Icon },
    props: {
      tabItem: {
        type: Object as PropType<RouteLocationNormalized>,
        default: null,
      },
      isExtra: Boolean,
    },
    setup(props) {
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('multiple-tabs-content'),
        { t } = useI18n();

      const getTitle = computed(() => {
        const { tabItem: { meta } = {} } = props;
        return meta && t(meta.title as string);
      });
      const getIsTabs = computed(() => !props.isExtra),
        getTrigger = computed(() => (props.isExtra ? ['click'] : ['contextmenu']));

      const { getDropMenuList, handleContextMenu, handleMenuEvent } = useTabDropdown(
        props,
        getIsTabs
      );

      function handleContext(e) {
        props.tabItem && handleContextMenu(props.tabItem)(e);
      }
      return {
        prefixCls,
        getTitle,
        getIsTabs,
        getTrigger,
        getDropMenuList,
        handleMenuEvent,
        handleContext,
      };
    },
  });
</script>

<style scoped></style>
