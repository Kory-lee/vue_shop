<template>
  <div class="login">
    <div class="login__mask" />
    <div class="login__form-wrap">
      <div class="login__form mx-6">
        <!-- <LangPicker class="login__form-locales" /> -->
        <div class="login__form-content px-2 py-10">
          <header>
            <img src="" class="mr-4" />
            <h1></h1>
          </header>

          <a-form class="mx-auto mt-10" :model="formData" :rules="formRules" ref="formRef">
            <a-form-item name="account">
              <a-input
                size="large"
                v-model:value="formData.account"
                placeholder="username: kory"
              ></a-input>
            </a-form-item>

            <a-form-item name="password">
              <a-input-password
                size="large"
                placeholder="password: 123456"
                v-model:value="formData.password"
                visibilityToggle
              ></a-input-password>
            </a-form-item>
            <a-row>
              <a-col :span="12">
                <a-form-item>
                  <a-checkbox v-model:checked="autoLogin" size="small">
                    {{ t('sys.login.autoLogin') }}
                  </a-checkbox>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item :style="{ 'text-align': 'right' }">
                  <a-button type="link" size="small">{{ t('sys.login.forgetPassword') }}</a-button>
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item>
              <a-button
                type="primary"
                size="large"
                class="rounded-sm"
                :block="true"
                @click="handleClick"
                :loading="formState.loading"
                >{{ t('sys.login.loginButton') }}</a-button
              >
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Checkbox } from 'ant-design-vue';
  import { defineComponent, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  // import LangPicker from '/@/components/LangPicker/index.vue';

  export default defineComponent({
    name: 'Login',
    components: { ACheckbox: Checkbox },
    setup() {
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
      return { t, formRef, autoLogin, formData, formState, handleClick, formRules };
    },
  });
</script>

<style lang="less">
  .login__form-locales {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 1;
  }

  .login {
    position: relative;
    height: 100vh;
    background: url('/@/assets/img/login/login-bg.png') ~'0% 0% / 100% 100%' no-repeat;

    &__mask {
      display: none;
      height: 100%;
      background: url('/@/assets/img/login/login-in.png') ~'30% 30% / 80% 80%' no-repeat;
      // background-position: 30% 30%;
      // background-size: 80% 80%;
      .respond-to(xlarge,{display: block;});
    }
    &__form {
      position: relative;
      bottom: 60px;
      width: 400px;
      background: @white;
      border: 10px solid rgba(255, 255, 255, 0.5);
      border-width: 8px;
      border-radius: 4px;
      background-clip: padding-box;
      .respond-to(xlarge,{margin: 0 120px 0 50px});

      &-wrap {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        .respond-to(xlarge,{justify-content:flex-end});
      }
      &-content {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 60px 0 40px 0;
        border: 1px solid #999;
        border-radius: 2px;
        header {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        img {
          display: inline-block;
          width: 48px;
        }
        h1 {
          margin-bottom: 0;
          font-size: 24px;
          text-align: center;
        }
        form {
          width: 80%;
        }
      }
    }
  }
</style>
