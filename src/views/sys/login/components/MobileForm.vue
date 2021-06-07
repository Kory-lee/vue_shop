<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form ref="formRef" :model="formData" class="p-4 enter-x">
      <FormItem name="mobile" class="enter-x">
        <Input v-model:value="formData.mobile" :placeholder="t('sys.login.mobile')" size="large" />
      </FormItem>
      <FormItem name="sms" class="enter-x" />

      <FormItem class="enter-x">
        <Button block type="primary" size="large" :loading="loading" @click="handleLogin"
          >{{ t('sys.login.loginButton') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>

<script lang="ts">
  import LoginFormTitle from '/@/views/sys/login/components/LoginFormTitle.vue';
  import { LoginStateEnum, useLoginState } from '/@/views/sys/login/components/useLogin';
  import { reactive, ref, unref, computed, defineComponent } from 'vue';
  import { Form, Button, Input } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';

  export default defineComponent({
    name: 'MobileForm',
    components: { LoginFormTitle, Form, FormItem: Form.Item, Button, Input },
    setup() {
      const { t } = useI18n();
      const { handleBackLogin, getLoginState } = useLoginState();
      const loading = ref(false);
      const formData = reactive({
        mobile: '',
        sms: '',
      });

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE);

      function handleLogin() {
        console.log('login');
      }
      return { t, getShow, handleBackLogin, formData, loading, handleLogin };
    },
  });
</script>
