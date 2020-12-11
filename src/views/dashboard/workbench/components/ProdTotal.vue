<template>
  <a-row class="prod-total">
    <template v-for="(item, index) in workProd" :key="item.type">
      <a-col :xs="12" :sm="6" :class="`prod-total__item-${index}`">
        <div class="img" :class="`prod-total__item-${index}-img`"></div>
        <div>{{ item.amount }}</div>
        <span>{{ item.type }}</span>
      </a-col>
    </template>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { workProd } from '../data';
export default defineComponent({
  setup() {
    return { workProd };
  },
});
</script>

<style lang="less"></style>
