<template>
  <h2 v-show="getShow" class="font-bold text-2xl xl:text-3xl text-center xl:text-left mb-6">
    {{ getFormTitle }}
  </h2>
</template>

<script lang="ts">
  import { defineComponent } from 'vue-demi';
  import { computed, unref } from 'vue';
  import { getLoginState, LoginStateEnum } from './useLogin';
  import { useI18n } from 'vue-i18n';

  export default defineComponent({
    name: 'LoginFormTitle',
    setup() {
      const { t } = useI18n();
      const getFormTitle = computed(() => {
          const formTitleObj = {
            [LoginStateEnum.RESET_PASSWORD]: t('sys.login.forgetFormTitle'),
            [LoginStateEnum.LOGIN]: t('sys.login.signInFormTitle'),
            [LoginStateEnum.REGISTER]: t('sys.login.signUpFormTitle'),
            [LoginStateEnum.MOBILE]: t('sys.login.mobileSignInFormTitle'),
            [LoginStateEnum.QR_CODE]: t('sys.login.qrSignInFormTitle'),
          };
          return formTitleObj[unref(getLoginState)];
        }),
        getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

      return { getFormTitle, getShow };
    },
  });
</script>
