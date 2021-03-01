<template>
  <h2 class="font-bold text-2xl xl:text-3xl enter-x text-center xl:text-left mb-6">
    {{ getFormTitle }}
  </h2>
  <Form class="p-4 enter-x" :model="formData" ref="formRef" v-show="getShow">
    <FormItem name="account" class="enter-x">
      <Input size="large" v-model:value="formData.account" :placeholder="t('sys.login.username')" />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>
    <Row class="enter-x">
      <Col :span="12">
        <FormItem>
          <Checkbox v-model="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem style="text-align: right">
          <Button type="link" size="small" @click="(e) => {}">{{
            t('sys.login.forgetPassword')
          }}</Button>
        </FormItem>
      </Col>
    </Row>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
    </FormItem>

    <Row class="enter-x">
      <Col :span="7">
        <Button block>{{ t('sys.login.mobileSignInFormTitle') }}</Button>
      </Col>
      <Col :span="8" :offset="1">
        <Button block>{{ t('sys.login.qrSignInFormTitle') }}</Button>
      </Col>
      <Col :span="7" :offset="1">
        <Button block>{{ t('sys.login.registerButton') }}</Button>
      </Col>
    </Row>

    <Divider class="enter-x">{{ t('sys.login.otherSign') }}</Divider>

    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>
  </Form>
</template>

<script lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useProviderContext } from '/@/components/Application';
  import { Col, Row, Checkbox, Form, Input, Button, Divider } from 'ant-design-vue';
  import { computed, defineComponent, reactive, ref, unref } from 'vue';
  import { getLoginState, LoginStateEnum } from './useLogin';

  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue';
  import { userStore } from '/@/store/modules';
  export default defineComponent({
    name: 'LoginForm',
    components: {
      Col,
      Row,
      Button,
      Checkbox,
      Input,
      Form,
      FormItem: Form.Item,
      InputPassword: Input.Password,
      Divider,
      GithubFilled,
      WechatFilled,
      AlipayCircleFilled,
      GoogleCircleFilled,
      TwitterCircleFilled,
    },
    setup() {
      const { t } = useI18n(),
        { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('login'),
        rememberMe = ref(false),
        formRef = ref<any>(null),
        loading = ref(false),
        getFormTitle = computed(() => {
          const titleObj = {
            [LoginStateEnum.RESET_PASSWORD]: t('sys.login.forgetFormTitle'),
            [LoginStateEnum.LOGIN]: t('sys.login.signInFormTitle'),
            [LoginStateEnum.REGISTER]: t('sys.login.signUpFormTitle'),
            [LoginStateEnum.MOBILE]: t('sys.login.mobileSignInFormTitle'),
            [LoginStateEnum.QR_CODE]: t('sys.login.qrSignInFormTitle'),
          };
          return titleObj[unref(getLoginState)];
        });
      const formData = reactive({ account: 'kory', password: '123456' }),
        getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

      async function handleLogin() {
        if (!unref(formRef)) return;
        const data = await unref(formRef).validate();
        if (!data) return;
        try {
          loading.value = true;
          //TODO
          // const useInfo = userStore.login();
        } catch (e) {}
      }

      return {
        t,
        formData,
        prefixCls,
        getFormTitle,
        rememberMe,
        formRef,
        loading,
        getShow,
        handleLogin,
      };
    },
  });
</script>

<style></style>
