<template>
  <a-button>ant-button<span>按钮</span></a-button>
  <KoButton :loading="loading" :size="size" @click="handleClick"
    >button<span>按钮</span></KoButton
  >
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import KoButton from "/@/components/Button/button.vue";
export default defineComponent({
  name: "ButtonDemo",
  components: { KoButton },
  setup() {
    const loading = ref(false),
      size = ref("large");
    const handleClick = () => {
      console.log("1231");
      loading.value = !loading.value;
      size.value = "small";
    };
    return { loading, handleClick, size };
  },
});
</script>

<style></style>
