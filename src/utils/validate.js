/**
 *
 * @function stripScript 过滤特殊字符
 * @param {String} s
 */
export function stripScript(s) {
  let pattern = new RegExp(
    "[`~!@#$%^&*()_\\-+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]"
  );
  let rs = "";
  for (let i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

export function is(msg, value) {
  let map = new Map([
    [
      "email",
      /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/,
    ],
    ["password", /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/],
    ["code", /^[a-z0-9A-Z]{6}$/],
  ]);
  msg = msg.toLowerCase();
  if (msg === "pwd") msg = "password";
  return map.get(msg).test(value);
}
export const isEmail = (value) => is("email", value);
export const isPassword = (value) => is("PWD", value);
export const isCode = (value) => is("code", value);

export default function validate(form) {
  const email = (rule, value, callback) => {
      if (!value) callback(new Error("邮箱不能为空"));
      else if (!isEmail(value)) callback(new Error("请输入正确的邮箱地址"));
      else callback();
    },
    pass = (rule, value, callback) => {
      value = form.pass = stripScript(value);
      if (!value) callback(new Error("密码不能为空"));
      else if (!isPassword(value))
        callback(new Error("数字字母组合且不少于6位"));
      else callback();
    },
    code = (rule, value, callback) => {
      if (!value) return callback(new Error("验证码不能为空"));
      if (!isCode(value)) callback(new Error("验证码格式有误"));
      else callback();
    },
    pass2 = (rule, value, callback) => {
      if (!value) callback(new Error("请再次输入密码"));
      else if (value !== form.pass) callback(new Error("重复密码不正确"));
      else callback();
    };
  return { email, pass, code, pass2 };
}
