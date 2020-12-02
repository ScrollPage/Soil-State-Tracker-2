
export type IMessages = IMessage[]

export interface IMessage {
  id: number;
  full_name: string;
  content: string;
  timestamp: string;
  is_read: boolean;
}