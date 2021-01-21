import { IDetector } from '@/types/detector';
import { trigger } from 'swr';
import { ThunkType } from '@/types/thunk';
import { show } from '@/store/actions/alert';
import { instance } from '@/api';
import Cookie from 'js-cookie';
import { deleteClusterMutate, addClusterMutate, changeClusterMutate } from '@/mutates/cluster';
import { AddFormValues } from '@/components/Control/AddForm';

export const changeCluster = (from: number, to: number, detector: IDetector): ThunkType => async dispatch => {
  let url;
  const detectorUrl = '/api/detector/';
  const clusterUrl = '/api/cluster/';
  if (from === to) {
    return
  }
  changeClusterMutate(clusterUrl, detectorUrl, from, to, detector);
  if (to === 0) {
    url = '/api/cluster/remove/'
  } else {
    url = `/api/cluster/${to}/`
  }
  const token = Cookie.get('token');
  await instance(token)
    .post(url, {
      detectors: [detector.id]
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

export const addCluster = (values: AddFormValues): ThunkType => async dispatch => {
  const clusterUrl = '/api/cluster/';
  addClusterMutate(clusterUrl, values.name, values.title);
  const token = Cookie.get('token');
  await instance(token)
    .post(clusterUrl, {
      name: values.name,
      title: values.title
    })
    .then(() => {
      dispatch(show('Вы успешно создали группу!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка создания группы!', 'warning'));
    });
  trigger(clusterUrl);
};

export const deleteCluster = (id: number): ThunkType => async dispatch => {
  const clusterUrl = '/api/cluster/';
  const detectorUrl = '/api/detector/';
  deleteClusterMutate(clusterUrl, detectorUrl, id);
  const token = Cookie.get('token');
  await instance(token)
    .delete(`${clusterUrl}${id}`)
    .then(() => {
      dispatch(show('Вы успешно удалили группу!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка удаления группы!', 'warning'));
    });
  trigger(clusterUrl);
  trigger(detectorUrl);
};

