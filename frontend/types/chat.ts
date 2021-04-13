import { IUser } from './user';

export interface IChat {
  id: number;
  last_message: string;
  user: IUser;
  admin: IUser;
}