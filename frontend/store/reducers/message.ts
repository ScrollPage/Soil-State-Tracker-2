import { PropertiesType } from '@/types/action';
import { IMessage } from '@/types/message';
import { messageActions } from './../actions/message';

const initialState = {
  messages: [] as IMessage[],
  loading: false,
};

type InititalStateType = typeof initialState;

type MessageActionTypes = ReturnType<PropertiesType<typeof messageActions>>

export const messageReducer = (state = initialState, action: MessageActionTypes): InititalStateType => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.message] }
    case 'SET_MESSAGES':
      return { ...state, messages: action.messages.reverse() }
    case 'SET_LOADING_FALSE':
      return { ...state, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: true }
    default:
      return state;
  }
}
