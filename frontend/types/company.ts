import { IUser } from './user';
import { IClient } from './client';

export interface ICompany {
  admin?: IUser;
  id: number;
  info: string;
  is_admin: boolean;
  name: string;
  url: string;
  workers: IClient[];
}