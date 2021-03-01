import { readonly, ref, unref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

export const currentState = ref(LoginStateEnum.LOGIN);
export const getLoginState = readonly(currentState);

export function changeLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }
  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }
  return { setLoginState, handleBackLogin };
}

export function validForm() {}
