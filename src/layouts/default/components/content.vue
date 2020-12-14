<template>
  <div>
    <transition name="fade" mode="out-in" :duration="{ enter: 500, leave: 800 }"> </transition>
  </div>
  <PageLayout />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageLayout from '/@/layouts/page/index.vue';
export default defineComponent({
  name: 'LayoutContent',
  components: { PageLayout },
});
</script>

<style></style>
