<template>
  <div class="anticon" :class="[theme]">
    <img src="/@/assets/img/logo.png" alt="" />
    <div class="ml-2 ellipsis" v-show="showTitle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Logo',
  props: {
    theme: { type: String as PropType<'light' | 'dark'> },
    showTitle: { type: Boolean, default: true },
  },
  setup() {},
});
</script>

<style lang="less"></style>
