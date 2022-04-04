import set from 'lodash-es/set';
import type { LocaleType } from '../types/config';

export function genMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
  const obj: Recordable = {};
  Object.keys(langs).forEach((key) => {
    const mod = langs[key].default;
    let k = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');
    const lastIndex = k.lastIndexOf('.');
    k = k.substring(0, lastIndex);
    const keyList = k.split('/'),
      lang = keyList.shift(),
      objKey = keyList.join('.');
    if (lang) {
      if (objKey) {
        set(obj, lang, obj[lang] || {});
        set(obj[lang], objKey, mod);
      } else {
        set(obj, lang, mod || {});
      }
    }
  });
  return obj;
}

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale);
}
