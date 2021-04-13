import { IUser } from './user';

export interface IChat {
  id: number;
  last_message: {
    content: string;
  };
  user: IUser;
  admin: IUser;
}