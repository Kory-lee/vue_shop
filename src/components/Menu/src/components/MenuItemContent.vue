<template>
  <span :class="`${prefixCls}-wrapper`">
    <Icon v-if="getIcon" :icon="getIcon" :class="`${prefixCls}-wrapper__icon`" :size="18" />
    {{ getI18nName }}
  </span>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { contentProps } from '../props';
  import { useProviderContext } from '/@/components/Application';
  import Icon from '/@/components/Icon';
  export default defineComponent({
    name: 'MenuItemContent',
    components: { Icon },
    props: contentProps,
    setup(props) {
      const { t } = useI18n();

      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('basic-menu-item-content'),
        getI18nName = computed(() => t(props.item?.name)),
        getIcon = computed(() => props.item?.icon);

      return { prefixCls, getI18nName, getIcon };
    },
  });
</script>
