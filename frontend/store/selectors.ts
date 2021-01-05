import { AppStateType } from './reducers/rootReducer';

export const getAlertType = (state: AppStateType) => {
  return state.alert.typeOf
}

export const getAlertText = (state: AppStateType) => {
  return state.alert.text
}

export const getAlertIsNotClose = (state: AppStateType) => {
  return state.alert.IsNotClose
}

export const getModalName = (state: AppStateType) => {
  return state.modal.modalName
}

export const getModalProps = (state: AppStateType) => {
  return state.modal.modalProps
}

