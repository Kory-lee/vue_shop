<template>
  <div class="login">
    <a-row>
      <a-col :xs="0" :md="0" :sm="12" :lg="14" :xl="16" />
      <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="6">
        <div class="login-form">
          <div class="login-hello">hello!</div>
          <div class="login-title">欢迎来到{{ title }}</div>
          <a-form :model="form" @submit="handleSubmit" @submit.prevent>
            <a-form-item>
              <a-input v-model:value="form.username" placeholder="Username">
                <template #prefix>
                  <!-- TODO 前置位图标 -->
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input v-model:value="form.password" placeholder="password">
                <template #prefix>
                  <!-- TODO 前置位图标 -->
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                :disabled="form.username === '' || form.password === ''"
                >登录</a-button
              >
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>
    <div class="login-tips">
      基于vue{{ dependencies["vue"] }} + ant-design-vue{{
        dependencies["ant-design-vue"]
      }}开发
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import pack from "/*/package.json";
export default defineComponent({
  name: "Login",
  components: {},
  setup() {
    const form = reactive({ username: "", password: "" });
    const { dependencies } = pack;
    const handleSubmit = () => {};
    onMounted(() => {
      form.username = "admin";
      form.password = "123465";
    });
    return { form, dependencies, handleSubmit };
  },
});
</script>
<style lang="less">
.login {
  height: 100vh;
  &-form {
    width: calc(100%-40px);
    height: 380px;
    padding: 4vh;
    margin: calc((100vh - 380px) / 2) 20px auto 20px;
    background-size: 100% 100%;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);
  }
  &-hello {
    font-size: 32px;
    // color: #fff;
  }
  &-title {
    margin-bottom: 30px;
    font-size: 20px;
    // color: #fff;
  }
  &-tips {
    position: fixed;
    width: 100%;
    height: 40px;
    color: rgba(255, 255, 255, 0.856);
    text-align: center;
    // TODO
    bottom: 20px;
    .ant-input {
      width: 400px;
      height: 35px;
    }
    .ant-btn {
      width: 365px;
      height: 45px;
      border-radius: 99px;
    }
  }
}
</style>
