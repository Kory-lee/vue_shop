<template>
  <div>{{ dependencies }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dependencies, devDependencies } from "/*/package.json";
export default defineComponent({
  setup() {
    return {
      updateTime: "",
      dependencies,
      devDependencies,
    };
  },
});
</script>

<style></style>
