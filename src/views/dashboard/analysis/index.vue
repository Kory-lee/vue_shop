<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" />
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue';
  import GrowCard from './components/GrowCard.vue';

  export default defineComponent({
    name: 'Analysis',
    components: { GrowCard },
    setup() {
      const loading = ref(true);
      setTimeout(() => (loading.value = false), 1200);
      return { loading };
    },
  });
</script>
