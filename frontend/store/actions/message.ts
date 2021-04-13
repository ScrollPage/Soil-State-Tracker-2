import { IMessage } from '@/types/message';

export const messageActions = {
  setMessagesSuccess: (messages: IMessage[]) => ({ type: 'SET_MESSAGES', messages } as const),
  setLoadingFalse: () => ({ type: 'SET_LOADING_FALSE' } as const),
  setLoading: () => ({ type: 'SET_LOADING' } as const),
  addMessage: (message: IMessage) => ({ type: 'ADD_MESSAGE', message } as const)
}

export const setMessages = (messages: IMessage[]) => (dispatch: any) => {
  dispatch(messageActions.setLoading());
  dispatch(messageActions.setMessagesSuccess(messages));
  dispatch(messageActions.setLoadingFalse());
};
