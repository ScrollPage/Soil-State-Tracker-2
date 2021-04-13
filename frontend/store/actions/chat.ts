import { ThunkType } from '@/types/thunk';
import { show } from '@/store/actions/alert';
import { instance } from '@/api';
import { trigger } from 'swr';
import { IChat } from '@/types/chat';
import { Dispatch, SetStateAction } from 'react';

export const submitChat = (chatId: number): ThunkType => async dispatch => {
  try {
    await instance().patch(`/api/chat/${chatId}/admin/`, {})
  } catch (e) {
    dispatch(show('Ошибка добавления чата!', 'warning'));
  }
  trigger("/api/chat/free/")
  trigger("/api/client/chat/")
};

export const createChat = (callback: Dispatch<SetStateAction<string | undefined>>): ThunkType => async dispatch => {
  try {
    const chat: { data: IChat } = await instance().post(`/api/chat/`, {})
    callback(String(chat.data.id))
  } catch (e) {
    dispatch(show('Ошибка создания чата!', 'warning'));
  }
};


