<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" />
  </template>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue-demi';
  import { LoginStateEnum } from '/@/views/sys/login/components/useLogin';
  import LoginFormTitle from '/@/views/sys/login/components/LoginFormTitle.vue';
  import { Form } from 'ant-design-vue';

  export default defineComponent({
    name: 'ForgetPasswordForm',
    components: { LoginFormTitle, Form },
    setup() {
      const { handleBackLogin, getLoginState } = useLoginState();

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

      return { getShow, handleBackLogin };
    },
  });
</script>
