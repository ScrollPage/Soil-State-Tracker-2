import { IDetector } from '@/types/detector';
import { trigger } from 'swr';
import { ThunkType } from '@/types/thunk';
import { show } from '@/store/actions/alert';
import { instance } from '@/api';
import Cookie from 'js-cookie';

export const changeCluster = (from: number, to: number, id: number): ThunkType => async dispatch => {
  let url;
  const detectorUrl = '/api/detector/';
  const clusterUrl = '/api/cluster/';
  if (from === to) {
    return
  }
  if (to === 0) {
    url = '/api/cluster/remove/'
  } else {
    url = `/api/cluster/${to}/`
  }
  const token = Cookie.get('token');
  await instance(token)
    .post(url, {
      detectors: [id]
    })
    .then(() => {
      dispatch(show('Вы успешно перенесли датчик!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка переноса датчика!', 'warning'));
    });
  trigger(clusterUrl);
  trigger(detectorUrl);
};

export const addCluster = (name: string): ThunkType => async dispatch => {
  const clusterUrl = '/api/cluster/';
  const token = Cookie.get('token');
  await instance(token)
    .post(clusterUrl, {
      name
    })
    .then(() => {
      dispatch(show('Вы успешно создали группу!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка создания группы!', 'warning'));
    });
  trigger(clusterUrl);
};
