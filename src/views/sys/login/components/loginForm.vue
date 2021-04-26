<template>
  <h2 v-show="getShow" class="font-bold text-2xl xl:text-3xl enter-x text-center xl:text-left mb-6">
    {{ getFormTitle }}
  </h2>
  <Form v-show="getShow" ref="formRef" class="p-4 enter-x" :model="formData">
    <FormItem name="account" class="enter-x">
      <Input v-model:value="formData.account" size="large" :placeholder="t('sys.login.username')" />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        v-model:value="formData.password"
        size="large"
        visibility-toggle
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
      <Button type="primary" size="large" block :loading="loading" @click="handleLogin">
        {{ t('sys.login.loginButton') }}
      </Button>
    </FormItem>

    <Row class="enter-x">
      <Col :xs="24" :md="7">
        <Button block>{{ t('sys.login.mobileSignInFormTitle') }}</Button>
      </Col>
      <Col :xs="24" :md="{ span: 8, offset: 1 }" class="!my-2 !md:my-0">
        <Button block>{{ t('sys.login.qrSignInFormTitle') }}</Button>
      </Col>
      <Col :xs="24" :md="{ span: 7, offset: 1 }">
        <Button block>{{ t('sys.login.registerButton') }}</Button>
      </Col>
    </Row>

    <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

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
  import { computed, defineComponent, reactive, ref, toRaw, unref } from 'vue';
  import { getLoginState, LoginStateEnum } from './useLogin';

  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue';
  import { notification } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
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
          const formTitleObj = {
            [LoginStateEnum.RESET_PASSWORD]: t('sys.login.forgetFormTitle'),
            [LoginStateEnum.LOGIN]: t('sys.login.signInFormTitle'),
            [LoginStateEnum.REGISTER]: t('sys.login.signUpFormTitle'),
            [LoginStateEnum.MOBILE]: t('sys.login.mobileSignInFormTitle'),
            [LoginStateEnum.QR_CODE]: t('sys.login.qrSignInFormTitle'),
          };
          return formTitleObj[unref(getLoginState)];
        });

      const userStore = useUserStore();

      const formData = reactive({
          account: 'kory',
          password: '123456',
        }),
        getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

      async function handleLogin() {
        if (!unref(formRef)) return;
        const data = await unref(formRef).validate();
        if (!data) return;

        try {
          loading.value = true;
          const userInfo = await userStore.login(
            toRaw({ password: data.password, username: data.account })
          );
          if (userInfo) {
            notification.success({
              message: t('sys.login.loginSuccessTitle'),
              description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
              duration: 3,
            });
          }
        } finally {
          loading.value = false;
        }
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
