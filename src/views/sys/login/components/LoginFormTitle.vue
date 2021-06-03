<template>
  <h2 class="font-bold text-2xl xl:text-3xl text-center xl:text-left mb-6">
    {{ getFormTitle }}
  </h2>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue-demi';
  import { LoginStateEnum, useLoginState } from './useLogin';
  import { useI18n } from 'vue-i18n';

  export default defineComponent({
    name: 'LoginFormTitle',
    setup() {
      const { t } = useI18n();

      const { getLoginState } = useLoginState();

      const getFormTitle = computed(() => {
        const formTitleObj = {
          [LoginStateEnum.RESET_PASSWORD]: t('sys.login.forgetFormTitle'),
          [LoginStateEnum.LOGIN]: t('sys.login.signInFormTitle'),
          [LoginStateEnum.REGISTER]: t('sys.login.signUpFormTitle'),
          [LoginStateEnum.MOBILE]: t('sys.login.mobileSignInFormTitle'),
          [LoginStateEnum.QR_CODE]: t('sys.login.qrSignInFormTitle'),
        };
        return formTitleObj[unref(getLoginState)];
      });

      return { getFormTitle };
    },
  });
</script>
