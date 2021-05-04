<template>
  <Card
    v-bind="$attrs"
    :tab-list="tabListTitle"
    :active-tab-key="activeKey"
    :loading="loading"
    @tab-change="onTabChange"
  >
    <p v-if="activeKey === 'tab1'">
      <VisitAnalysis />
    </p>
    <p v-else-if="activeKey === 'tab2'">
      <VisitAnalysisBar />
    </p>
  </Card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue-demi';
  import { Card } from 'ant-design-vue';
  import { ref } from 'vue';
  import VisitAnalysis from '/@/views/dashboard/analysis/components/VisitAnalysis.vue';
  import VisitAnalysisBar from '/@/views/dashboard/analysis/components/VisitAnalysisBar.vue';

  export default defineComponent({
    name: 'SiteAnalysis',
    components: { VisitAnalysisBar, Card, VisitAnalysis },
    props: { loading: Boolean },
    setup() {
      const activeKey = ref('tab1');

      const tabListTitle = [
        { key: 'tab1', tab: '趋势' },
        { key: 'tab2', tab: '访问量' },
      ];
      function onTabChange(key: string) {
        activeKey.value = key;
      }
      return { activeKey, tabListTitle, onTabChange };
    },
  });
</script>
