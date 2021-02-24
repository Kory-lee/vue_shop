<template>
  <Form class="p-4 enter-x">
    <FormItem name="account" class="enter-x">
      <Input size="large" v-model:value="formData.account" :placeholder="t('sys.login.username')" />
    </FormItem>
  </Form>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useProviderContext } from '/@/components/Application';
  import { Col, Row, Checkbox, Form, Input } from 'ant-design-vue';

  export default defineComponent({
    name: 'LoginForm',
    components: { Col, Row, Checkbox, Input, Form, FormItem: Form.Item },
    setup() {
      const { t } = useI18n(),
        { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('login');

      const formData = reactive({ account: 'kory', password: '123456' });
      return { t };
    },
  });
</script>

<style></style>
