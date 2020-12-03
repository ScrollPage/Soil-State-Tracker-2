
type ModalShowType<T> = {
  type: 'MODAL_SHOW',
  modalName: ModalNameType,
  modalProps: T
}

export type ModalNameType = 'DELETE_COMPANY_MODAL' | 'DETECTOR_DATA_MODAL' | null;

export function modalShow<T>(modalName: ModalNameType, modalProps: T): ModalShowType<T> {
  return { type: 'MODAL_SHOW', modalName, modalProps } as const
}

export const modalHide = () => ({ type: 'MODAL_HIDE' } as const);

export type ModalActionTypes = ModalShowType<any> | ReturnType<typeof modalHide>; 
