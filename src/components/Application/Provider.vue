<template>
  <ConfigProvider v-bind="$attrs">
    <slot />
  </ConfigProvider>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
export default defineComponent({
  name: 'Provider',
  inheritAttrs: false,
  components: { ConfigProvider },
  setup(props, { attrs }) {
    console.log(attrs);
  },
});
</script>
