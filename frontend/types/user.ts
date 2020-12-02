import { IDetector } from './detector';
export interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
}

export interface IWorker {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  my_detectors: IDetector[];
}