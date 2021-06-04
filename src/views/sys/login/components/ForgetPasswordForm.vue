<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x">
      <FormItem name="account" class="enter-x">
        <Input :placeholder="t('sys.login.username')" size="large" />
      </FormItem>

      <FormItem name="mobile" class="enter-x">
        <Input :placeholder="t('sys.login.mobile')" size="large" />
      </FormItem>

      <FormItem name="sms" class="enter-x">
        <CountDownInput size="large" :placeholder="t('sys.login.smsCode')" />
      </FormItem>

      <FormItem class="enter-x">
        <Button block :loading="loading" type="primary" size="large">{{
          t('common.resetText')
        }}</Button>
        <Button block size="large" class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue-demi';
  import { LoginStateEnum, useLoginState } from '/@/views/sys/login/components/useLogin';
  import LoginFormTitle from '/@/views/sys/login/components/LoginFormTitle.vue';
  import { Form, Button, Input } from 'ant-design-vue';
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import CountDownInput from '/@/components/CountDown';

  export default defineComponent({
    name: 'ForgetPasswordForm',
    components: { CountDownInput, LoginFormTitle, Form, FormItem: Form.Item, Button, Input },
    setup() {
      const loading = ref(false);
      const { t } = useI18n();
      const { handleBackLogin, getLoginState } = useLoginState();

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

      return { loading, getShow, handleBackLogin, t };
    },
  });
</script>
