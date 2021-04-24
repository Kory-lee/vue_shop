<template>
  <div>Description</div>
  <slot></slot>
</template>

<script lang="tsx">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Description',
  });
</script>

<style scoped></style>
