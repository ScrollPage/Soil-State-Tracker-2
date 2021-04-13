import { AppStateType } from './reducers/rootReducer';

export const getAlertInfo = (state: AppStateType) => {
  return {
    text: state.alert.text,
    type: state.alert.typeOf,
    isNotClose: state.alert.IsNotClose
  }
}

export const getModalInfo = (state: AppStateType) => {
  return {
    name: state.modal.modalName,
    props: state.modal.modalProps
  }
}

export const getMessageInfo = (state: AppStateType) => {
  const { messages, loading } = state.message;
  return {
    messages, loading
  }
}



