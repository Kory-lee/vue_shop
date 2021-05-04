<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" />
    <SiteAnalysis class="!my-4 enter-y" :loading="loading" />
    <div class="md:flex enter-y">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import SiteAnalysis from '/@/views/dashboard/analysis/components/SiteAnalysis.vue';
  import VisitRadar from '/@/views/dashboard/analysis/components/VisitRadar.vue';

  export default defineComponent({
    name: 'Analysis',
    components: { VisitRadar, GrowCard, SiteAnalysis },
    setup() {
      const loading = ref(true);
      setTimeout(() => (loading.value = false), 1200);
      return { loading };
    },
  });
</script>
