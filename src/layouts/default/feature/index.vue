<template>
  <BackTop v-if="getUseOpenBackTop" :target="getTarget" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BackTop } from 'ant-design-vue';
import { getUseOpenBackTop } from '../../../hooks/setting/useRootSetting';
export default defineComponent({
  name: 'LayoutFeatures',
  components: { BackTop },
  setup() {
    return { getUseOpenBackTop, getTarget: () => document.body };
  },
});
</script>

<style></style>
