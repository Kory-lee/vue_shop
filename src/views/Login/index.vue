<template>
  <div class="login-container">
    <div class="cont" :class="{ 's--sign-up': isSignUp }">
      <div class="form" :class="isSignUp ? 'sign-up' : 'sign-in'">
        <el-form ref="loginRef" :model="ruleForm" status-icon size="medium">
          <el-collapse-transition>
            <h2 v-show="!isSignUp">欢迎回来,</h2>
          </el-collapse-transition>
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
              <template #prepend> <svg-icon iconName="password" class="regular"></svg-icon> </template>
            </el-input>
          </el-form-item>
          <el-collapse-transition>
            <el-form-item v-if="isSignUp" label="确认密码" prop="pass2" class="item-form" :rules="rules.pass2">
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
          </el-collapse-transition>

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
            <el-button type="danger" :disabled="loginButtonStatus" class="login-btn block" @click="submitForm()">
              {{ isSignUp ? '注册' : '登录' }}
            </el-button>
          </el-form-item>
          <transition name="el-fade-in-linear">
            <el-link type="info" v-show="!isSignUp" class="forgot-pass">Forgot password?</el-link>
          </transition>
        </el-form>
      </div>
      <div class="sub-cont">
        <div class="img">
          <div class="img__text m--up">
            <h2>New here?</h2>
            <p>Sign up and discover great amount of new opportunities!</p>
          </div>
          <div class="img__text m--in">
            <h2>One of us?</h2>
            <p>If you already has an account, just sign in. We've missed you!</p>
          </div>
          <div class="img__btn" @click="handleToggle" style="user-select: none;">
            <span class="m--up">Sign Up</span>
            <span class="m--in">Sign In</span>
          </div>
        </div>
      </div>
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
      isSignUp = ref(false),
      timerId = ref(60);
    const codeButton = reactive({
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
    const handleToggle = () => {
      isSignUp.value = !isSignUp.value;
      resetFormData();
      if (isSignUp) {
        ruleForm.email = '';
        ruleForm.pass = '';
      }
      initCountDown();
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
    // 获取验证码
    const getSms = () => {
      if (!isEmail(ruleForm.email)) {
        root.$message.error('邮箱格式错误,请重新输入!!');
        return false;
      }
      updateCodeButton({ text: '发送中', status: true });
      loginButtonStatus.value = false;
      let module = isSignUp ? 'register' : 'login';
      root.$submit(
        () => GetSms({ username: ruleForm.email, module }),
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
        .then(() => root.$router.push({ name: 'Index' }))
        .catch(() => initCountDown('重新获取'));
    const register = (data) => {
      root.$submit(
        () => Register(data),
        () => (isSignUp.value = false)
      );
    };
    const submitForm = () => {
      refs.loginRef.validate((valid) => {
        let { email, pass, code } = ruleForm;
        // 表单验证
        if (valid)
          isSignUp.value
            ? register({ username: email, password: sha1(pass), code, module: 'register' })
            : login({ username: email, password: sha1(pass), code });
        else {
          root.$message.error('请填写信息', valid);
          return false;
        }
      });
    };
    onUnmounted(() => initCountDown());
    return {
      isSignUp,
      handleToggle,
      model,
      ruleForm,
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
.login-container {
  height: 100%;
  width: 100vw;

  background: #ededed;
}
.block {
  display: block;
  width: 100%;
}
.login-btn {
  margin-top: 19px;
}

$contW: 900px;
$imgW: 260px;
$formW: $contW - $imgW;
$switchAT: 1.2s;

$inputW: 260px;
$btnH: 36px;

$diffRatio: ($contW - $imgW) / $contW;

@mixin signUpActive {
  .cont.s--sign-up & {
    @content;
  }
}
.cont {
  overflow: hidden;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: $contW;
  height: 550px;
  background: #fff;
  margin: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.form {
  position: relative;
  width: $formW;
  height: 100%;
  transition: transform $switchAT ease-in-out;
  padding: 50px 60px 0;
  overflow: hidden;
  box-sizing: border-box;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: $formW;
  top: 0;
  width: $contW;
  height: 100%;
  // padding-left: $imgW;
  // background: #fff;
  transition: transform $switchAT ease-in-out;

  @include signUpActive {
    transform: translate3d($formW * -1, 0, 0);
  }
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: $imgW;
  height: 100%;
  padding-top: 360px;
  &:before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: $contW;
    height: 100%;
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/sections-3.jpg');
    background-size: cover;
    transition: transform $switchAT ease-in-out;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @include signUpActive {
    &:before {
      transform: translate3d($formW, 0, 0);
    }
  }

  &__text {
    z-index: 2;
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    text-align: center;
    color: #fff;
    transition: transform $switchAT ease-in-out;

    h2 {
      margin-bottom: 10px;
      font-weight: normal;
    }

    p {
      font-size: 14px;
      line-height: 1.5;
    }

    &.m--up {
      @include signUpActive {
        transform: translateX($imgW * 2);
      }
    }

    &.m--in {
      transform: translateX($imgW * -2);

      @include signUpActive {
        transform: translateX(0);
      }
    }
  }

  &__btn {
    overflow: hidden;
    z-index: 2;
    position: relative;
    width: 100px;
    height: $btnH;
    margin: 0 auto;
    background: transparent;
    color: #fff;
    text-transform: uppercase;
    font-size: 15px;
    cursor: pointer;

    &:after {
      content: '';
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 2px solid #fff;
      border-radius: 30px;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    span {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      transition: transform $switchAT;

      &.m--in {
        transform: translateY($btnH * -2);

        @include signUpActive {
          transform: translateY(0);
        }
      }

      &.m--up {
        @include signUpActive {
          transform: translateY($btnH * 2);
        }
      }
    }
  }
}

h2 {
  width: 100%;
  font-size: 28px;
  margin: 0;
  padding: 0.93em 0;
  text-align: center;
}

label {
  display: block;
  width: $inputW;
  margin: 25px auto 0;
  text-align: center;

  span {
    font-size: 12px;
    color: #cfcfcf;
    text-transform: uppercase;
  }
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: center;
}

.forgot-pass {
  margin-top: 15px;
  text-align: center;
  font-size: 12px;
  color: #cfcfcf;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.sign-up {
  transition-timing-function: ease-out;

  @include signUpActive {
    transition-timing-function: ease-in-out;
    transition-duration: $switchAT;
    transform: translate3d($imgW, 0, 0);
  }
  & ~ .sub-cont {
    width: $imgW;
  }
}

.sign-in {
  // transform: translate3d($contW * -1, 0, 0);

  @include signUpActive {
    transform: translate3d(0, 0, 25px);
  }
}
.el-form-item {
  box-sizing: content-box;
  padding-bottom: 22px;
  margin: 0;
}
</style>
