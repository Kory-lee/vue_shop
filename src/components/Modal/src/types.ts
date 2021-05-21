import type { ModalProps } from 'ant-design-vue/lib/modal';
import type { ComputedRef } from 'vue-demi';

export interface ModalMethods {
  setModalProps: (props: Partial<ModalProps>) => void;
  emitVisible?: (visible: boolean, uid: number) => void;
  redoModalHeight?: () => void;
}

export type RegisterFn = (modalMethods: ModalMethods, uuid?: string) => void;

export interface ReturnMethods extends ModalMethods {
  openModal: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void;
  getVisible?: ComputedRef<boolean>;
}

export type UseModalReturnType = [RegisterFn, ReturnMethods];



export interface ModalWrapperProps {
  footerOffset?: number;
  loading: boolean;
  modalHeaderHeight: number;
  modalFooterHeight: number;
  minHeight: number;
  height: number;
  visible: boolean;
  fullScreen: boolean;
  useWrapper: boolean;
}
