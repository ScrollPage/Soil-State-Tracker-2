import { ThunkType } from '@/types/thunk';
import { show } from '@/store/actions/alert';
import { instance } from '@/api';
import { trigger } from 'swr';

export const submitChat = (chatId: number): ThunkType => async dispatch => {
  await instance()
    .patch(`/api/chat/${chatId}/admin/`, {})
    .catch(() => {
      dispatch(show('Ошибка добавления чата!', 'warning'));
    });
  trigger("/api/chat/free/")
  trigger("/api/client/chat/")
};
