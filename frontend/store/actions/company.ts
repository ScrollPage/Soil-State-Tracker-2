import { addCompanyMutate, changeCompanyMutate, deleteCompanyMutate } from '@/mutates/company';
import { trigger } from 'swr';
import { ThunkType } from '@/types/thunk';
import { show } from '@/store/actions/alert';
import { instance } from '@/api';
import Cookie from 'js-cookie';

export const addCompany = (name: string, url: string, info: string,): ThunkType => async dispatch => {
  const triggerUrl = "/api/company/";
  addCompanyMutate(triggerUrl, name, info, url);

  const token = Cookie.get('token');
  await instance(token)
    .post(triggerUrl, {
      name,
      url,
      info,
    })
    .then(() => {
      dispatch(show('Вы успешно добавили компанию!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка добавления компании!', 'warning'));
    });
  trigger(triggerUrl);
};

export const deleteCompany = (id: number): ThunkType => async dispatch => {
  const triggerUrl = "/api/company/";
  deleteCompanyMutate(triggerUrl, id);

  const token = Cookie.get('token');
  await instance(token)
    .delete(`/api/company/${id}/`)
    .then(() => {
      dispatch(show('Вы успешно удалили компанию!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка в удалении компании!', 'warning'));
    });
  trigger(triggerUrl);

};
export const changeCompany = (id: number, name: string, url: string, info: string): ThunkType => async dispatch => {
  const triggerUrl = "/api/company/";
  changeCompanyMutate(triggerUrl, id, name, info, url);

  const token = Cookie.get('token');
  await instance(token)
    .put(`/api/company/${id}/`, {
      name,
      url,
      info,
    })
    .then(() => {
      dispatch(show('Вы успешно изменили данные о компании!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка в изменении данных о компании!', 'warning'));
    });
  trigger(triggerUrl);

};