<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <div class="enter-x min-w-64 min-h-64">
      <QrCode
        :value="qrCodeUrl"
        tag="img"
        class="enter-x flex justify-center xl:justify-start"
        :width="280"
      />
      <Divider class="enter-x">{{ t('sys.login.scanSign') }}</Divider>
      <Button block size="large" class="mt-4 enter-x" @click="handleBackLogin"
        >{{ t('sys.login.backSignIn') }}
      </Button>
    </div>
  </template>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue-demi';
  import { LoginStateEnum, useLoginState } from './useLogin';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Button, Divider } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  import QrCode from '/@/components/QrCode/src/QrCode.vue';

  const qrCodeUrl = '//github.com/korylee';

  export default defineComponent({
    name: 'QrCodeForm',
    components: { QrCode, LoginFormTitle, Button, Divider },
    setup() {
      const { t } = useI18n();
      const { handleBackLogin, getLoginState } = useLoginState();
      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE);

      return { t, getShow, handleBackLogin, qrCodeUrl };
    },
  });
</script>
