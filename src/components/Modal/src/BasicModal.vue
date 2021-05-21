<template>
  <Modal />
</template>

<script lang="ts">
  import { defineComponent } from 'vue-demi';
  import Modal from './components/Modal.vue';

  export default defineComponent({
    name: 'BasicModal',
    components: { Modal },
    inheritAttrs: false,
    setup() {},
  });
</script>

<style scoped></style>
