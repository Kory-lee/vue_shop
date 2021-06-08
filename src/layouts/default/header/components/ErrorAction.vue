<template>
  <Tooltip
    :title="t('layout.header.tooltipErrorLog')"
    placement="bottom"
    :mouse-enter-delay="0.5"
    @click="handleToErrorList"
  >
    <Badge :over-flow-count="99" :offset="[0, 10]" :count="getCount">
      <Icon icon="ion:bug-outline" />
    </Badge>
  </Tooltip>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue-demi';
  import { Tooltip, Badge } from 'ant-design-vue';
  import Icon from '/@/components/Icon';
  import { useI18n } from 'vue-i18n';
  import { useErrorLogStore } from '/@/store/modules/errorLog';
  import { useRouter } from 'vue-router';
  import { PageEnum } from '/@/enums/pageEnum';

  export default defineComponent({
    name: 'ErrorAction',
    components: { Icon, Tooltip, Badge },
    setup() {
      const { t } = useI18n(),
        { push } = useRouter();
      const errorLogStore = useErrorLogStore();
      const getCount = computed(() => errorLogStore.getErrorLogListCount);

      async function handleToErrorList() {
        await push(PageEnum.ERROR_LOG_PAGE);
        errorLogStore.setErrorLogListCount(0);
      }

      return { t, handleToErrorList, getCount };
    },
  });
</script>
