<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x">
      <FormItem>
        <Input />
      </FormItem>
      <FormItem>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue-demi';
  import { LoginStateEnum, useLoginState } from '/@/views/sys/login/components/useLogin';
  import LoginFormTitle from '/@/views/sys/login/components/LoginFormTitle.vue';
  import { Form, Button, Input } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';

  export default defineComponent({
    name: 'ForgetPasswordForm',
    components: { LoginFormTitle, Form, FormItem: Form.Item, Button, Input },
    setup() {
      const loading = ref(false);
      const { t } = useI18n();
      const { handleBackLogin, getLoginState } = useLoginState();
      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

      return { t, getShow, handleBackLogin, loading };
    },
  });
</script>
