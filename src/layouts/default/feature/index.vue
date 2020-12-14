<template>
  <BackTop v-if="getUseOpenBackTop" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BackTop } from 'ant-design-vue';
export default defineComponent({
  name: 'LayoutFeatures',
  components: { BackTop },
  setup() {},
});
</script>

<style></style>
