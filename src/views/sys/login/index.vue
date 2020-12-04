<template>
  <div class="login">
    <div class="login__mask" />
    <div class="login__form-wrap">
      <div class="login__form mx-6">
        <div class="login__form_content" px-2 py-10>
          <header>
            <img src="" alt="" />
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
                    {{ t('autoLogin') }}
                  </a-checkbox>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item style="{ 'text-align': 'right' }"></a-form-item>
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
                >{{ t('loginButton') }}</a-button
              >
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useI18n } from '/@/plugins/i18n';
import { Checkbox } from 'ant-design-vue';
export default defineComponent({
  name: 'Login',
  components: { ACheckbox: Checkbox },
  setup() {
    const formRef = ref(null),
      autoLogin = ref(false);
    const { t } = useI18n('sys.login');

    const formData = reactive({ account: 'kory', password: 123456 });
    const formState = reactive({ loading: ref(false) });
    const formRules = {
      account: [{ required: true, message: t('accountPlaceholder'), trigger: 'blur' }],
      password: [{ required: true, message: t('passwordPlaceholder'), trigger: 'blur' }],
    };
    const handleClick = () => {};
    return { t, formRef, autoLogin, formData, formState, handleClick, formRules };
  },
});
</script>

<style lang="less">
.login {
  position: relative;
  height: 100vh;
  background-size: 100% 100%;
  &__mask {
    display: none;
    height: 100%;
  }
  &__form {
    position: relative;
    bottom: 60px;
    width: 400px;
    border: 10px solid rgba(255, 255, 255, 0.5);
    border-width: 8px;
    border-radius: 4px;
  }
}
</style>
