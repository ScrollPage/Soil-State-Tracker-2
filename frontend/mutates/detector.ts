import { IDetector } from '@/types/detector';
import { IWorker } from '@/types/user';
import { mutate } from 'swr';


export const addDetectorMutate = (triggerUrl: string, triggerWorkerUrl: string, transferDetectors: IDetector[], workerId: number) => {
  mutate(triggerUrl, async (detectors: IDetector[]) => {
    if (detectors) {
      let newDetectors = [...detectors, ...transferDetectors];
      newDetectors.sort((a, b) => a.id > b.id ? 1 : -1)
      return newDetectors;
    }
  }, false);

  mutate(triggerWorkerUrl, async (workers: IWorker[]) => {
    if (workers) {
      const index = workers.findIndex(worker => worker.id === workerId);
      const newWorkerDetectors = workers[index].my_detectors.filter(detector => !!!transferDetectors.find(transferDetector => transferDetector.id === detector.id))
      let newWorkers = [...workers];
      newWorkers[index].my_detectors = newWorkerDetectors;
      return newWorkers;
    }
  }, false);
}

export const removeDetectorMutate = (triggerUrl: string, triggerWorkerUrl: string, transferDetectors: IDetector[], workerId: number) => {
  mutate(triggerUrl, async (detectors: IDetector[]) => {
    if (detectors) {
      const newDetectors = detectors.filter(detector => !!!transferDetectors.find(transferDetector => transferDetector.id === detector.id));
      return newDetectors;
    }
  }, false);

  mutate(triggerWorkerUrl, async (workers: IWorker[]) => {
    if (workers) {
      const index = workers.findIndex(worker => worker.id === workerId);
      const newWorkerDetectors = workers[index].my_detectors;
      let newWorkers = [...workers];
      newWorkers[index].my_detectors = [...newWorkerDetectors, ...transferDetectors];
      newWorkers.sort((a, b) => a.id > b.id ? 1 : -1);
      return newWorkers;
    }
  }, false);
}

