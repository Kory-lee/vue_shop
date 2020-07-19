import { computed } from '@vue/composition-api';
/**
 * @function timestampToTime 时间戳转换
 */
export function timestampToTime(timestamp = Date.now()) {
  let date = new Date(+timestamp + 8 * 3600 * 1000);
  return date.toJSON()?.substring(0, 19).replace('T', ' ');
  // new Date(Date.now()+8*3600*1000).toISOString()
}
/**
 * @function transformTime 时间戳转换
 */
export function transformTime(timestamp = +new Date()) {
  function addZero(m) {
    return m < 10 ? '0' + m : m;
  }
  if (timestamp) {
    var time = new Date(timestamp);
    var y = time.getFullYear();
    var M = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + addZero(M) + '-' + addZero(d) + ' ' + addZero(h) + ':' + addZero(m) + ':' + addZero(s);
  } else {
    return '';
  }
}

export function indexArr(arr, key, id = 'id') {
  return arr?.findIndex((item) => item[id] == key);
}
export const responseInit = (formatter, data) => {
  let keys = Object.keys(formatter);
  for (let key in data) {
    if (keys.includes(key)) {
      formatter[key] = computed(() => data[key]);
    }
  }
};
export const initObj = (arr, obj = {}) => {
  arr.forEach((item) => (obj[`${item}`] = null));
};

/**
 * @function throttle 节流 (false 和 last: false不能同时设置)
 * @param {Function} fn 需要防抖的函数
 * @param {Number} wait 间隔时间
 * @param {boolean} first 开始触发时是否立即执行
 * @param {boolean} last 停止触发时触发时是否继续执行
 **/
export const throttle = (fn, wait = 300, { first = false, last = true } = {}) => {
  let timeId,
    prev = 0;
  let later = (args) => {
    timeId && clearTimeout(timeId);
    timeId = setTimeout(() => {
      timeId = null;
      fn.apply(this, args);
    }, wait);
  };
  return function (...args) {
    let now = Date.now();
    if (!first) return later(args);
    if (now - prev > wait) {
      fn.apply(this, args);
      prev = now;
    } else if (last) {
      later(args);
    }
  };
};
/**
 * 将字符串首字母大写
 * @param {String} str 待转换的字符串
 */
export function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
