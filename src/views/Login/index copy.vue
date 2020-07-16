<template>
  <div id="login">
    <div class="login-wrap clearfix">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          style="user-select: none;"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <el-form ref="loginRef" :model="ruleForm" status-icon size="medium" class="login-form">
        <el-form-item label="邮箱" prop="email" class="item-form" :rules="rules.email">
          <el-input v-model="ruleForm.email" type="text" placeholder="请输入邮箱" autocomplete="off" clearable>
            <template #prepend>
              <svg-icon iconName="email" class="regular"></svg-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" class="item-form" :rules="rules.pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            show-password
            autocomplete="off"
            minlength="6"
            maxlength="20"
            placeholder="请输入密码"
          >
            <template #prepend>
              <svg-icon iconName="password" class="regular"></svg-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="model === 'register'" label="确认密码" prop="pass2" class="item-form" :rules="rules.pass2">
          <el-input
            v-model="ruleForm.pass2"
            type="password"
            placeholder="请再次输入密码"
            show-password
            autocomplete="off"
            minlength="6"
            maxlength="20"
          >
            <template #prepend> <svg-icon iconName="password" class="regular"></svg-icon> </template
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" class="item-form" :rules="rules.code">
          <el-row :gutter="10" class="clearfix">
            <el-col :span="16">
              <el-input
                v-model="ruleForm.code"
                type="text"
                minlength="6"
                maxlength="6"
                autocomplete="off"
                placeholder="请输入验证码"
              >
                <template #prepend>
                  <svg-icon iconName="safe" class="regular"></svg-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="success" class="block" :disabled="codeButton.status" @click="getSms()">
                {{ codeButton.text }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            :disabled="loginButtonStatus"
            class="login-btn block"
            @click="submitForm('loginRef')"
          >
            {{ model === 'login' ? '登录' : '注册' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1';
import { GetSms, Register } from '@api/login';
import { reactive, ref, watch, onUnmounted } from '@vue/composition-api';
import { is, isEmail, isPassword, stripScript } from '@utils/validate';
export default {
  name: 'Login',
  setup(props, { refs, root }) {
    /**
      context: { attrs, emit, listeners, parent, refs, root }
     */
    let timer;
    const model = ref('login'),
      loginButtonStatus = ref(true),
      timerId = ref(60);
    const menuTab = reactive([
        { txt: '登录', current: true, type: 'login' },
        { txt: '注册', current: false, type: 'register' },
      ]),
      codeButton = reactive({
        text: '获取验证码',
        status: false,
      }),
      ruleForm = reactive({
        email: '923033576@qq.com',
        pass: 'hql971028',
        code: '',
        pass2: '',
      });
    const validatePass = (rule, value, callback) => {
      value = ruleForm.pass = stripScript(value);
      if (!value) callback(new Error('密码不能为空'));
      else if (!isPassword(value)) callback(new Error('数字字母组合且不少于6位'));
      else callback();
    };
    const rules = {
      email: [
        [
          { require: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
        ],
      ],
      pass: [{ require: true, validator: validatePass, trigger: 'blur' }],
      pass2: [
        {
          validator: (rule, value, callback) => {
            if (!value) callback(new Error('请再次输入密码'));
            else if (value !== ruleForm.pass) callback(new Error('重复密码不正确'));
            else callback();
          },
          trigger: 'blur',
        },
      ],
      code: [
        {
          validator: (rule, value, callback) => {
            if (!value) return callback(new Error('验证码不能为空'));
            if (!is('vcode', value)) callback(new Error('验证码格式有误'));
            else callback();
          },
          trigger: 'blur',
        },
      ],
    };
    watch(timerId, (value) => {
      if (!value) {
        timerId.value = 60;
        loginButtonStatus.value = true;
      }
    });

    const updateCodeButton = ({ status, text } = codeButton) => {
      codeButton.text = text;
      codeButton.status = status;
    };
    // 重置表单数据
    const resetFormData = () => refs.loginRef.resetFields();

    // 倒计时
    const countDown = () => {
      timer = setInterval(() => {
        timerId.value--;
        codeButton.text = `倒计时${timerId.value}秒`;
        if (!timerId.value) initCountDown('重新获取');
      }, 1000);
    };
    const initCountDown = (text = '获取验证码') => {
      clearInterval(timer);
      timer = null;
      updateCodeButton({ status: false, text });
      if (!loginButtonStatus.value) timerId.value = 0;
    };
    const toggleMenu = (item) => {
      if (model.value === item.type) return;
      resetFormData();
      if (model.value === 'login') {
        ruleForm.email = '';
        ruleForm.pass = '';
      }
      menuTab.forEach((elem) => (elem.current = false));
      item.current = true;
      model.value = item.type;
      initCountDown();
    };
    // 获取验证码
    const getSms = () => {
      if (!isEmail(ruleForm.email)) {
        root.$message.error('邮箱格式错误,请重新输入!!');
        return false;
      }
      updateCodeButton({ text: '发送中', status: true });
      loginButtonStatus.value = false;

      root.$submit(
        () => GetSms({ username: ruleForm.email, module: model.value }),
        () => {
          timer && clearInterval(timer);
          countDown();
        },
        () => initCountDown('重新获取')
      );
    };
    // 登录与注册
    const login = (data) =>
      root.$store
        .dispatch('login/login', data)
        .then((message) => {
          root.$router.push({ name: 'Index', path: 'index' });
          root.$message.success(message);
        })
        .catch(({ message }) => {
          initCountDown('重新获取');
          root.$message.error(message);
        });
    const register = (data) => {
      root.$submit(
        () => Register(data),
        () => {
          let temp = { email: ruleForm.email, pass: ruleForm.pass };
          ruleForm.email = temp.email;
          ruleForm.pass = temp.pass;
          toggleMenu(menuTab[0]);
        },
        () => toggleMenu(menuTab[1])
      );
    };
    const submitForm = (formName) => {
      refs[formName].validate((valid) => {
        // 表单验证
        if (valid) {
          model.value === 'login'
            ? login({ username: ruleForm.email, password: sha1(ruleForm.pass), code: ruleForm.code })
            : register({
                username: ruleForm.email,
                password: sha1(ruleForm.pass),
                code: ruleForm.code,
                module: 'register',
              });
        } else {
          root.$message.error('请填写信息', valid);
          return false;
        }
      });
    };
    onUnmounted(() => initCountDown());
    return {
      menuTab,
      model,
      ruleForm,
      toggleMenu,
      submitForm,
      rules,
      getSms,
      loginButtonStatus,
      codeButton,
      timerId,
    };
  },
};
</script>

<style scoped lang="scss">
html,
body {
  height: 100%;
}
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    &.current {
      background-color: #2d4255;
    }
  }
}
.login-form {
  margin-top: 29px;
}
.item-form {
  margin-bottom: 13px;
}
.block {
  display: block;
  width: 100%;
}
.login-btn {
  margin-top: 19px;
}
</style>
