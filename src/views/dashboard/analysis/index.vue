<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" />
    <SiteAnalysis class="!my-4 enter-y" :loading="loading" />
    <div class="md:flex enter-y">
      <VisitRadar :loading="loading" class="md:w-1/3 w-full" />
      <VisitSource :loading="loading" class="md:w-1/3 w-full !md:mx-4 !md:my-0 !my-4" />
      <SalesProductPie :loading="loading" class="md:w-1/3 w-full" />
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  import VisitRadar from './components/VisitRadar.vue';
  import VisitSource from './components/VisitSource.vue';
  import SalesProductPie from './components/SalesProductPie.vue';

  export default defineComponent({
    name: 'Analysis',
    components: { SalesProductPie, VisitSource, VisitRadar, GrowCard, SiteAnalysis },
    setup() {
      const loading = ref(true);
      setTimeout(() => (loading.value = false), 1200);
      return { loading };
    },
  });
</script>
