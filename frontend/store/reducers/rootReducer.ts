import { modalReducer } from './modal';
import { combineReducers } from 'redux';
import { alertReducer } from './alert';

export let rootReducer = combineReducers({
  alert: alertReducer,
  modal: modalReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;


