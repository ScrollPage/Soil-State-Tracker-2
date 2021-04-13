import { modalReducer } from './modal';
import { combineReducers } from 'redux';
import { alertReducer } from './alert';
import { messageReducer } from './message';

export let rootReducer = combineReducers({
  alert: alertReducer,
  modal: modalReducer,
  message: messageReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;


