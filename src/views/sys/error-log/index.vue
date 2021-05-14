<template>
  <div class="p-4">
    <template v-for="src in imgList" :key="src"></template>
  </div>
</template>

<script lang="ts">
  import type { ErrorLogInfo } from '/@/types/store';

  import { defineComponent, watch, ref } from 'vue-demi';
  import { useI18n } from 'vue-i18n';
  import { useErrorLogStore } from '/@/store/modules/errorLog';
  import { nextTick } from 'vue';

  export default defineComponent({
    name: 'ErrorLog',
    setup() {
      const rowInfo = ref<ErrorLogInfo>();
      const imgList = ref<string[]>([]);

      const { t } = useI18n();
      const errorLogStore = useErrorLogStore();
      // const [register] = useTable

      watch(
        () => errorLogStore.getErrorLogInfoList,
        (list) => {
          nextTick(() => {
            console.log(list);
          });
        },
        { immediate: true }
      );

      return { imgList, t, rowInfo };
    },
  });
</script>
