<template>
  <a-button>ant-button<span>按钮</span></a-button>
  <Button :loading="loading" :size="size" @click="handleClick" id="kory" class="kory"
    >button<span>按钮</span></Button
  >
  <ButtonGroup>
    <Button :loading="loading" :size="size" @click="handleClick" id="kory" class="kory"
      >button<span>按钮</span>
    </Button>
    <Button :loading="loading" :size="size" @click="handleClick" id="kory" class="kory"
      >button<span>按钮</span>
    </Button>
  </ButtonGroup>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import Button from "/@/components/Button/button.vue";
  import ButtonGroup from "/@/components/Button/button-group.vue";
  export default defineComponent({
    name: "ButtonDemo",
    components: { Button, ButtonGroup },
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

<style lang="less"></style>
