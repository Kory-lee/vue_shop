<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <LocalePicker
      class="absolute top-4 right-4 text-white xl:text-gray-600 text-lg enter-x"
      size="20"
      :show-text="false"
    />

    <span class="-enter-x xl:hidden">
      <Logo :always-show-title="true" />
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden xl:flex xl:flex-col xl:w-6/12 min-h-full mr-4 pl-4">
          <Logo class="-enter-x" />
          <div class="my-auto">
            <img :src="LoginBg" :alt="title" class="w-1/2 -mt-16 -enter-x" />
            <div class="mt-10 font-medium text-white -enter-x">
              <span class="mt-4 text-3xl inline-block">{{ t('sys.login.signInTitle') }}</span>
            </div>
            <div class="mt-5 text-md text-white font-normal dark:text-gray-500 -enter-x">
              {{ t('sys.login.signInDesc') }}
            </div>
          </div>
        </div>
        <div class="h-full xl:h-auto flex py-5 xl:py-0 xl:my-0 w-full xl:w-6/12">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 py-8 sm:px-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-3/5 xl:w-auto enter-x relative"
          >
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { useI18n } from 'vue-i18n';
  import LoginBg from '/@/assets/svg/login-box-bg.svg';
  import { Logo, useProviderContext } from '/@/components/Application';
  import { useGlobalSetting } from '/@/hooks/setting';
  import { LocalePicker } from '/@/components/Application';
  import LoginForm from './components/loginForm.vue';
  import { localeStore } from '/@/store/modules/locale';
  export default defineComponent({
    name: 'Login',
    components: { Logo, LocalePicker, LoginForm },
    setup() {
      useGlobalSetting;
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('login'),
        { t } = useI18n(),
        globalSetting = useGlobalSetting();

      return {
        prefixCls,
        t,
        title: computed(() => globalSetting?.title ?? ''),
        showLocale: localeStore.getShowPicker,
        LoginBg,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';

  .@{prefix-cls} {
    @media (max-width: @screen-xl) {
      background-image: linear-gradient(180deg, #1c3faa, #1c3faa);
    }
    &::before {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -48%;
      background: url(/@/assets/svg/login-bg.svg) 100% 100% / auto 100% no-repeat;
      @media (max-width: @screen-xl) {
        display: none;
      }
    }
    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &__title {
        font-size: 16px;
        color: #fff;
      }
      img {
        width: 32px;
      }
    }

    .container {
      .@{logo-prefix-cls} {
        display: flex;
        width: 60%;
        height: 80px;

        &__title {
          font-size: 24px;
          color: #fff;
        }

        img {
          width: 48px;
        }
      }
    }
    &-sign-in-way {
      .anticon {
        font-size: 22px;
        color: #888;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }
    .ant-input:not([type='password']),
    .ant-input-password {
      min-width: 380px;
      @media (max-width: @screen-lg) {
        min-width: 330px;
      }
      @media (max-width: @screen-md) {
        min-width: 280px;
      }
      @media (max-width: @screen-sm) {
        min-width: 180px;
      }
    }
    .@{countdown-prefix-cls} input {
      min-width: unset;
    }

    .ant-divider-inner-text {
      font-size: 12px;
      color: @text-color-secondary;
    }
  }
</style>
