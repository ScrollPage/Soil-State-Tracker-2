import { ModalActionTypes, ModalNameType } from './../actions/modal';

const initialState = {
  modalName: null as ModalNameType,
  modalProps: {} as any
};

type InititalStateType = typeof initialState;

export const modalReducer = (state = initialState, action: ModalActionTypes): InititalStateType => {
  switch (action.type) {
    case 'MODAL_SHOW':
      return { ...state, modalName: action.modalName, modalProps: action.modalProps }
    case 'MODAL_HIDE':
      return initialState
    default:
      return state;
  }
}


