import { IMessage } from '@/types/message';

export interface IChat {
  id: number;
  manager?: string;
  user_name: string;
  last_message?: IMessage;
  is_read: boolean;
}

export interface INotify {
  chat: number;
  user_name: string;
}