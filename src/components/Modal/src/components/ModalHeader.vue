<template>
  <BasicTitle :help-message="helpMessage">
    {{ title }}
  </BasicTitle>
</template>

<script>
  import BasicTitle from '/@/components/Basic/src/BasicTitle.vue';
  export default {
    name: 'BasicModalHeader',
    components: { BasicTitle },
    props: {
      helpMessage: { type: [Array, String], default: '' },
      title: { type: String, default: '' },
    },
  };
</script>
