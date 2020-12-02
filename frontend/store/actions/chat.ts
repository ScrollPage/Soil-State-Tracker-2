import Router from 'next/router';
import { trigger } from 'swr';
import { acceptChatMutate, readChatMutate } from '@/mutates/chat';
import { IChat } from '@/types/chat';
import Cookie from 'js-cookie';
import { show } from '@/store/actions/alert';
import { instance, instanceWithOutHeaders } from '@/api';
import { ThunkType } from '@/types/thunk';

export const createChat = (callback: (chatId: number) => void): ThunkType => async dispatch => {
  const token = Cookie.get('token');
  const thisInstance = token ? instance(token) : instanceWithOutHeaders;
  await thisInstance
    .post('/api/chat/', {})
    .then(res => {
      const data: IChat = res.data;
      callback(data.id);
      dispatch(show('Вы успешно создали чат!', 'success'));
    })
    .catch(err => {
      dispatch(show('Ошибка создания чата!', 'warning'));
    });
};

export const acceptChat = (chatId: number, userName: string): ThunkType => async dispatch => {
  const token = Cookie.get('token');
  const notifyUrl = "/api/notifications/";
  const chatUrl = "/api/chat/";
  acceptChatMutate(notifyUrl, chatUrl, chatId, userName);

  await instance(token)
    .post(`/api/chat/${chatId}/`, {})
    .then(res => {
      dispatch(show('Вы успешно приняли чат!', 'success'));
      Router.push({ pathname: '/support', query: { id: chatId } }, undefined, { shallow: true });

    })
    .catch(err => {
      dispatch(show('Ошибка принятия чата!', 'warning'));
    });
  trigger(notifyUrl);
  trigger(chatUrl);
};

export const readChat = (chatId: number): ThunkType => async dispatch => {
  const token = Cookie.get('token');
  const chatUrl = "/api/chat/";
  readChatMutate(chatUrl, chatId, false);
  await instance(token)
    .put(`/api/chat/${chatId}/`, {})
    .then(res => console.log('Вы успешно прочитали чат!'))
    .catch(err => {
      dispatch(show('Ошибка прочтения чата!', 'warning'));
    })
}




