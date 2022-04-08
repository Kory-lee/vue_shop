<template>
  <Dropdown
    :drop-menu-list="getDropMenuList"
    :trigger="getTrigger"
    overlay-class-name="multiple-tabs__dropdown"
    @menu-event="handleMenuEvent"
    placement="bottom"
  >
    <div v-if="getIsTabs" :class="`${prefixCls}__info`" @contextmenu.prevent="handleContext">
      <span class="ml-1">{{ getTitle }}</span>
    </div>
    <span v-else :class="`${prefixCls}__extra-quick`" @click.prevent="handleContext">
      <Icon icon="ion:chevron-down" />
    </span>
  </Dropdown>
</template>

<script lang="ts">
  import type { RouteLocationNormalized } from 'vue-router';

  import { defineComponent, PropType } from 'vue';
  import Dropdown from '/@/components/Dropdown';
  import Icon from '/@/components/Icon';
  import { useI18n } from 'vue-i18n';
  import { computed } from 'vue-demi';
  import { useTabDropdown } from '/@/layouts/default/tabs/useTabDropdown';
  import { getPrefixCls } from '/@/hooks/web/useDesign';

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
      const prefixCls = getPrefixCls('multiple-tabs-content');
      const { t } = useI18n();

      const getTitle = computed(() => {
        const { tabItem: { meta } = {} } = props;
        return meta && t(meta.title as string);
      });
      const getIsTabs = computed(() => !props.isExtra);
      const getTrigger = computed(() => (props.isExtra ? ['click'] : ['contextmenu']));

      const { getDropMenuList, handleContextMenu, handleMenuEvent } = useTabDropdown(
        props,
        getIsTabs
      );

      function handleContext() {
        props.tabItem && handleContextMenu(props.tabItem);
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
