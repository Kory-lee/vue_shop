/**
 *
 * @function stripScript 过滤特殊字符
 * @param {String} s
 */
export function stripScript(s) {
  let pattern = new RegExp("[`~!@#$%^&*()_\\-+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]");
  let rs = '';
  for (let i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, '');
  }
  return rs;
}

export function is(msg, value) {
  let map = new Map([
    ['email', /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/],
    ['password', /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/],
    ['vcode', /^[a-z0-9A-Z]{6}$/],
  ]);
  msg = msg.toLowerCase();
  if (msg === 'pwd') msg = 'password';
  return map.get(msg).test(value);
}
export const isEmail = (value) => is('email', value);
export const isPassword = (value) => is('PWD', value);
