<template>
  <span :class="`${prefixCls}__extra-refresh`" @click="handleRefresh">
    <RedoOutlined :spin="loading" />
  </span>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { RedoOutlined } from '@ant-design/icons-vue';
  import { useProviderContext } from '/@/components/Application';
  import { useTabs } from '/@/hooks/web/useTabs';

  export default defineComponent({
    name: 'TabRefresh',
    components: { RedoOutlined },
    setup() {
      const loading = ref(false);
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('multiple-tabs-content');

      const { refreshPage } = useTabs();

      async function handleRefresh() {
        loading.value = true;
        await refreshPage();
        setTimeout(() => (loading.value = false), 1200);
      }

      return { loading, prefixCls, handleRefresh };
    },
  });
</script>
