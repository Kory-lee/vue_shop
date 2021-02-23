<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <span class="-enter-x xl:hiddden">
      <Logo :alwaysShowTitle="true" />
    </span>
    <div class="container relative h-full py-2 mx-auto sm:px-10"></div>
  </div>
</template>

<script lang="ts">
  import { Checkbox } from 'ant-design-vue';
  import { defineComponent, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Logo, useProviderContext } from '/@/components/Application';
  // import LangPicker from '/@/components/LangPicker/index.vue';

  export default defineComponent({
    name: 'Login',
    components: { ACheckbox: Checkbox, Logo },
    setup() {
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('login');

      const formRef = ref(null),
        autoLogin = ref(false);
      const { t } = useI18n();

      const formData = reactive({ account: 'kory', password: 123456 });
      const formState = reactive({ loading: ref(false) });
      const formRules = {
        account: [{ required: true, message: t('sys.login.accountPlaceholder'), trigger: 'blur' }],
        password: [
          { required: true, message: t('sys.login.passwordPlaceholder'), trigger: 'blur' },
        ],
      };
      const handleClick = () => {};
      return { prefixCls, t, formRef, autoLogin, formData, formState, handleClick, formRules };
    },
  });
</script>

<style lang="less"></style>
