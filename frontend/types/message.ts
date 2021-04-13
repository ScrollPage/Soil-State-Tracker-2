export interface IMessage {
  id: number;
  user: {
    id: number;
    full_name: string;
  }
  content: string;
  timestamp: string;
}