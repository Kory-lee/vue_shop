import { readonly, ref } from '@vue/reactivity';

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

const currentState = ref(LoginStateEnum.LOGIN);

export function useLoginState() {
  const getLoginState = readonly(currentState);
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }
  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }
  return { setLoginState, getLoginState, handleBackLogin };
}

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
