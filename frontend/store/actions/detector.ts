import { IDetector } from '@/types/detector';
import { trigger } from 'swr';
import { ThunkType } from '@/types/thunk';
import { show } from '@/store/actions/alert';
import { instance } from '@/api';
import Cookie from 'js-cookie';
import { addDetectorMutate, removeDetectorMutate } from '@/mutates/detector';

export const addDetector = (companyId: number, workerId: number, transferDetectors: IDetector[]): ThunkType => async dispatch => {
  const beginUrl = `/api/company/${companyId}`
  const triggerUrl = `${beginUrl}/transfer_detectors/`;
  const triggerWorkerUrl = `${beginUrl}/workers/`;
  addDetectorMutate(triggerUrl, triggerWorkerUrl, transferDetectors, workerId);

  const token = Cookie.get('token');
  await instance(token)
    .post(`${beginUrl}/detectors/remove/`, {
      detectors: transferDetectors.map(detector => detector.id)
    })
    .then(() => {
      trigger(triggerUrl);
      trigger(triggerWorkerUrl);
      dispatch(show('Вы успешно перенесли датчик!', 'success'));
    })
    .catch(() => {
      trigger(triggerUrl);
      trigger(triggerWorkerUrl);
      dispatch(show('Ошибка переноса датчика!', 'warning'));
    });
};

export const removeDetector = (companyId: number, workerId: number, transferDetectors: IDetector[]): ThunkType => async dispatch => {
  const beginUrl = `/api/company/${companyId}`
  const triggerUrl = `${beginUrl}/transfer_detectors/`;
  const triggerWorkerUrl = `${beginUrl}/workers/`;
  removeDetectorMutate(triggerUrl, triggerWorkerUrl, transferDetectors, workerId);

  const token = Cookie.get('token');
  await instance(token)
    .post(`${beginUrl}/detectors/add/`, {
      detectors: transferDetectors.map(detector => detector.id),
      id: workerId
    })
    .then(() => {
      trigger(triggerUrl);
      trigger(triggerWorkerUrl);
      dispatch(show('Вы успешно перенесли датчик!', 'success'));
    })
    .catch(() => {
      trigger(triggerUrl);
      trigger(triggerWorkerUrl);
      dispatch(show('Ошибка переноса датчика!', 'warning'));
    });
};