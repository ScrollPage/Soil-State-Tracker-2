import { AppStateType } from './reducers/rootReducer';

export const getAlertInfo = (state: AppStateType) => {
  return {
    text: state.alert.text,
    type: state.alert.typeOf,
    isNotClose: state.alert.IsNotClose
  }
}

export const getModalName = (state: AppStateType) => {
  return state.modal.modalName
}

export const getModalProps = (state: AppStateType) => {
  return state.modal.modalProps
}

