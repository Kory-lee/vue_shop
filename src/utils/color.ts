/**
 * 判断是否 十六进制颜色值.
 * 输入形式可为 #fff000 #f00
 * @param   {String}  color   十六进制颜色值
 * @return  Boolean
 */
export const isHexColor = (color: string) => {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  return reg.test(color);
};

/**
 * RGB 颜色值转换为 十六进制颜色值.
 * r, g, 和 b 需要在 [0, 255] 范围内
 * @param r
 * @param g
 * @param b
 * @return  String          类似#ff00ff
 */
export const rgbToHex = (r: number, g: number, b: number) => {
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
};

export const addLight = (color: string, amount: number) => {
  const cc = parseInt(color, 16) + amount;
  const c = cc > 255 ? 255 : cc;
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
};

export const lighten = (color: string, amount: number) => {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color;
  amount = Math.trunc((255 * amount) / 100);
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`;
};

export const darken = (color: string, amount: number) => {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color;
  amount = Math.trunc((255 * amount) / 100);
  return `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(
    color.substring(2, 4),
    amount
  )}${subtractLight(color.substring(4, 6), amount)}`;
};

/**
 * Transform a HEX color to its RGB representation
 * @param {string} hex The color to transform
 * @returns The RGB representation of the passed color
 */
export const hexToRGB = function (hex: string) {
  let sHex = hex.toLowerCase();

  if (isHexColor(hex)) {
    if (sHex.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) sColorNew += sHex.slice(i, i + 1).concat(sHex.slice(i, i + 1));
      sHex = sColorNew;
    }
    const sColorChange: number[] = [];
    for (let i = 1; i < 7; i += 2) sColorChange.push(parseInt('0x' + sHex.slice(i, i + 2)));
    return 'RGB(' + sColorChange.join(',') + ')';
  }
  return sHex;
};

export const colorIsDark = (color: string) => {
  if (!isHexColor(color)) return;
  const [r, g, b] = hexToRGB(color)
    .replace(/(?:\(|\)|rgb|RGB)*/g, '')
    .split(',')
    .map((item) => Number(item));
  return r * 0.299 + g * 0.578 + b * 0.114 < 112;
};

const subtractLight = (color: string, amount: number) => {
  const cc = parseInt(color, 16) - amount;
  const c = cc < 0 ? 0 : cc;
  const str = c.toString(16);
  return str.length > 1 ? str : `0${str}`;
};
